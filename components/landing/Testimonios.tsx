import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const TESTIMONIOS = [
  {
    nombre: "Maria Fernandez",
    rol: "Docente de primaria",
    ubicacion: "Tucuman",
    estrellas: 5,
    texto:
      "Tengo un alumno con TEA y nunca sabia por donde empezar. IncluIA me dio estrategias concretas que pude usar al otro dia en el aula.",
  },
  {
    nombre: "Carlos Mendez",
    rol: "Maestro integrador",
    ubicacion: "Buenos Aires",
    estrellas: 5,
    texto:
      "Lo que mas me gusta es que las guias son especificas para el contenido que voy a dar. No es teoria generica, son ejemplos reales.",
  },
  {
    nombre: "Laura Gutierrez",
    rol: "Docente de secundaria",
    ubicacion: "Cordoba",
    estrellas: 4,
    texto:
      "En mi escuela rural no tenemos equipo de apoyo. IncluIA me ayuda a planificar sola sin sentirme perdida.",
  },
]

export function Testimonios() {
  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-inclua-accent">
            Testimonios
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Lo que dicen los docentes
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {TESTIMONIOS.map((t) => (
            <Card key={t.nombre} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="py-6 px-5">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < t.estrellas ? "fill-amber-400 text-amber-400" : "text-border"}`}
                    />
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-foreground">
                  &ldquo;{t.texto}&rdquo;
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-inclua-primary-bg font-display text-sm font-bold text-inclua-primary">
                    {t.nombre[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.rol} — {t.ubicacion}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
