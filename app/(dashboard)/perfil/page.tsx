"use client"

import { useActionState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { usePerfil } from "@/hooks/usePerfil"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PROVINCIAS_ARGENTINA, LIMITES_PLAN } from "@/lib/types"
import { PlanBadge } from "@/components/layout/PlanBadge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { actualizarPerfil, type PerfilState } from "./actions"

const initialState: PerfilState = {}

export default function PerfilPage() {
  const { user, loading: authLoading } = useAuth()
  const { perfil, loading: perfilLoading } = usePerfil(user?.id)
  const [state, formAction, isPending] = useActionState(
    actualizarPerfil,
    initialState
  )

  if (authLoading || perfilLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!perfil) return null

  const limite = LIMITES_PLAN[perfil.plan]
  const esPro = perfil.plan === "pro" || perfil.plan === "institucional"

  const vencimiento = perfil.plan_activo_hasta
    ? new Date(perfil.plan_activo_hasta).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Mi perfil
      </h1>

      {/* Info del plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Tu plan</CardTitle>
            <PlanBadge plan={perfil.plan} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Guías este mes</p>
              <p className="text-lg font-semibold text-foreground">
                {perfil.consultas_mes}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  / {limite.guias_por_mes}
                </span>
              </p>
            </div>
            {esPro && vencimiento && (
              <div>
                <p className="text-muted-foreground">Vence</p>
                <p className="text-sm font-medium text-foreground">
                  {vencimiento}
                </p>
              </div>
            )}
          </div>

          {!esPro && (
            <Link
              href="/planes"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-inclua-accent hover:bg-inclua-accent-dark text-white"
              )}
            >
              Pasarme al Pro
            </Link>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Datos editables */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Datos personales</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {state.error && (
              <div
                role="alert"
                className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
              >
                {state.error}
              </div>
            )}
            {state.success && (
              <div className="rounded-lg bg-inclua-accent-light p-3 text-sm text-inclua-accent-dark">
                Perfil actualizado correctamente.
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  required
                  defaultValue={perfil.nombre}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  name="apellido"
                  required
                  defaultValue={perfil.apellido}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={perfil.email} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">
                El email no se puede cambiar
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="institucion">Institución educativa</Label>
              <Input
                id="institucion"
                name="institucion"
                defaultValue={perfil.institucion ?? ""}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="localidad">Localidad</Label>
                <Input
                  id="localidad"
                  name="localidad"
                  defaultValue={perfil.localidad ?? ""}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="provincia">Provincia</Label>
                <Select
                  name="provincia"
                  defaultValue={perfil.provincia ?? ""}
                >
                  <SelectTrigger id="provincia">
                    <SelectValue placeholder="Seleccioná" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCIAS_ARGENTINA.map((prov) => (
                      <SelectItem key={prov} value={prov}>
                        {prov}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="bg-inclua-primary hover:bg-inclua-primary-light text-white"
            >
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
