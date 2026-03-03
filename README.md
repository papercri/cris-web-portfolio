# My Portfolio

My personal portfolio website built with React, Vite, Tailwind CSS, and Motion.

It showcases:

- Hero section with custom cursor and animated intro
- About section
- Skills section
- Projects section with editorial-style layout and anchor navigation
- Contact section focused on direct channels (email and LinkedIn)
- Responsive navigation with dark mode toggle and CV download flow

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- Motion (`motion/react`)
- Lucide icons
- Radix UI primitives (for selected UI components)

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