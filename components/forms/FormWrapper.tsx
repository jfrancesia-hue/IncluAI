"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ProgressBar } from "./ProgressBar"
import { StepContexto } from "./StepContexto"
import { StepDiscapacidad } from "./StepDiscapacidad"
import { StepAdicional } from "./StepAdicional"
import { Button } from "@/components/ui/button"
import type { FormStep, FormularioConsulta } from "@/lib/types"

const INITIAL_FORM: FormularioConsulta = {
  nivel_id: "",
  subnivel_id: "",
  anio_grado: "",
  materia: "",
  contenido: "",
  discapacidades: [],
  discapacidad_otra: "",
  cantidad_alumnos: 1,
  situacion_apoyo: "sin_apoyo",
  situacion_apoyo_otra: "",
  contexto_aula: "",
  objetivo_clase: "",
}

function isStep1Valid(form: FormularioConsulta): boolean {
  return !!(form.nivel_id && form.anio_grado && form.materia && form.contenido.trim())
}

function isStep2Valid(form: FormularioConsulta): boolean {
  return (
    form.discapacidades.length > 0 &&
    form.cantidad_alumnos >= 1 &&
    !!form.situacion_apoyo
  )
}

export function FormWrapper() {
  const [step, setStep] = useState<FormStep>(1)
  const [form, setForm] = useState<FormularioConsulta>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const updateForm = useCallback(
    (updates: Partial<FormularioConsulta>) => {
      setForm((prev) => ({ ...prev, ...updates }))
    },
    []
  )

  const canGoNext = step === 1 ? isStep1Valid(form) : step === 2 ? isStep2Valid(form) : true

  const handleNext = () => {
    if (step < 3) setStep((s) => (s + 1) as FormStep)
  }

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as FormStep)
  }

  const handleGenerar = async () => {
    setLoading(true)
    setError(null)

    try {
      // Guardar datos del formulario en sessionStorage para la página de resultado
      sessionStorage.setItem("inclua_form", JSON.stringify(form))
      router.push("/resultado")
    } catch {
      setError("Error al procesar la consulta. Intentá de nuevo.")
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ProgressBar currentStep={step} />

      {error && (
        <div role="alert" className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:p-8">
        {step === 1 && <StepContexto form={form} updateForm={updateForm} />}
        {step === 2 && <StepDiscapacidad form={form} updateForm={updateForm} />}
        {step === 3 && <StepAdicional form={form} updateForm={updateForm} />}

        <div className="mt-8 flex items-center justify-between gap-3 pt-6 border-t border-border/40">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack} disabled={loading} className="rounded-xl">
              Anterior
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!canGoNext}
              className="bg-inclua-primary hover:bg-inclua-primary-light text-white rounded-xl px-6 shadow-md shadow-inclua-primary/15 transition-all hover:-translate-y-0.5"
            >
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={handleGenerar}
              disabled={loading}
              className="bg-inclua-accent hover:bg-inclua-accent-dark text-white px-8 rounded-xl shadow-lg shadow-inclua-accent/20 transition-all hover:-translate-y-0.5 font-semibold"
            >
              {loading ? "Preparando..." : "✨ Generar guia inclusiva"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
