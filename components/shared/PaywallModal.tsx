"use client"

import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LIMITES_PLAN } from "@/lib/types"

type Props = {
  open: boolean
  onClose: () => void
  mensaje?: string
}

export function PaywallModal({ open, onClose, mensaje }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <div className="mx-auto mb-2 text-4xl">🔒</div>
          <DialogTitle className="font-display text-xl">
            Plan Gratuito
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {mensaje || "Usaste tus 2 guías gratuitas de este mes."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <p className="text-sm text-foreground">
            Con el <strong>Plan Pro (${LIMITES_PLAN.pro.precio_ars.toLocaleString("es-AR")}/mes)</strong> generás hasta {LIMITES_PLAN.pro.guias_por_mes} guías por mes, guardás tu historial y exportás a PDF.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/planes"
              className={cn(
                buttonVariants(),
                "bg-inclua-accent hover:bg-inclua-accent-dark text-white"
              )}
              onClick={onClose}
            >
              Ver planes
            </Link>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
