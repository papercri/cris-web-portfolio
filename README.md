# My Portfolio

**Live site:** [frontend-ux.website](https://frontend-ux.website/)

My personal portfolio website built with React, Vite, Tailwind CSS, and Motion.

It includes:

- Hero section with custom cursor and animated intro
- About section
- Skills section
- Projects section with editorial-style layout and anchor navigation
- Contact section focused on direct channels (email, LinkedIn, GitHub)
- Responsive navigation with dark mode toggle and CV download flow
- Bilingual support (English/Spanish) 

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- Motion (`motion/react`)
- Lucide icons
- Radix UI primitives (for selected components)

## Internationalization

The site supports `EN` and `ES` with a lightweight context-based i18n setup.

- Automatic browser-language detection on first visit (`es-*` locales default to Spanish; others default to English)
- Persistent language preference via `localStorage`
- Top-right language selector that shows the active locale (`EN`/`ES`)

### `I18nProvider`

Defined in `src/app/i18n.tsx` and wraps the entire app in `src/main.tsx`. It manages the full i18n lifecycle:

- Reads locale from `localStorage` on mount; falls back to browser language detection
- On locale change, persists to `localStorage`, updates `document.documentElement.lang`, and syncs `<title>`, `description`, and Open Graph meta tags
- Exposes `locale`, `setLocale`, and `t` (active translations object) via the `useI18n()` hook

## Accessibility & SEO

The portfolio includes a dedicated accessibility and SEO pass aligned with WCAG-oriented best practices.

- Landmark improvements: skip link + semantic `main` structure for better keyboard/screen reader navigation
- Keyboard usability: visible `focus-visible` states across interactive elements
- Dialog and mobile menu accessibility: ARIA roles/labels and `Esc` key support
- Motion accessibility: reduced-motion handling for animated elements
- SEO enhancements: richer meta tags (`description`, Open Graph, Twitter cards, `robots`, `canonical`)
- Locale-aware metadata updates from i18n (`title`, `description`, `og:locale`)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

## Project Structure

Main app code lives under:

- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/components/*`
- `src/styles/*`

Static assets are in:

- `public/*`

## Notes

- Dark mode is handled by toggling the `dark` class on `document.documentElement`.
- CV files are served from the `public` folder.
