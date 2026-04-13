# CLAUDE.md — IncluIA

## Proyecto
IncluIA — SaaS de educación inclusiva con IA para docentes argentinos.

## Stack
- Next.js 16.2 (App Router) + TypeScript strict
- Tailwind CSS v4 + shadcn/ui v4 (base-nova, Base UI)
- Supabase (PostgreSQL + Auth + RLS)
- Anthropic Claude API (streaming)
- Mercado Pago (Checkout Pro Argentina)
- Deploy target: Vercel

## Patrones clave
- shadcn base-nova NO tiene `asChild` — usar `buttonVariants()` + `cn()` para Links con estilo botón
- Select `onValueChange` recibe `(value: string | null)` — siempre guardar con `v && updateForm()`
- Server Actions con `useActionState` de React 19 para forms (login, registro, perfil)
- Supabase SSR con `@supabase/ssr` (client/server/admin)
- Streaming de Claude via `ReadableStream` en API route
- Formulario de 3 pasos con estado en `FormWrapper` + `sessionStorage` para pasar a resultado

## Estructura
```
app/(auth)/       → login, registro, verificar-email
app/(dashboard)/  → inicio, nueva-consulta, resultado, historial, perfil, planes
app/api/          → generar-guia, guardar-consulta, feedback, check-plan, mercadopago/*
app/landing/      → Landing pública
app/exito-pago/   → Post-pago exitoso
components/       → forms/, resultado/, historial/, landing/, layout/, shared/, ui/
lib/              → types, prompts, anthropic, mercadopago, plan-limits, supabase/*
data/             → niveles, materias, discapacidades
hooks/            → useAuth, usePerfil, usePlan
```

## Datos maestros
Los archivos en `data/` y `lib/types.ts` contienen datos del sistema educativo argentino (Ley 26.206). NO inventar — copiar textualmente de `docs/DATOS-MAESTROS.md`.

## Reglas
- NO usar `any` en TypeScript
- NO exponer API keys en el cliente
- Accesibilidad WCAG AA obligatoria
- Mobile-first siempre
- Español rioplatense argentino en toda la UI
- Streaming obligatorio para respuesta de Claude

## Comandos
```bash
npm run dev    # desarrollo
npm run build  # producción
npm run lint   # linting
```

## Variables de entorno
Ver `.env.local.example`
