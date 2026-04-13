import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { anthropic } from "@/lib/anthropic"
import { buildPrompt, SYSTEM_PROMPT } from "@/lib/prompts"
import { checkPlanStatus } from "@/lib/plan-limits"
import type { FormularioConsulta, Perfil } from "@/lib/types"

function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, 5000)
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const { data: perfil } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (!perfil) {
      return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 })
    }

    const planStatus = checkPlanStatus(perfil as Perfil)
    if (!planStatus.permitido) {
      return NextResponse.json(
        {
          error: "Alcanzaste el límite de guías de tu plan.",
          plan: planStatus.plan,
          consultasRestantes: 0,
        },
        { status: 403 }
      )
    }

    const formData: FormularioConsulta = await request.json()

    if (
      !formData.nivel_id ||
      !formData.materia ||
      !formData.contenido?.trim() ||
      !formData.discapacidades?.length
    ) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    // Sanitizar inputs de texto libre
    const sanitizedForm: FormularioConsulta = {
      ...formData,
      contenido: sanitizeText(formData.contenido),
      contexto_aula: formData.contexto_aula
        ? sanitizeText(formData.contexto_aula)
        : undefined,
      objetivo_clase: formData.objetivo_clase
        ? sanitizeText(formData.objetivo_clase)
        : undefined,
      discapacidad_otra: formData.discapacidad_otra
        ? sanitizeText(formData.discapacidad_otra)
        : undefined,
      situacion_apoyo_otra: formData.situacion_apoyo_otra
        ? sanitizeText(formData.situacion_apoyo_otra)
        : undefined,
    }

    const userPrompt = buildPrompt(sanitizedForm)

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }

          await supabase.rpc("incrementar_consultas", { p_user_id: user.id })

          const finalMessage = await stream.finalMessage()
          const respuestaCompleta = finalMessage.content
            .filter((b) => b.type === "text")
            .map((b) => b.text)
            .join("")

          await supabase.from("consultas").insert({
            user_id: user.id,
            nivel: sanitizedForm.nivel_id,
            subnivel: sanitizedForm.subnivel_id || null,
            anio_grado: sanitizedForm.anio_grado,
            materia: sanitizedForm.materia,
            contenido: sanitizedForm.contenido,
            discapacidades: sanitizedForm.discapacidades,
            cantidad_alumnos: sanitizedForm.cantidad_alumnos,
            situacion_apoyo: sanitizedForm.situacion_apoyo,
            contexto_aula: sanitizedForm.contexto_aula || null,
            objetivo_clase: sanitizedForm.objetivo_clase || null,
            respuesta_ia: respuestaCompleta,
            tokens_usados: finalMessage.usage?.output_tokens ?? null,
          })

          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("Error en generar-guia:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
