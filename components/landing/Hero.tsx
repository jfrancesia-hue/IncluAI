import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-inclua-primary min-h-[85vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-inclua-primary via-[#1a3355] to-[#0f2440]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-32 size-96 rounded-full bg-inclua-accent/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 size-96 rounded-full bg-blue-400/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:py-28">
        <Badge className="mb-8 bg-white/10 text-white/90 border-white/15 text-sm px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="size-3.5 mr-1.5" />
          Para docentes de toda Argentina
        </Badge>

        <h1 className="font-display text-[clamp(2.2rem,5.5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight text-white">
          Planifica clases{" "}
          <span className="relative">
            <span className="relative z-10 text-inclua-accent-light">inclusivas</span>
            <span className="absolute -bottom-1 left-0 right-0 h-3 bg-inclua-accent/20 rounded-sm -z-0" />
          </span>
          <br />
          en minutos
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
          Inteligencia artificial especializada en educacion inclusiva.
          Genera guias pedagogicas concretas y personalizadas para alumnos
          con discapacidad.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/registro"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-inclua-accent hover:bg-inclua-accent-dark text-white px-8 h-auto py-4 text-base font-semibold shadow-xl shadow-inclua-accent/25 transition-all hover:shadow-2xl hover:shadow-inclua-accent/30 hover:-translate-y-0.5 rounded-xl"
            )}
          >
            Crear mi primera guia gratis
            <ArrowRight className="size-4 ml-2" />
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/20 text-white hover:bg-white/10 hover:text-white h-auto py-4 text-base rounded-xl backdrop-blur-sm"
            )}
          >
            Ya tengo cuenta
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-inclua-accent" />
            Sin tarjeta de credito
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-inclua-accent" />
            2 guias gratis por mes
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-inclua-accent" />
            Resultados en segundos
          </span>
        </div>
      </div>
    </section>
  )
}
