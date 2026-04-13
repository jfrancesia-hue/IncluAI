"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PROVINCIAS_ARGENTINA } from "@/lib/types"
import { registrarUsuario, type RegistroState } from "./actions"

const initialState: RegistroState = {}

export default function RegistroPage() {
  const [state, formAction, isPending] = useActionState(
    registrarUsuario,
    initialState
  )

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-display text-xl">Crear cuenta</CardTitle>
        <p className="text-sm text-muted-foreground">
          Empezá a generar guías inclusivas gratis
        </p>
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                name="nombre"
                required
                placeholder="María"
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input
                id="apellido"
                name="apellido"
                required
                placeholder="González"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="maria@escuela.edu.ar"
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Contraseña *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="institucion">Institución educativa</Label>
            <Input
              id="institucion"
              name="institucion"
              placeholder="Escuela N° 42"
              autoComplete="organization"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="localidad">Localidad</Label>
              <Input
                id="localidad"
                name="localidad"
                placeholder="Tucumán capital"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="provincia">Provincia</Label>
              <Select name="provincia">
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
            className="w-full bg-inclua-accent hover:bg-inclua-accent-dark text-white"
          >
            {isPending ? "Creando cuenta..." : "Crear mi cuenta"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tenés cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-inclua-primary hover:underline"
            >
              Iniciá sesión
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
