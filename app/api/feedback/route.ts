import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const { consulta_id, estrellas } = await request.json()

    if (!consulta_id || !estrellas || estrellas < 1 || estrellas > 5) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
    }

    const { error } = await supabase
      .from("consultas")
      .update({ feedback_estrellas: estrellas })
      .eq("id", consulta_id)
      .eq("user_id", user.id)

    if (error) {
      return NextResponse.json({ error: "Error al guardar feedback" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
