import { DISCAPACIDADES } from "@/data/discapacidades"

export function GridDiscapacidades() {
  const items = DISCAPACIDADES.filter((d) => d.id !== "otra")

  return (
    <section className="bg-gradient-to-b from-inclua-primary-50/50 to-background px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-inclua-primary">
            Cobertura completa
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Guias para todas las discapacidades
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Estrategias especificas, concretas y basadas en evidencia para cada condicion
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((d) => (
            <div
              key={d.id}
              className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm transition-all hover:border-inclua-accent/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-3xl transition-transform group-hover:scale-110" aria-hidden="true">
                {d.icon}
              </span>
              <span className="text-xs font-semibold text-foreground leading-tight">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
