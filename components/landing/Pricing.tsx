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
    features: [
      { texto: "2 guías por mes", ok: true },
      { texto: "Formulario de 3 pasos", ok: true },
      { texto: "Resultado con streaming", ok: true },
      { texto: "Copiar e imprimir", ok: true },
      { texto: "Historial", ok: false },
      { texto: "Favoritos y PDF", ok: false },
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
    features: [
      { texto: "40 guías por mes", ok: true },
      { texto: "Formulario de 3 pasos", ok: true },
      { texto: "Resultado con streaming", ok: true },
      { texto: "Copiar e imprimir", ok: true },
      { texto: "Historial completo", ok: true },
      { texto: "Favoritos y PDF", ok: true },
    ],
    cta: "Suscribirme",
    href: "/registro",
    accent: true,
  },
]

export function Pricing() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
          Planes simples y accesibles
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Empezá gratis, pasate al Pro cuando lo necesites
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PLANES.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative",
                plan.accent && "border-inclua-accent shadow-md"
              )}
            >
              {plan.accent && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-inclua-accent text-white">
                  Más popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="font-display text-lg">
                  {plan.nombre}
                </CardTitle>
                <div className="mt-1">
                  <span className="font-display text-3xl font-bold">
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
                      {f.ok ? (
                        <Check className="size-4 shrink-0 text-inclua-accent" />
                      ) : (
                        <X className="size-4 shrink-0 text-muted-foreground/40" />
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
                    "w-full h-auto py-2.5",
                    plan.accent
                      ? "bg-inclua-accent hover:bg-inclua-accent-dark text-white"
                      : ""
                  )}
                >
                  {plan.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
