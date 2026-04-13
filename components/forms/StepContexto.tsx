"use client"

import { useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NIVELES, getNivelById } from "@/data/niveles"
import { getMateriasPorNivel } from "@/data/materias"
import type { FormularioConsulta } from "@/lib/types"

type Props = {
  form: FormularioConsulta
  updateForm: (updates: Partial<FormularioConsulta>) => void
}

export function StepContexto({ form, updateForm }: Props) {
  const nivel = useMemo(() => getNivelById(form.nivel_id), [form.nivel_id])

  const subnivel = useMemo(
    () => (nivel?.subniveles ?? []).find((s) => s.id === form.subnivel_id),
    [nivel, form.subnivel_id]
  )

  const subniveles = nivel?.subniveles ?? []
  const anios = subnivel?.anios ?? []
  const materias = useMemo(() => getMateriasPorNivel(form.nivel_id), [form.nivel_id])

  const handleNivelChange = (value: string | null) => {
    if (!value) return
    updateForm({
      nivel_id: value,
      subnivel_id: "",
      anio_grado: "",
      materia: "",
    })
  }

  const handleSubnivelChange = (value: string | null) => {
    if (!value) return
    updateForm({ subnivel_id: value, anio_grado: "" })
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold text-foreground">
        Paso 1: Contexto docente
      </h2>
      <p className="text-sm text-muted-foreground">
        Contanos sobre tu clase para generar una guía precisa
      </p>

      {/* Nivel educativo */}
      <div className="space-y-1.5">
        <Label htmlFor="nivel">Nivel educativo *</Label>
        <Select value={form.nivel_id} onValueChange={handleNivelChange}>
          <SelectTrigger id="nivel">
            <SelectValue placeholder="Seleccioná el nivel" />
          </SelectTrigger>
          <SelectContent>
            {NIVELES.map((n) => (
              <SelectItem key={n.id} value={n.id}>
                {n.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subnivel */}
      {subniveles.length > 0 && (
        <div className="space-y-1.5">
          <Label htmlFor="subnivel">Subnivel / Ciclo *</Label>
          <Select value={form.subnivel_id ?? ""} onValueChange={handleSubnivelChange}>
            <SelectTrigger id="subnivel">
              <SelectValue placeholder="Seleccioná el subnivel" />
            </SelectTrigger>
            <SelectContent>
              {subniveles.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Año/Grado/Sala */}
      {anios.length > 0 && (
        <div className="space-y-1.5">
          <Label htmlFor="anio">Año / Grado / Sala *</Label>
          <Select value={form.anio_grado} onValueChange={(v) => v && updateForm({ anio_grado: v })}>
            <SelectTrigger id="anio">
              <SelectValue placeholder="Seleccioná" />
            </SelectTrigger>
            <SelectContent>
              {anios.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Materia */}
      {materias.length > 0 && (
        <div className="space-y-1.5">
          <Label htmlFor="materia">Materia / Área *</Label>
          <Select value={form.materia} onValueChange={(v) => v && updateForm({ materia: v })}>
            <SelectTrigger id="materia">
              <SelectValue placeholder="Seleccioná la materia" />
            </SelectTrigger>
            <SelectContent>
              {materias.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Contenido */}
      <div className="space-y-1.5">
        <Label htmlFor="contenido">¿Qué contenido vas a trabajar? *</Label>
        <Textarea
          id="contenido"
          value={form.contenido}
          onChange={(e) => updateForm({ contenido: e.target.value })}
          placeholder="Ej: Fracciones equivalentes, suma y resta de fracciones con igual denominador"
          rows={3}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Cuanto más específico, mejor será la guía
        </p>
      </div>
    </div>
  )
}
