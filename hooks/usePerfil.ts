"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Perfil } from "@/lib/types"

export function usePerfil(userId: string | undefined) {
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const supabase = useMemo(() => createClient(), [])

  const loading = userId != null && perfil === null

  useEffect(() => {
    if (!userId) return

    let cancelled = false
    const fetchPerfil = async () => {
      const { data, error } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (!cancelled && !error && data) {
        setPerfil(data as Perfil)
      }
    }

    fetchPerfil()
    return () => { cancelled = true }
  }, [userId, supabase])

  const refresh = useCallback(async () => {
    if (!userId) return
    const { data } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id", userId)
      .single()
    if (data) setPerfil(data as Perfil)
  }, [userId, supabase])

  return { perfil, loading, refresh }
}
