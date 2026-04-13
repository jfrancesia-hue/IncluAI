import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-inclua-primary px-4 py-20 sm:py-28">
      {/* Gradiente decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-inclua-primary via-inclua-primary-light/30 to-inclua-primary" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Badge className="mb-6 bg-white/10 text-white/90 border-white/20 text-sm px-3 py-1">
          Para docentes de toda Argentina
        </Badge>

        <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
          Planificá clases inclusivas{" "}
          <span className="text-inclua-accent-light">en minutos</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
          IA especializada en educación inclusiva que genera guías pedagógicas
          concretas para alumnos con discapacidad. Tan fácil como llenar un
          formulario.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/registro"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-inclua-accent hover:bg-inclua-accent-dark text-white px-8 h-auto py-3.5 text-base font-semibold shadow-lg"
            )}
          >
            Crear mi primera guía — gratis
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/30 text-white hover:bg-white/10 hover:text-white h-auto py-3.5 text-base"
            )}
          >
            Ya tengo cuenta
          </Link>
        </div>

        <p className="mt-6 text-sm text-white/50">
          Sin tarjeta de crédito. 2 guías gratis por mes.
        </p>
      </div>
    </section>
  )
}
