const PASOS = [
  {
    numero: "01",
    emoji: "📝",
    color: "bg-blue-50 text-inclua-primary",
    titulo: "Completa el formulario",
    descripcion:
      "Indica nivel educativo, materia, contenido y la discapacidad del alumno. Son 3 pasos simples y guiados.",
  },
  {
    numero: "02",
    emoji: "🤖",
    color: "bg-emerald-50 text-inclua-accent",
    titulo: "La IA genera tu guia",
    descripcion:
      "Claude analiza tu situacion y genera una guia pedagogica con estrategias, materiales, evaluacion y mas.",
  },
  {
    numero: "03",
    emoji: "🏫",
    color: "bg-orange-50 text-inclua-orange",
    titulo: "Aplica en el aula",
    descripcion:
      "Copia, imprime o guarda la guia. Cada estrategia incluye ejemplos reales con tu contenido especifico.",
  },
]

export function ComoFunciona() {
  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-inclua-accent">
            Simple y rapido
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            ¿Como funciona?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            En menos de 3 minutos tenes una guia inclusiva lista para usar en tu aula
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {PASOS.map((paso, i) => (
            <div key={paso.numero} className="relative group">
              {/* Connector line */}
              {i < PASOS.length - 1 && (
                <div className="hidden sm:block absolute top-12 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px border-t-2 border-dashed border-border" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className={cn("relative mb-5 flex size-24 items-center justify-center rounded-2xl text-4xl transition-transform group-hover:scale-105", paso.color)}>
                  {paso.emoji}
                  <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-inclua-primary text-xs font-bold text-white shadow-md">
                    {paso.numero}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {paso.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {paso.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
