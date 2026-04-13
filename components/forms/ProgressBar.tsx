"use client"

import type { FormStep } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const STEPS: { step: FormStep; label: string; icon: string }[] = [
  { step: 1, label: "Contexto", icon: "📝" },
  { step: 2, label: "Discapacidad", icon: "🧩" },
  { step: 3, label: "Revisar", icon: "✨" },
]

export function ProgressBar({ currentStep }: { currentStep: FormStep }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3}>
        {STEPS.map(({ step, label, icon }, i) => (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-1 flex-col items-center gap-2">
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-2xl text-lg font-semibold transition-all",
                  step < currentStep && "bg-inclua-accent text-white shadow-md shadow-inclua-accent/20",
                  step === currentStep && "bg-inclua-primary text-white shadow-lg shadow-inclua-primary/20 scale-110",
                  step > currentStep && "bg-muted text-muted-foreground"
                )}
              >
                {step < currentStep ? <Check className="size-5" /> : icon}
              </div>
              <span
                className={cn(
                  "text-xs font-semibold transition-colors",
                  step <= currentStep ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                "mb-7 h-0.5 flex-1 mx-2 rounded-full transition-colors",
                step < currentStep ? "bg-inclua-accent" : "bg-border"
              )} />
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground" aria-live="polite">
        Paso {currentStep} de 3
      </p>
    </div>
  )
}
