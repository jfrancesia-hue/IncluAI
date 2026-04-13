"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { usePerfil } from "@/hooks/usePerfil"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LIMITES_PLAN } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ArrowRight, Lightbulb, Zap } from "lucide-react"

const TIPS_INCLUSIVOS = [
  { texto: "El DUA no es solo para alumnos con discapacidad — beneficia a TODOS los estudiantes del aula.", fuente: "CAST, 2018" },
  { texto: "Una adecuacion curricular no es 'bajar el nivel'. Es ofrecer otro camino para llegar al mismo aprendizaje.", fuente: "Res. CFE 311/16" },
  { texto: "Antes de adaptar un material, preguntate: ¿hay alguna barrera que puedo eliminar para que TODOS accedan?", fuente: "DUA" },
  { texto: "El mejor recurso inclusivo no es un material — es el vinculo de confianza entre docente y alumno.", fuente: "" },
  { texto: "Incluir no es sentar al alumno al fondo con una actividad diferente. Es disenar una clase donde todos participen.", fuente: "" },
  { texto: "Las rutinas predecibles benefician a alumnos con TEA, pero tambien reducen la ansiedad de todo el grupo.", fuente: "" },
  { texto: "Evaluar de forma diferenciada no es injusto — injusto es evaluar a todos igual cuando aprenden diferente.", fuente: "" },
  { texto: "Un alumno con discapacidad no es un problema a resolver. Es un estudiante con derecho a aprender.", fuente: "Convencion ONU" },
  { texto: "Las familias son aliadas, no obstaculos. Involucralas en el proceso de aprendizaje de su hijo/a.", fuente: "" },
  { texto: "Si no sabes por donde empezar, empeza por preguntar: ¿que SI puede hacer este alumno?", fuente: "" },
]

function getTipDelDia() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )
  return TIPS_INCLUSIVOS[dayOfYear % TIPS_INCLUSIVOS.length]
}

export default function InicioPage() {
  const { user, loading: authLoading } = useAuth()
  const { perfil, loading: perfilLoading } = usePerfil(user?.id)

  const loading = authLoading || perfilLoading
  const tip = getTipDelDia()

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    )
  }

  const limite = perfil ? LIMITES_PLAN[perfil.plan] : LIMITES_PLAN.free
  const mesActual = new Date().toISOString().slice(0, 7)
  const consultasUsadas = perfil?.mes_actual === mesActual ? (perfil?.consultas_mes ?? 0) : 0
  const consultasRestantes = Math.max(0, limite.guias_por_mes - consultasUsadas)

  return (
    <div className="space-y-6">
      {/* Saludo */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Hola, {perfil?.nombre || "docente"} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          {consultasRestantes > 0
            ? `Tenes ${consultasRestantes} guia${consultasRestantes !== 1 ? "s" : ""} disponible${consultasRestantes !== 1 ? "s" : ""} este mes`
            : "Usaste todas tus guias de este mes"}
        </p>
      </div>

      {/* CTA principal */}
      <Card className="relative overflow-hidden border-inclua-accent/20 bg-gradient-to-br from-inclua-accent-light/40 via-inclua-accent-light/20 to-transparent">
        <div className="absolute top-0 right-0 size-32 rounded-full bg-inclua-accent/5 blur-2xl" />
        <CardContent className="relative flex flex-col items-start gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-inclua-accent/10">
                <Zap className="size-4 text-inclua-accent" />
              </div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Nueva consulta inclusiva
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Completa el formulario de 3 pasos y genera una guia personalizada con inteligencia artificial
            </p>
          </div>
          <Link
            href="/nueva-consulta"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-inclua-accent hover:bg-inclua-accent-dark text-white px-6 h-auto py-3.5 shrink-0 rounded-xl font-semibold shadow-lg shadow-inclua-accent/20 transition-all hover:-translate-y-0.5"
            )}
          >
            Crear guia
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </CardContent>
      </Card>

      {/* Tip del dia */}
      <Card className="border-border/60">
        <CardContent className="py-5 px-5">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <Lightbulb className="size-4" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-inclua-primary">
                Tip del dia
              </p>
              <p className="text-sm text-foreground leading-relaxed italic">
                &ldquo;{tip.texto}&rdquo;
              </p>
              {tip.fuente && (
                <p className="mt-2 text-xs text-muted-foreground">
                  — {tip.fuente}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info del plan */}
      {perfil?.plan === "free" && (
        <Card className="border-inclua-orange/15 bg-gradient-to-r from-inclua-orange-light/50 to-transparent">
          <CardContent className="flex flex-col gap-4 py-5 px-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Plan Gratuito — {consultasRestantes}/{limite.guias_por_mes} guias
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Pasate al Plan Pro para generar hasta 40 guias por mes
              </p>
              {/* Progress bar */}
              <div className="mt-3 h-2 w-48 rounded-full bg-border/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-inclua-orange transition-all"
                  style={{ width: `${(consultasUsadas / limite.guias_por_mes) * 100}%` }}
                />
              </div>
            </div>
            <Link
              href="/planes"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "shrink-0 rounded-lg"
              )}
            >
              Ver planes
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
