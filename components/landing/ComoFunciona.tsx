const PASOS = [
  {
    numero: "1",
    emoji: "📝",
    titulo: "Completá el formulario",
    descripcion:
      "Indicá nivel, materia, contenido y discapacidad del alumno. Son 3 pasos simples.",
  },
  {
    numero: "2",
    emoji: "🤖",
    titulo: "La IA genera tu guía",
    descripcion:
      "Claude analiza tu situación y genera una guía pedagógica concreta con estrategias, materiales y evaluación.",
  },
  {
    numero: "3",
    emoji: "🏫",
    titulo: "Aplicá en el aula",
    descripcion:
      "Copiá, imprimí o guardá la guía. Cada estrategia incluye ejemplos reales con tu contenido.",
  },
]

export function ComoFunciona() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
          ¿Cómo funciona?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          En menos de 3 minutos tenés una guía inclusiva lista para usar
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {PASOS.map((paso) => (
            <div key={paso.numero} className="text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-inclua-primary-bg text-3xl">
                {paso.emoji}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                {paso.titulo}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
