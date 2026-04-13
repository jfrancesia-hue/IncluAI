"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { iniciarSesion, type LoginState } from "./actions"

const initialState: LoginState = {}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    iniciarSesion,
    initialState
  )

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-display text-xl">Iniciar sesión</CardTitle>
        <p className="text-sm text-muted-foreground">
          Accedé a tu cuenta de IncluIA
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

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Tu contraseña"
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-inclua-primary hover:bg-inclua-primary-light text-white"
          >
            {isPending ? "Ingresando..." : "Ingresar"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link
              href="/registro"
              className="font-medium text-inclua-accent hover:underline"
            >
              Creá una gratis
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
