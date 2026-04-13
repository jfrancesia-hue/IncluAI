"use server"

import { createClient } from "@/lib/supabase/server"

export type PerfilState = {
  error?: string
  success?: boolean
}

export async function actualizarPerfil(
  _prevState: PerfilState,
  formData: FormData
): Promise<PerfilState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "No autenticado" }
  }

  const nombre = formData.get("nombre") as string
  const apellido = formData.get("apellido") as string
  const institucion = formData.get("institucion") as string
  const localidad = formData.get("localidad") as string
  const provincia = formData.get("provincia") as string

  if (!nombre || !apellido) {
    return { error: "Nombre y apellido son obligatorios." }
  }

  const { error } = await supabase
    .from("perfiles")
    .update({
      nombre,
      apellido,
      institucion: institucion || null,
      localidad: localidad || null,
      provincia: provincia || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { error: "Error al actualizar el perfil." }
  }

  return { success: true }
}
