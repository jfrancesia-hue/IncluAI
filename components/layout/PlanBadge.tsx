"use client"

import { Badge } from "@/components/ui/badge"
import type { PlanUsuario } from "@/lib/types"

export function PlanBadge({ plan }: { plan: PlanUsuario }) {
  if (plan === "pro" || plan === "institucional") {
    return (
      <Badge className="bg-inclua-accent-light text-inclua-accent-dark border-inclua-accent/20">
        Pro
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="text-muted-foreground">
      Gratuito
    </Badge>
  )
}
