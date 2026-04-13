import { NextResponse } from "next/server"
import { createHmac } from "crypto"
import { paymentClient } from "@/lib/mercadopago"
import { createAdminClient } from "@/lib/supabase/admin"

function verifyWebhookSignature(req: Request, body: string): boolean {
  const xSignature = req.headers.get("x-signature")
  const xRequestId = req.headers.get("x-request-id")

  if (!xSignature || !xRequestId) return false

  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
  if (!secret) {
    // Si no hay secret configurado, loguear warning pero permitir en desarrollo
    console.warn("MERCADOPAGO_WEBHOOK_SECRET no configurado — omitiendo verificación de firma")
    return true
  }

  // Parsear x-signature: "ts=xxx,v1=xxx"
  const parts = Object.fromEntries(
    xSignature.split(",").map((p) => {
      const [key, val] = p.split("=")
      return [key.trim(), val.trim()]
    })
  )

  const ts = parts.ts
  const v1 = parts.v1
  if (!ts || !v1) return false

  // Extraer data.id del body
  let dataId = ""
  try {
    const parsed = JSON.parse(body)
    dataId = parsed.data?.id ? String(parsed.data.id) : ""
  } catch {
    return false
  }

  // Construir manifest y verificar
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`
  const hmac = createHmac("sha256", secret).update(manifest).digest("hex")

  return hmac === v1
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text()

    // Verificar firma del webhook
    if (!verifyWebhookSignature(req, bodyText)) {
      console.error("Webhook: firma inválida")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    let body: Record<string, unknown>
    try {
      body = JSON.parse(bodyText)
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    // Solo procesar notificaciones de pago
    if (body.type !== "payment" && body.topic !== "payment") {
      return NextResponse.json({ received: true })
    }

    const rawId =
      (body.data as Record<string, unknown>)?.id ||
      (typeof body.resource === "string" ? body.resource.split("/").pop() : null)
    const paymentId = Number(rawId)

    if (!paymentId || isNaN(paymentId)) {
      return NextResponse.json({ error: "Invalid payment ID" }, { status: 400 })
    }

    // Obtener detalles del pago desde MP (verificación server-side)
    const payment = await paymentClient.get({ id: paymentId })

    if (payment.status !== "approved") {
      console.log(`Payment ${paymentId} status: ${payment.status}`)
      return NextResponse.json({ received: true })
    }

    const externalRef = payment.external_reference
    if (!externalRef) {
      console.error("No external_reference in payment")
      return NextResponse.json({ received: true })
    }

    const [userId, plan] = externalRef.split("__")

    if (!userId || !plan || !["pro", "institucional"].includes(plan)) {
      console.error("Invalid external_reference:", externalRef)
      return NextResponse.json({ received: true })
    }

    const supabaseAdmin = createAdminClient()
    const ahora = new Date()
    const en30Dias = new Date(ahora.getTime() + 30 * 24 * 60 * 60 * 1000)

    const { error: updateError } = await supabaseAdmin
      .from("perfiles")
      .update({
        plan: plan,
        plan_activo_hasta: en30Dias.toISOString(),
        updated_at: ahora.toISOString(),
      })
      .eq("id", userId)

    if (updateError) {
      console.error("Error updating profile:", updateError)
      return NextResponse.json({ error: "DB error" }, { status: 500 })
    }

    await supabaseAdmin.from("pagos").insert({
      user_id: userId,
      monto_ars: payment.transaction_amount,
      plan: plan,
      estado: "aprobado",
      mercadopago_payment_id: String(paymentId),
      mercadopago_status: payment.status,
      periodo_inicio: ahora.toISOString(),
      periodo_fin: en30Dias.toISOString(),
    })

    return NextResponse.json({ received: true, activated: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
