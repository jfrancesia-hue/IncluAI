"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type LoginState = {
  error?: string
}

export async function iniciarSesion(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Completá email y contraseña." }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Email o contraseña incorrectos." }
    }
    if (error.message.includes("Email not confirmed")) {
      return { error: "Verificá tu email antes de iniciar sesión." }
    }
    return { error: error.message }
  }

  redirect("/inicio")
}
