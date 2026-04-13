"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getNivelById } from "@/data/niveles"
import { getDiscapacidadesByIds } from "@/data/discapacidades"
import type { FormularioConsulta } from "@/lib/types"

type Props = {
  form: FormularioConsulta
  updateForm: (updates: Partial<FormularioConsulta>) => void
}

export function StepAdicional({ form, updateForm }: Props) {
  const nivel = getNivelById(form.nivel_id)
  const discapacidades = getDiscapacidadesByIds(form.discapacidades)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">
          Paso 3: Contexto adicional
        </h2>
        <p className="text-sm text-muted-foreground">
          Información opcional para una guía más precisa
        </p>
      </div>

      {/* Contexto del aula */}
      <div className="space-y-1.5">
        <Label htmlFor="contexto_aula">Contexto del aula (opcional)</Label>
        <Textarea
          id="contexto_aula"
          value={form.contexto_aula ?? ""}
          onChange={(e) => updateForm({ contexto_aula: e.target.value })}
          placeholder="Ej: El aula tiene 28 alumnos, es un grupo muy disperso, no hay proyector..."
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Objetivo de la clase */}
      <div className="space-y-1.5">
        <Label htmlFor="objetivo_clase">Objetivo de la clase (opcional)</Label>
        <Textarea
          id="objetivo_clase"
          value={form.objetivo_clase ?? ""}
          onChange={(e) => updateForm({ objetivo_clase: e.target.value })}
          placeholder="Ej: Que los alumnos puedan identificar fracciones equivalentes y operar con ellas"
          rows={2}
          className="resize-none"
        />
      </div>

      {/* Resumen */}
      <Card className="border-inclua-primary/20 bg-inclua-primary-50/50">
        <CardContent className="py-4">
          <h3 className="mb-3 text-sm font-semibold text-inclua-primary">
            Resumen de tu consulta
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="shrink-0 font-medium text-muted-foreground">Nivel:</dt>
              <dd>{nivel?.label ?? "—"} — {form.anio_grado}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-medium text-muted-foreground">Materia:</dt>
              <dd>{form.materia || "—"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-medium text-muted-foreground">Contenido:</dt>
              <dd className="line-clamp-2">{form.contenido || "—"}</dd>
            </div>
            <div className="flex flex-wrap items-start gap-2">
              <dt className="shrink-0 font-medium text-muted-foreground">Discapacidad/es:</dt>
              <dd className="flex flex-wrap gap-1">
                {discapacidades.map((d) => (
                  <Badge key={d.id} variant="secondary" className="text-xs">
                    {d.icon} {d.label}
                  </Badge>
                ))}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-medium text-muted-foreground">Alumnos:</dt>
              <dd>{form.cantidad_alumnos}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
