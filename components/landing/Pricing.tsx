import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

const PLANES = [
  {
    id: "free",
    nombre: "Gratuito",
    precio: "$0",
    periodo: "",
    descripcion: "Ideal para probar la plataforma",
    features: [
      { texto: "2 guias por mes", ok: true },
      { texto: "Formulario guiado de 3 pasos", ok: true },
      { texto: "Resultado en tiempo real", ok: true },
      { texto: "Copiar e imprimir guias", ok: true },
      { texto: "Historial de consultas", ok: false },
      { texto: "Guardar favoritas y PDF", ok: false },
    ],
    cta: "Empezar gratis",
    href: "/registro",
    accent: false,
  },
  {
    id: "pro",
    nombre: "Profesional",
    precio: "$9.900",
    periodo: "/mes",
    descripcion: "Para docentes comprometidos",
    features: [
      { texto: "40 guias por mes", ok: true },
      { texto: "Formulario guiado de 3 pasos", ok: true },
      { texto: "Resultado en tiempo real", ok: true },
      { texto: "Copiar e imprimir guias", ok: true },
      { texto: "Historial completo", ok: true },
      { texto: "Guardar favoritas y PDF", ok: true },
    ],
    cta: "Suscribirme",
    href: "/registro",
    accent: true,
  },
]

export function Pricing() {
  return (
    <section className="bg-gradient-to-b from-background to-inclua-primary-50/30 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-inclua-primary">
            Precios
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Planes simples y accesibles
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Empeza gratis, pasate al Pro cuando lo necesites
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {PLANES.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative overflow-hidden transition-shadow",
                plan.accent
                  ? "border-inclua-accent/40 shadow-lg shadow-inclua-accent/5"
                  : "border-border/60"
              )}
            >
              {plan.accent && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-inclua-accent to-emerald-400" />
                  <Badge className="absolute top-4 right-4 bg-inclua-accent text-white border-0 shadow-sm">
                    Popular
                  </Badge>
                </>
              )}
              <CardHeader className="pb-2 pt-6">
                <CardTitle className="font-display text-lg font-bold">
                  {plan.nombre}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{plan.descripcion}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold text-foreground">
                    {plan.precio}
                  </span>
                  {plan.periodo && (
                    <span className="text-sm text-muted-foreground">{plan.periodo}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                <ul className="space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm">
                      {f.ok ? (
                        <div className="flex size-5 items-center justify-center rounded-full bg-inclua-accent/10">
                          <Check className="size-3 text-inclua-accent" />
                        </div>
                      ) : (
                        <div className="flex size-5 items-center justify-center rounded-full bg-muted">
                          <X className="size-3 text-muted-foreground/50" />
                        </div>
                      )}
                      <span className={cn(!f.ok && "text-muted-foreground/60")}>
                        {f.texto}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full h-auto py-3 rounded-xl font-semibold",
                    plan.accent
                      ? "bg-inclua-accent hover:bg-inclua-accent-dark text-white shadow-md shadow-inclua-accent/20"
                      : "bg-inclua-primary hover:bg-inclua-primary-light text-white"
                  )}
                >
                  {plan.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Pagos procesados por Mercado Pago. Cancela cuando quieras.
        </p>
      </div>
    </section>
  )
}
