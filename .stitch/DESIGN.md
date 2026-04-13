# IncluIA — Design System

## Brand Identity
**IncluIA** es un SaaS de educacion inclusiva con IA para docentes argentinos. La marca transmite confianza institucional (azul profundo) combinada con esperanza y accion (verde inclusivo). El tono visual es profesional pero calido, accesible y moderno.

**Logo:** Texto "IncluIA" donde "Inclu" usa el color primary y "IA" usa el color accent.
**Voz:** Espanol rioplatense argentino. Tuteo con "vos". Tono empatico, profesional, cercano.

---

## Color Palette

| Token | Hex | Role |
|---|---|---|
| `primary` | `#1e3a5f` | Azul profundo educativo — headings, navbar, CTA secundarios |
| `primary-light` | `#2a5a8f` | Hover sobre primary |
| `primary-bg` | `#e8f0fe` | Fondo sutil azul — active nav items, badges |
| `primary-50` | `#f0f5ff` | Fondo muted azul ultra-claro |
| `accent` | `#16a34a` | Verde inclusivo — CTA principales, badges Pro, exito |
| `accent-light` | `#dcfce7` | Fondo verde sutil |
| `accent-dark` | `#0d9448` | Hover sobre accent |
| `orange` | `#ea580c` | Alertas, plan limits, upgrade nudges |
| `orange-light` | `#fff7ed` | Fondo naranja sutil |
| `background` | `#f5f7fa` | Fondo general de la app |
| `foreground` | `#1a2332` | Texto principal |
| `card` | `#ffffff` | Fondo de cards |
| `border` | `#e2e8f0` | Bordes generales |
| `muted` | `#64748b` | Texto secundario/muted |
| `destructive` | `#dc2626` | Errores, acciones destructivas |

### Gradientes
- **Hero/Auth panel:** `linear-gradient(135deg, #1e3a5f 0%, #1a3355 40%, #0f2440 100%)`
- **CTA accent card:** `from-accent-light/40 via-accent-light/20 to-transparent`
- **Upgrade nudge:** `from-orange-light/50 to-transparent`

### Efectos decorativos
- **Dot pattern:** `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)` size 40px
- **Blurs:** Circulos `bg-emerald-500/10 blur-[100px]` y `bg-blue-400/10 blur-[100px]`

---

## Typography

| Role | Font | Weights | Usage |
|---|---|---|---|
| Display/Headings | **Outfit** | 700 (bold), 800 (extrabold) | Titulos, logo, hero text |
| Body | **DM Sans** | 400, 500, 600, 700 | Texto general, labels, botones |

### Scale
- Hero: `text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08]`
- Page title: `text-2xl sm:text-3xl font-bold`
- Section title: `text-lg font-bold`
- Card title: `text-base font-semibold`
- Body: `text-sm` (14px)
- Caption/label: `text-xs font-medium uppercase tracking-widest`
- Badge: `text-xs font-semibold`

---

## Spacing & Layout

- **Max width dashboard:** `max-w-5xl` (1024px) centrado
- **Page padding:** `px-5` mobile, `px-8` desktop
- **Card padding:** `py-5 px-5` o `py-8` para CTAs
- **Section gap:** `space-y-6`
- **Navbar height:** `h-16` (64px)

---

## Border Radius

| Component | Radius |
|---|---|
| Buttons | `rounded-xl` (12px) |
| Inputs | `rounded-xl` (12px) |
| Cards | `rounded-2xl` (16px) |
| Badges | `rounded-full` |
| Navbar items | `rounded-lg` (8px) |
| Progress bars | `rounded-full` |

---

## Components

### Buttons
```
Primary (accent):  bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl h-11 shadow-md shadow-accent/20 hover:-translate-y-0.5
Primary (primary): bg-primary hover:bg-primary-light text-white font-semibold rounded-xl h-11 shadow-md shadow-primary/15 hover:-translate-y-0.5
Outline:           border border-border text-foreground rounded-lg hover:bg-muted
Ghost:             text-muted hover:text-foreground hover:bg-muted rounded-lg
```

### Inputs
```
Standard: w-full h-11 rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-sm
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all
Select:   Same + custom chevron SVG background-image
Textarea: Same base, h-auto, py-3
```

### Cards
```
Standard:     border-border/60 bg-card rounded-2xl
CTA accent:   border-accent/20 bg-gradient-to-br from-accent-light/40
Upgrade:      border-orange/15 bg-gradient-to-r from-orange-light/50
```

### Navbar
```
Sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-xl
Logo left, nav center (desktop), actions right
Mobile: hamburger -> slide-down menu with rounded-xl items
Active item: bg-primary-bg text-primary
```

### Badges
```
Plan Free: bg-muted/20 text-muted rounded-full px-3 py-1 text-xs font-semibold
Plan Pro:  bg-accent-light text-accent-dark rounded-full px-3 py-1 text-xs font-semibold
```

---

## Page Patterns

### Auth Pages (Login, Registro, Verificar email)
- Split layout: panel izquierdo 45% con gradient primary + branding, panel derecho con form
- Panel izquierdo: hidden en mobile, visible lg+
- Mobile: logo centered arriba del form
- Form max-w-[420px], animacion fadeUp

### Dashboard Pages
- Navbar sticky arriba
- Content max-w-5xl mx-auto px-5 py-6
- Cards apiladas con space-y-6
- Loading states con Skeleton components

### Landing Page
- Hero full-width con gradient primary, dot-pattern, blurs decorativos
- Secciones alternas fondo blanco / gris claro
- CTAs emerald prominentes con sombra

---

## Animations
```css
@keyframes fadeUp   { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
@keyframes scaleIn  { from { opacity:0; transform:scale(0.92) } to { opacity:1; transform:scale(1) } }
@keyframes float    { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
```
- `animate-fade-up`: Forms, cards al entrar
- `hover:-translate-y-0.5`: Botones CTA
- Respetar `prefers-reduced-motion: reduce`

---

## Accessibility (WCAG AA)
- Skip-to-content link
- Todos los inputs con `<label>` asociado
- Contraste minimo 4.5:1 para texto, 3:1 para componentes grandes
- Focus visible con `focus:ring-2`
- `aria-label` en botones icon-only
- Print styles para guias generadas
- `prefers-reduced-motion` respetado

---

## Screens Inventory

| # | Screen | File | Status |
|---|---|---|---|
| 01 | Landing publica | `designs/01-landing.html` | Done |
| 02 | Login | `designs/02-login.html` | Done |
| 03 | Registro | `designs/03-registro.html` | Done |
| 04 | Verificar email | `designs/04-verificar-email.html` | Done |
| 05 | Dashboard inicio | `designs/05-dashboard-inicio.html` | Done |
| 06 | Nueva consulta (3 pasos) | `designs/06-nueva-consulta.html` | Done |
| 07 | Resultado guia IA | `designs/07-resultado.html` | Done |
| 08 | Historial | `designs/08-historial.html` | Done |
| 09 | Perfil | `designs/09-perfil.html` | Done |
| 10 | Planes / Pricing | `designs/10-planes.html` | Done |
| 11 | Exito de pago | `designs/11-exito-pago.html` | Done |
