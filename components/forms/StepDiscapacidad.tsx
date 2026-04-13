"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DISCAPACIDADES } from "@/data/discapacidades"
import type { FormularioConsulta, SituacionApoyo } from "@/lib/types"
import { cn } from "@/lib/utils"

type Props = {
  form: FormularioConsulta
  updateForm: (updates: Partial<FormularioConsulta>) => void
}

const APOYO_OPTIONS: { id: SituacionApoyo; label: string }[] = [
  { id: "maestra_integradora", label: "Maestra integradora / MAI" },
  { id: "acompanante_terapeutico", label: "Acompañante terapéutico (AT)" },
  { id: "sin_apoyo", label: "Sin apoyo profesional" },
  { id: "en_diagnostico", label: "En proceso de diagnóstico" },
  { id: "otro", label: "Otra situación" },
]

export function StepDiscapacidad({ form, updateForm }: Props) {
  const toggleDiscapacidad = (id: string) => {
    const current = form.discapacidades
    if (current.includes(id)) {
      updateForm({ discapacidades: current.filter((d) => d !== id) })
    } else {
      updateForm({ discapacidades: [...current, id] })
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">
          Paso 2: Discapacidad/es
        </h2>
        <p className="text-sm text-muted-foreground">
          Seleccioná una o más discapacidades del alumno/a
        </p>
      </div>

      {/* Grid de discapacidades */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {DISCAPACIDADES.map((d) => {
          const selected = form.discapacidades.includes(d.id)
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => toggleDiscapacidad(d.id)}
              title={d.descripcion}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-center transition-all",
                "hover:border-inclua-accent/50 focus-visible:outline-2 focus-visible:outline-inclua-primary focus-visible:outline-offset-2",
                "min-h-[5.5rem]",
                selected
                  ? "border-inclua-accent bg-inclua-accent-light/50"
                  : "border-border bg-card"
              )}
              aria-pressed={selected}
            >
              <span className="text-2xl" aria-hidden="true">
                {d.icon}
              </span>
              <span className="text-xs font-medium leading-tight">
                {d.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Input "otra" */}
      {form.discapacidades.includes("otra") && (
        <div className="space-y-1.5">
          <Label htmlFor="discapacidad_otra">Especificá la condición</Label>
          <Input
            id="discapacidad_otra"
            value={form.discapacidad_otra ?? ""}
            onChange={(e) => updateForm({ discapacidad_otra: e.target.value })}
            placeholder="Ej: Síndrome de Down, parálisis cerebral..."
          />
        </div>
      )}

      {/* Cantidad de alumnos */}
      <div className="space-y-1.5">
        <Label htmlFor="cantidad">¿Cuántos alumnos con discapacidad hay en el aula?</Label>
        <Input
          id="cantidad"
          type="number"
          min={1}
          max={20}
          value={form.cantidad_alumnos}
          onChange={(e) =>
            updateForm({ cantidad_alumnos: Math.max(1, parseInt(e.target.value) || 1) })
          }
          className="w-24"
        />
      </div>

      {/* Situación de apoyo */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-foreground">
          Situación de apoyo en el aula *
        </legend>
        <div className="space-y-1.5">
          {APOYO_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                form.situacion_apoyo === opt.id
                  ? "border-inclua-primary bg-inclua-primary-50"
                  : "border-border hover:bg-muted"
              )}
            >
              <input
                type="radio"
                name="situacion_apoyo"
                value={opt.id}
                checked={form.situacion_apoyo === opt.id}
                onChange={() => updateForm({ situacion_apoyo: opt.id })}
                className="size-4 accent-inclua-primary"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Input "otro" apoyo */}
      {form.situacion_apoyo === "otro" && (
        <div className="space-y-1.5">
          <Label htmlFor="apoyo_otra">Describí la situación de apoyo</Label>
          <Input
            id="apoyo_otra"
            value={form.situacion_apoyo_otra ?? ""}
            onChange={(e) => updateForm({ situacion_apoyo_otra: e.target.value })}
            placeholder="Ej: Viene un DAI una vez por semana..."
          />
        </div>
      )}
    </div>
  )
}
