"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { usePerfil } from "@/hooks/usePerfil"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LIMITES_PLAN } from "@/lib/types"
import { cn } from "@/lib/utils"

const TIPS_INCLUSIVOS = [
  { texto: "El DUA no es solo para alumnos con discapacidad — beneficia a TODOS los estudiantes del aula.", fuente: "CAST, 2018" },
  { texto: "Una adecuación curricular no es 'bajar el nivel'. Es ofrecer otro camino para llegar al mismo aprendizaje.", fuente: "Res. CFE 311/16" },
  { texto: "Antes de adaptar un material, preguntate: ¿hay alguna barrera que puedo eliminar para que TODOS accedan?", fuente: "DUA" },
  { texto: "El mejor recurso inclusivo no es un material — es el vínculo de confianza entre docente y alumno.", fuente: "" },
  { texto: "Incluir no es sentar al alumno al fondo con una actividad diferente. Es diseñar una clase donde todos participen.", fuente: "" },
  { texto: "Las rutinas predecibles benefician a alumnos con TEA, pero también reducen la ansiedad de todo el grupo.", fuente: "" },
  { texto: "Evaluar de forma diferenciada no es injusto — injusto es evaluar a todos igual cuando aprenden diferente.", fuente: "" },
  { texto: "Un alumno con discapacidad no es un problema a resolver. Es un estudiante con derecho a aprender.", fuente: "Convención ONU" },
  { texto: "Las familias son aliadas, no obstáculos. Involucralas en el proceso de aprendizaje de su hijo/a.", fuente: "" },
  { texto: "Si no sabés por dónde empezar, empezá por preguntar: ¿qué SÍ puede hacer este alumno?", fuente: "" },
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
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
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
        <h1 className="font-display text-2xl font-bold text-foreground">
          Hola, {perfil?.nombre || "docente"}
        </h1>
        <p className="text-muted-foreground">
          {consultasRestantes > 0
            ? `Tenés ${consultasRestantes} guía${consultasRestantes !== 1 ? "s" : ""} disponible${consultasRestantes !== 1 ? "s" : ""} este mes`
            : "Usaste todas tus guías de este mes"}
        </p>
      </div>

      {/* CTA principal */}
      <Card className="border-inclua-accent/20 bg-inclua-accent-light/30">
        <CardContent className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Nueva consulta inclusiva
            </h2>
            <p className="text-sm text-muted-foreground">
              Completá el formulario y generá una guía personalizada con IA
            </p>
          </div>
          <Link
            href="/nueva-consulta"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-inclua-accent hover:bg-inclua-accent-dark text-white px-6 h-auto py-3 shrink-0"
            )}
          >
            Crear guía
          </Link>
        </CardContent>
      </Card>

      {/* Tip del día */}
      <Card>
        <CardContent className="py-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-inclua-primary">
            Tip del día
          </p>
          <p className="text-sm text-foreground italic">
            &ldquo;{tip.texto}&rdquo;
          </p>
          {tip.fuente && (
            <p className="mt-1 text-xs text-muted-foreground">
              — {tip.fuente}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Info del plan */}
      {perfil?.plan === "free" && (
        <Card className="border-inclua-orange/20 bg-inclua-orange-light/50">
          <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Plan Gratuito — {consultasRestantes} de {limite.guias_por_mes} guías restantes
              </p>
              <p className="text-xs text-muted-foreground">
                Pasate al Plan Pro para generar hasta 40 guías por mes
              </p>
            </div>
            <Link
              href="/planes"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "shrink-0"
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
