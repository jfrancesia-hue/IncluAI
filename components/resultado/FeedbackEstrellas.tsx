"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  consultaId?: string
  onSubmit?: (estrellas: number) => void
}

export function FeedbackEstrellas({ consultaId, onSubmit }: Props) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleClick = async (estrellas: number) => {
    setRating(estrellas)
    setSubmitted(true)

    if (consultaId) {
      try {
        await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ consulta_id: consultaId, estrellas }),
        })
      } catch {
        // No bloquear la UX si falla el feedback
      }
    }

    onSubmit?.(estrellas)
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={cn(
                "size-5",
                i <= rating ? "fill-amber-400 text-amber-400" : "text-border"
              )}
            />
          ))}
        </div>
        <span>Gracias por tu feedback</span>
      </div>
    )
  }

  return (
    <div className="no-print">
      <p className="mb-1 text-sm font-medium text-foreground">
        ¿Te resultó útil esta guía?
      </p>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-inclua-primary"
            aria-label={`${i} estrella${i !== 1 ? "s" : ""}`}
          >
            <Star
              className={cn(
                "size-6 transition-colors",
                i <= (hover || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-border"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
