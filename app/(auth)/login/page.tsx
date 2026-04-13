"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { iniciarSesion, type LoginState } from "./actions"

const initialState: LoginState = {}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    iniciarSesion,
    initialState
  )

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Bienvenido/a de vuelta
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Ingresa a tu cuenta para seguir creando guias inclusivas
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        {state.error && (
          <div
            role="alert"
            className="rounded-xl bg-destructive/10 border border-destructive/20 p-3.5 text-sm text-destructive"
          >
            {state.error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="maria@escuela.edu.ar"
            autoComplete="email"
            className="h-11 rounded-xl border-border/80 bg-card px-4 focus-visible:border-inclua-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Contrasena</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Tu contrasena"
            autoComplete="current-password"
            className="h-11 rounded-xl border-border/80 bg-card px-4 focus-visible:border-inclua-primary"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-xl bg-inclua-primary hover:bg-inclua-primary-light text-white font-semibold shadow-md shadow-inclua-primary/15 transition-all hover:-translate-y-0.5"
        >
          {isPending ? (
            "Ingresando..."
          ) : (
            <>
              <LogIn className="size-4 mr-2" />
              Ingresar
            </>
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/60" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-xs text-muted-foreground">o</span>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          ¿No tenes cuenta?{" "}
          <Link
            href="/registro"
            className="font-semibold text-inclua-accent hover:underline"
          >
            Crea una gratis
          </Link>
        </p>
      </form>
    </div>
  )
}
