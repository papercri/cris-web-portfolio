# Cristiana Sollini — Developer Website

**Live site:** [frontend-ux.website](https://frontend-ux.website/)

Personal website built with React, TypeScript, Vite, Tailwind CSS v4 and Motion. It features a contact form with a serverless backend, trilingual support (EN / ES / IT), dark mode, and a fully accessible UI.

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Animated intro with custom cursor and scrolling text ticker |
| **About** | Bio, key highlights and CV download flow |
| **Skills** | Categorised skill grid |
| **Projects** | Editorial-style project cards with live demo and code links |
| **Contact** | Social links + contact form with email delivery via Vercel Serverless Function |

---

## Tech Stack

### Frontend
| | |
|---|---|
| **React 18 + TypeScript** | Component architecture |
| **Vite** | Dev server and production bundler |
| **Tailwind CSS v4** | Utility-first styling with `source(none)` + explicit `@source` entries |
| **motion/react** | Page and scroll animations (`AnimatePresence`, `motion.*`) |
| **Lucide React** | Icon set |
| **Radix UI** | Accessible primitives (dropdown, dialog, accordion, …) |

### Backend / API
| | |
|---|---|
| **Vercel Serverless Functions** | `api/send-email.ts` — handles contact form submissions |
| **Nodemailer** | SMTP email delivery |

---

## Contact Form

The form at `/api/send-email.ts` is a Vercel serverless function with the following features:

- **Field validation** — name (required), email (valid format), message (required); all enforced on the server
- **Input sanitisation** — strips HTML tags, dangerous characters and encodes output before embedding in the email body
- **Rate limiting** — max 2 requests per IP every 60 seconds (in-memory Map, reset on cold start)
- **Honeypot field** — hidden `website` field rejects bot submissions silently
- **Field length limits** — name ≤ 100 chars, email ≤ 200 chars, message ≤ 2 000 chars
- **Generic error responses** — no stack traces or internal details exposed to the client
- **Client-side cooldown** — 60-second UI lockout after a successful send
- **Success modal** — `DarkModal` confirmation dialog with ARIA focus management

---

## Reusable UI Components

### `AnimatedButton`
`src/app/components/ui/AnimatedButton.tsx`

Animated button with a sliding fill that rises from the bottom on hover (cubic-bezier ease, 500 ms) and inverts the text colour. Used for the CV download button in About and the submit button in the contact form.

Props: `variant: 'dark' | 'light'`, `type`, `disabled`, `aria-label`, `aria-busy`, `onClick`, `className`, `children`

### `DarkModal`
`src/app/components/ui/DarkModal.tsx`

Reusable dark overlay modal (`bg-[#111]`, border `white/10`, backdrop blur). Handles Escape key, overlay-click close, AnimatePresence transitions and ARIA focus trap. Used by the contact form success state, the navbar CV dialog and the About CV dialog.

Props: `open`, `onClose`, `titleId`, `icon`, `iconBorderClass`, `title`, `description?`, `closeLabel`, `children`

---

## Internationalization

Three locales: `EN`, `ES`, `IT`.

### Architecture

The i18n system is entirely custom — no third-party library. It is built around a React context (`I18nContext`) defined in `src/app/i18n.tsx` and consumed via the `useI18n()` hook.

All copy lives in a single `translations` object typed as a nested literal, so every translation key is fully type-checked at compile time. Adding a missing key in any locale causes a TypeScript error.

```
translations
  ├── en  { nav, hero, about, skills, projects, contact, footer, seo }
  ├── es  { ... }
  └── it  { ... }
```

### Locale detection and persistence

1. On mount, the provider reads `sessionStorage` for a previously saved preference (`portfolio-locale`).
2. If nothing is stored, it falls back to `navigator.languages[0]` — `it-*` → Italian, `es-*` → Spanish, everything else → English.
3. Any time the user changes locale via the navbar, `sessionStorage` is updated immediately so the preference survives page refreshes within the same browser session but is cleared when the tab is closed.
4. An identical detection snippet runs as an inline `<script>` in `index.html` **before React hydrates**, so the `<html lang="">` attribute is set on the very first paint with no flicker.

### Live meta sync

Every locale change triggers a `useEffect` that updates the DOM without a page reload:

- `document.documentElement.lang`
- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`, `og:description`, `og:locale`

Meta tags are created if missing and updated if already present, so the function is safe to call repeatedly.

### Locale selector

- **Desktop** — `DropdownMenu` (Radix UI) in the navbar showing `EN / ES / IT`
- **Mobile** — three plain buttons rendered inside the full-screen menu overlay

---

## Accessibility & SEO

- Skip-to-content link and semantic landmark structure
- Visible `focus-visible` states on all interactive elements (`focus-ring` / `focus-ring-inv` utilities)
- ARIA roles, labels, `aria-live` regions and `aria-busy` states throughout
- Escape key and overlay-click support on all modals
- Reduced-motion support for animated elements
- Per-locale `<title>`, `<meta description>` and full Open Graph tags

---

