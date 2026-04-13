"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type RegistroState = {
  error?: string
  success?: boolean
}

export async function registrarUsuario(
  _prevState: RegistroState,
  formData: FormData
): Promise<RegistroState> {
  const supabase = await createClient()

  const nombre = formData.get("nombre") as string
  const apellido = formData.get("apellido") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const institucion = formData.get("institucion") as string
  const localidad = formData.get("localidad") as string
  const provincia = formData.get("provincia") as string

  if (!nombre || !apellido || !email || !password) {
    return { error: "Completá todos los campos obligatorios." }
  }

  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nombre,
        apellido,
        institucion: institucion || null,
        localidad: localidad || null,
        provincia: provincia || null,
      },
    },
  })

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Este email ya está registrado. ¿Querés iniciar sesión?" }
    }
    return { error: error.message }
  }

  redirect("/verificar-email")
}
