import { Card, CardContent } from "@/components/ui/card"

const TESTIMONIOS = [
  {
    nombre: "María Fernández",
    rol: "Docente de primaria",
    ubicacion: "Tucumán",
    texto:
      "Tengo un alumno con TEA y nunca sabía por dónde empezar. IncluIA me dio estrategias concretas que pude usar al otro día en el aula.",
  },
  {
    nombre: "Carlos Méndez",
    rol: "Maestro integrador",
    ubicacion: "Buenos Aires",
    texto:
      "Lo que más me gusta es que las guías son específicas para el contenido que voy a dar. No es teoría genérica, son ejemplos reales.",
  },
  {
    nombre: "Laura Gutiérrez",
    rol: "Docente de secundaria",
    ubicacion: "Córdoba",
    texto:
      "En mi escuela rural no tenemos equipo de apoyo. IncluIA me ayuda a planificar sola sin sentirme perdida.",
  },
]

export function Testimonios() {
  return (
    <section className="bg-inclua-primary-50 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
          Lo que dicen los docentes
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {TESTIMONIOS.map((t) => (
            <Card key={t.nombre}>
              <CardContent className="py-5">
                <p className="text-sm italic text-foreground leading-relaxed">
                  &ldquo;{t.texto}&rdquo;
                </p>
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-sm font-semibold text-foreground">
                    {t.nombre}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.rol} — {t.ubicacion}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
