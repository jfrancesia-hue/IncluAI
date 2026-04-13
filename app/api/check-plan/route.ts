import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { checkPlanStatus } from "@/lib/plan-limits"
import type { Perfil } from "@/lib/types"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

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

    const status = checkPlanStatus(perfil as Perfil)
    return NextResponse.json(status)
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
