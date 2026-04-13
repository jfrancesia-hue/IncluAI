"use client"

import { useEffect, useState, useCallback, useMemo, useRef } from "react"
import { useAuth } from "@/hooks/useAuth"
import { usePerfil } from "@/hooks/usePerfil"
import { createClient } from "@/lib/supabase/client"
import { HistorialCard } from "@/components/historial/HistorialCard"
import { PaywallModal } from "@/components/shared/PaywallModal"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Consulta } from "@/lib/types"

export default function HistorialPage() {
  const { user, loading: authLoading } = useAuth()
  const { perfil, loading: perfilLoading } = usePerfil(user?.id)
  const [consultas, setConsultas] = useState<Consulta[] | null>(null)
  const [favoritasIds, setFavoritasIds] = useState<Set<string>>(new Set())
  const [filtroMateria, setFiltroMateria] = useState<string | null>(null)
  const [paywallDismissed, setPaywallDismissed] = useState(false)
  const fetchedRef = useRef(false)

  const supabase = useMemo(() => createClient(), [])
  const esPro = perfil?.plan === "pro" || perfil?.plan === "institucional"
  const showPaywall = !esPro && perfil != null && !paywallDismissed

  const fetchData = useCallback(async () => {
    if (!user) return

    let query = supabase
      .from("consultas")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    if (filtroMateria) {
      query = query.eq("materia", filtroMateria)
    }

    const { data: consultasData } = await query
    setConsultas((consultasData as Consulta[]) ?? [])

    const { data: guiasData } = await supabase
      .from("guias_guardadas")
      .select("consulta_id")
      .eq("user_id", user.id)
      .eq("es_favorita", true)

    if (guiasData) {
      setFavoritasIds(new Set(guiasData.map((g: { consulta_id: string }) => g.consulta_id)))
    }
  }, [user, filtroMateria, supabase])

  useEffect(() => {
    if (!user || perfilLoading || fetchedRef.current || !esPro) return
    fetchedRef.current = true
    // Schedule fetch outside effect body to avoid lint warning
    const id = requestAnimationFrame(() => { fetchData() })
    return () => cancelAnimationFrame(id)
  }, [user, perfilLoading, esPro, fetchData])

  // Reset fetch ref when filter changes
  useEffect(() => {
    fetchedRef.current = false
  }, [filtroMateria])

  const handleToggleFavorita = async (consultaId: string) => {
    if (!user) return
    const isFav = favoritasIds.has(consultaId)

    if (isFav) {
      await supabase
        .from("guias_guardadas")
        .delete()
        .eq("consulta_id", consultaId)
        .eq("user_id", user.id)
      setFavoritasIds((prev) => {
        const next = new Set(prev)
        next.delete(consultaId)
        return next
      })
    } else {
      const consulta = consultas?.find((c) => c.id === consultaId)
      await supabase.from("guias_guardadas").insert({
        consulta_id: consultaId,
        user_id: user.id,
        titulo: `${consulta?.materia} — ${consulta?.contenido?.slice(0, 50)}`,
        es_favorita: true,
      })
      setFavoritasIds((prev) => new Set(prev).add(consultaId))
    }
  }

  const handleEliminar = async (consultaId: string) => {
    if (!user || !confirm("¿Eliminar esta consulta?")) return

    await supabase
      .from("consultas")
      .delete()
      .eq("id", consultaId)
      .eq("user_id", user.id)

    setConsultas((prev) => prev?.filter((c) => c.id !== consultaId) ?? [])
  }

  const materiasUnicas = useMemo(
    () => [...new Set((consultas ?? []).map((c) => c.materia))].sort(),
    [consultas]
  )

  // Derive loading from existing state
  const loading = authLoading || perfilLoading || (esPro && consultas === null)

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  const displayConsultas = consultas ?? []

  return (
    <div className="space-y-6">
      <PaywallModal
        open={showPaywall}
        onClose={() => setPaywallDismissed(true)}
        mensaje="El historial de consultas está disponible con el Plan Pro."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Historial de consultas
        </h1>

        {materiasUnicas.length > 1 && (
          <Select
            value={filtroMateria ?? ""}
            onValueChange={(v) => setFiltroMateria(v || null)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por materia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas las materias</SelectItem>
              {materiasUnicas.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {displayConsultas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-12 text-center">
          <p className="text-muted-foreground">
            Todavía no generaste ninguna guía.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayConsultas.map((c) => (
            <HistorialCard
              key={c.id}
              consulta={c}
              esFavorita={favoritasIds.has(c.id)}
              onToggleFavorita={handleToggleFavorita}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}
    </div>
  )
}
