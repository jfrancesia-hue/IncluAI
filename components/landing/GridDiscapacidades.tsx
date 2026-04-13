import { DISCAPACIDADES } from "@/data/discapacidades"

export function GridDiscapacidades() {
  // Mostrar todas menos "otra"
  const items = DISCAPACIDADES.filter((d) => d.id !== "otra")

  return (
    <section className="bg-inclua-primary-50 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
          Guías para todas las discapacidades
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Estrategias específicas y concretas para cada condición
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((d) => (
            <div
              key={d.id}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center shadow-sm"
            >
              <span className="text-3xl" aria-hidden="true">
                {d.icon}
              </span>
              <span className="text-sm font-medium text-foreground leading-tight">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
