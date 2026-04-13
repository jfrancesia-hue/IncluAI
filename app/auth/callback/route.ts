import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const ALLOWED_REDIRECTS = ["/inicio", "/nueva-consulta", "/perfil", "/planes", "/historial"]

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/inicio"

  // Prevenir open redirect: validar que next sea una ruta interna segura
  const safePath =
    next.startsWith("/") && !next.startsWith("//") && ALLOWED_REDIRECTS.some((r) => next.startsWith(r))
      ? next
      : "/inicio"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${safePath}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
