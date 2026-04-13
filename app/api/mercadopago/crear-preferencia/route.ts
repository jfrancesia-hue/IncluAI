import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { preferenceClient } from "@/lib/mercadopago"
import { LIMITES_PLAN } from "@/lib/types"

export async function POST() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const mesActual = new Date().toLocaleDateString("es-AR", {
      month: "long",
      year: "numeric",
    })
    const externalReference = `${user.id}__pro__${Date.now()}`

    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: "inclua-pro-mensual",
            title: `IncluIA Plan Profesional — ${mesActual}`,
            unit_price: LIMITES_PLAN.pro.precio_ars,
            quantity: 1,
            currency_id: "ARS",
          },
        ],
        external_reference: externalReference,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/exito-pago`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/planes?status=error`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/planes?status=pendiente`,
        },
        auto_return: "approved",
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/webhook`,
        payer: {
          email: user.email,
        },
      },
    })

    return NextResponse.json({ init_point: preference.init_point })
  } catch (error) {
    console.error("Error creando preferencia MP:", error)
    return NextResponse.json(
      { error: "Error al crear el pago" },
      { status: 500 }
    )
  }
}
