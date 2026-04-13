"use client"

import type { FormStep } from "@/lib/types"
import { cn } from "@/lib/utils"

const STEPS: { step: FormStep; label: string }[] = [
  { step: 1, label: "Contexto" },
  { step: 2, label: "Discapacidad" },
  { step: 3, label: "Adicional" },
]

export function ProgressBar({ currentStep }: { currentStep: FormStep }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3}>
        {STEPS.map(({ step, label }, i) => (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-1 flex-col items-center gap-1">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  step < currentStep && "bg-inclua-accent text-white",
                  step === currentStep && "bg-inclua-primary text-white",
                  step > currentStep && "bg-border text-muted-foreground"
                )}
              >
                {step < currentStep ? "✓" : step}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  step <= currentStep ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mb-5 h-0.5 flex-1",
                  step < currentStep ? "bg-inclua-accent" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-sm text-muted-foreground" aria-live="polite">
        Paso {currentStep} de 3
      </p>
    </div>
  )
}
