"use client"

import { useEffect, useState, useCallback } from "react"
import type { PlanStatus } from "@/lib/plan-limits"

export function usePlan() {
  const [planStatus, setPlanStatus] = useState<PlanStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPlan = useCallback(async () => {
    try {
      const res = await fetch("/api/check-plan")
      if (res.ok) {
        const data = await res.json()
        setPlanStatus(data)
      }
    } catch {
      // Silently fail — no bloquear la UX
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPlan()
  }, [fetchPlan])

  return {
    plan: planStatus?.plan ?? "free",
    consultasRestantes: planStatus?.consultasRestantes ?? 0,
    consultasUsadas: planStatus?.consultasUsadas ?? 0,
    limiteTotal: planStatus?.limiteTotal ?? 2,
    permitido: planStatus?.permitido ?? true,
    esPro: planStatus?.esPro ?? false,
    planVencido: planStatus?.planVencido ?? false,
    venceEn: planStatus?.venceEn,
    loading,
    refresh: fetchPlan,
  }
}
