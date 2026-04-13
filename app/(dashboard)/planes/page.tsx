"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { usePerfil } from "@/hooks/usePerfil"
import { cn } from "@/lib/utils"

const PLANES = [
  {
    id: "free",
    nombre: "Gratuito",
    precio: "$0",
    periodo: "",
    descripcion: "Para probar la plataforma",
    features: [
      { texto: "2 guías por mes", included: true },
      { texto: "Formulario completo de 3 pasos", included: true },
      { texto: "Streaming en tiempo real", included: true },
      { texto: "Copiar e imprimir guías", included: true },
      { texto: "Historial de consultas", included: false },
      { texto: "Guardar guías favoritas", included: false },
      { texto: "Exportar a PDF", included: false },
    ],
    cta: "Plan actual",
    highlighted: false,
  },
  {
    id: "pro",
    nombre: "Profesional",
    precio: "$9.900",
    periodo: "/mes",
    descripcion: "Para docentes comprometidos con la inclusión",
    features: [
      { texto: "40 guías por mes", included: true },
      { texto: "Formulario completo de 3 pasos", included: true },
      { texto: "Streaming en tiempo real", included: true },
      { texto: "Copiar e imprimir guías", included: true },
      { texto: "Historial de consultas", included: true },
      { texto: "Guardar guías favoritas", included: true },
      { texto: "Exportar a PDF", included: true },
    ],
    cta: "Suscribirme",
    highlighted: true,
  },
]

export default function PlanesPage() {
  const { user } = useAuth()
  const { perfil } = usePerfil(user?.id)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSuscribirse = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/mercadopago/crear-preferencia", {
        method: "POST",
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Error al crear el pago")
        setLoading(false)
        return
      }

      const { init_point } = await res.json()
      window.location.href = init_point
    } catch {
      setError("Error de conexión. Intentá de nuevo.")
      setLoading(false)
    }
  }

  const esPro = perfil?.plan === "pro" || perfil?.plan === "institucional"

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Elegí tu plan
        </h1>
        <p className="mt-2 text-muted-foreground">
          Empezá gratis y pasate al Pro cuando lo necesites
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {PLANES.map((plan) => {
          const isCurrentPlan =
            (plan.id === "free" && !esPro) || (plan.id === "pro" && esPro)

          return (
            <Card
              key={plan.id}
              className={cn(
                "relative",
                plan.highlighted && "border-inclua-accent shadow-md"
              )}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-inclua-accent text-white">
                  Más popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="font-display text-lg">
                  {plan.nombre}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {plan.descripcion}
                </p>
                <div className="mt-2">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {plan.precio}
                  </span>
                  {plan.periodo && (
                    <span className="text-muted-foreground">{plan.periodo}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      {f.included ? (
                        <Check className="size-4 shrink-0 text-inclua-accent" />
                      ) : (
                        <X className="size-4 shrink-0 text-muted-foreground/40" />
                      )}
                      <span
                        className={cn(
                          !f.included && "text-muted-foreground/60"
                        )}
                      >
                        {f.texto}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.id === "pro" ? (
                  isCurrentPlan ? (
                    <Button disabled className="w-full">
                      Plan activo
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSuscribirse}
                      disabled={loading}
                      className="w-full bg-inclua-accent hover:bg-inclua-accent-dark text-white"
                    >
                      {loading ? "Redirigiendo a Mercado Pago..." : plan.cta}
                    </Button>
                  )
                ) : (
                  <Button disabled variant="outline" className="w-full">
                    {isCurrentPlan ? "Plan actual" : plan.cta}
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Pagos procesados de forma segura por Mercado Pago. Podés cancelar en
        cualquier momento.
      </p>
    </div>
  )
}
