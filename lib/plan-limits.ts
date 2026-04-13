import { PlanUsuario, LIMITES_PLAN } from "@/lib/types"

export type PlanStatus = {
  plan: PlanUsuario
  consultasUsadas: number
  consultasRestantes: number
  limiteTotal: number
  permitido: boolean
  esPro: boolean
  planVencido: boolean
  venceEn?: string
}

export function checkPlanStatus(perfil: {
  plan: PlanUsuario
  consultas_mes: number
  mes_actual: string
  plan_activo_hasta?: string | null
}): PlanStatus {
  const mesActual = new Date().toISOString().slice(0, 7)

  let consultasUsadas = perfil.consultas_mes
  if (perfil.mes_actual !== mesActual) {
    consultasUsadas = 0
  }

  let planActual = perfil.plan
  let planVencido = false

  if (planActual !== "free" && perfil.plan_activo_hasta) {
    const vencimiento = new Date(perfil.plan_activo_hasta)
    if (vencimiento < new Date()) {
      planActual = "free"
      planVencido = true
    }
  }

  const limite = LIMITES_PLAN[planActual]
  const restantes = Math.max(0, limite.guias_por_mes - consultasUsadas)

  return {
    plan: planActual,
    consultasUsadas,
    consultasRestantes: restantes,
    limiteTotal: limite.guias_por_mes,
    permitido: restantes > 0,
    esPro: planActual === "pro" || planActual === "institucional",
    planVencido,
    venceEn: perfil.plan_activo_hasta || undefined,
  }
}
