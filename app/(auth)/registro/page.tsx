"use client"

import { useActionState } from "react"
import Link from "next/link"
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
import { UserPlus } from "lucide-react"
import { PROVINCIAS_ARGENTINA } from "@/lib/types"
import { registrarUsuario, type RegistroState } from "./actions"

const initialState: RegistroState = {}

const inputClass = "h-11 rounded-xl border-border/80 bg-card px-4 focus-visible:border-inclua-primary"

export default function RegistroPage() {
  const [state, formAction, isPending] = useActionState(
    registrarUsuario,
    initialState
  )

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Crea tu cuenta
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Empeza a generar guias inclusivas gratis
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        {state.error && (
          <div
            role="alert"
            className="rounded-xl bg-destructive/10 border border-destructive/20 p-3.5 text-sm text-destructive"
          >
            {state.error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-sm font-medium">Nombre *</Label>
            <Input
              id="nombre"
              name="nombre"
              required
              placeholder="Maria"
              autoComplete="given-name"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apellido" className="text-sm font-medium">Apellido *</Label>
            <Input
              id="apellido"
              name="apellido"
              required
              placeholder="Gonzalez"
              autoComplete="family-name"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="maria@escuela.edu.ar"
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Contrasena *</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Minimo 6 caracteres"
            autoComplete="new-password"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="institucion" className="text-sm font-medium">Institucion educativa</Label>
          <Input
            id="institucion"
            name="institucion"
            placeholder="Escuela N 42"
            autoComplete="organization"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="localidad" className="text-sm font-medium">Localidad</Label>
            <Input
              id="localidad"
              name="localidad"
              placeholder="Tucuman capital"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="provincia" className="text-sm font-medium">Provincia</Label>
            <Select name="provincia">
              <SelectTrigger id="provincia" className="h-11 rounded-xl border-border/80">
                <SelectValue placeholder="Selecciona" />
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
          className="w-full h-11 rounded-xl bg-inclua-accent hover:bg-inclua-accent-dark text-white font-semibold shadow-md shadow-inclua-accent/15 transition-all hover:-translate-y-0.5 mt-2"
        >
          {isPending ? (
            "Creando cuenta..."
          ) : (
            <>
              <UserPlus className="size-4 mr-2" />
              Crear mi cuenta
            </>
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground pt-2">
          ¿Ya tenes cuenta?{" "}
          <Link
            href="/login"
            className="font-semibold text-inclua-primary hover:underline"
          >
            Inicia sesion
          </Link>
        </p>
      </form>
    </div>
  )
}
