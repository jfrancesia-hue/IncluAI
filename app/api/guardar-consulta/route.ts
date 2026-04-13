import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const { consulta_id, titulo } = await request.json()

    if (!consulta_id || !titulo) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    // Verificar que la consulta pertenece al usuario
    const { data: consulta } = await supabase
      .from("consultas")
      .select("id")
      .eq("id", consulta_id)
      .eq("user_id", user.id)
      .single()

    if (!consulta) {
      return NextResponse.json({ error: "Consulta no encontrada" }, { status: 404 })
    }

    const { data, error } = await supabase
      .from("guias_guardadas")
      .insert({
        consulta_id,
        user_id: user.id,
        titulo,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: "Error al guardar" }, { status: 500 })
    }

    return NextResponse.json({ success: true, guia: data })
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
