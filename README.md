# Cristiana Sollini — Developer Portfolio

**Live site:** [frontend-ux.website](https://frontend-ux.website/)

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS v4 and Motion. It features a contact form with a serverless backend, trilingual support (EN / ES / IT), dark mode, and a fully accessible UI.

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Animated intro with custom cursor and scrolling text ticker |
| **About** | Bio, key highlights and CV download flow |
| **Skills** | Categorised skill grid |
| **Projects** | Editorial-style project cards with live demo and code links |
| **Contact** | Social links + contact form with backend email delivery |

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

- **Auto-detection** on first visit: `it-*` → Italian, `es-*` → Spanish, everything else → English
- **Persistent** preference via `localStorage`
- **Live meta sync** on locale change: `document.lang`, `<title>`, `description`, `og:title`, `og:description`, `og:locale`
- Language selector in the navbar (desktop dropdown + mobile buttons)

---

## Accessibility & SEO

- Skip-to-content link and semantic landmark structure
- Visible `focus-visible` states on all interactive elements (`focus-ring` / `focus-ring-inv` utilities)
- ARIA roles, labels, `aria-live` regions and `aria-busy` states throughout
- Escape key and overlay-click support on all modals
- Reduced-motion support for animated elements
- Per-locale `<title>`, `<meta description>` and full Open Graph tags

---

