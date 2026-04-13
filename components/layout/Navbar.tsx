"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { usePerfil } from "@/hooks/usePerfil"
import { PlanBadge } from "./PlanBadge"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, User, History, Home } from "lucide-react"

export function Navbar() {
  const { user, signOut } = useAuth()
  const { perfil } = usePerfil(user?.id)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: "/inicio", label: "Inicio", icon: Home },
    { href: "/nueva-consulta", label: "Nueva consulta", icon: null },
    { href: "/historial", label: "Historial", icon: History },
    { href: "/perfil", label: "Mi perfil", icon: User },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/inicio" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-inclua-primary">
            Inclu<span className="text-inclua-accent">IA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {perfil && <PlanBadge plan={perfil.plan} />}

          {perfil && (
            <span className="hidden text-sm text-muted-foreground md:block">
              {perfil.nombre}
            </span>
          )}

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={signOut}
            aria-label="Cerrar sesión"
            className="hidden md:flex"
          >
            <LogOut className="size-4" />
          </Button>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.icon && <link.icon className="size-4" />}
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false)
                signOut()
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
