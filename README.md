# Bali Trans

A vehicle rental web application for exploring Bali — covering the marketing site, authentication flows, a customer dashboard, and an admin panel. Built as a Vite + React 19 single-page application with Tailwind CSS v4.

## Tech Stack

- **React 19** with `react-router-dom` v7 for routing
- **Vite 8** as the build tool and dev server
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Axios** for the shared HTTP client (`src/services/api.js`)
- **lucide-react** for icons
- **react-helmet-async** for per-page document metadata
- **Microsoft Clarity** (optional, via `useClarity` hook) for analytics

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm

### Install & Run

```bash
npm install
npm run dev
```

The dev server prints a local URL (usually `http://localhost:5173`).

### Available Scripts

- `npm run dev` — start the Vite development server with HMR.
- `npm run build` — create a production build in `dist/`.
- `npm run preview` — serve the production build locally after building.
- `npm run lint` — run ESLint over the project.

> There is no test runner configured yet.

## Environment Variables

Create a `.env` (or `.env.local`) at the project root:

| Variable                   | Purpose                                                |
| -------------------------- | ------------------------------------------------------ |
| `VITE_API_URL`             | Base URL used by the shared Axios instance.            |
| `VITE_CLARITY_PROJECT_ID`  | Enables Microsoft Clarity when set (optional).         |

The Axios client automatically attaches a `Bearer` token from `localStorage.getItem('token')` when present.

## Project Structure

```
src/
├── App.jsx              # Route definitions and global header logic
├── main.jsx             # App entry: StrictMode, HelmetProvider, BrowserRouter
├── index.css            # Tailwind import + global CSS variables
├── assets/              # Imported module assets (images, svgs)
├── components/          # Shared UI: Header, Footer, Dashboard shell, ui/, layout/
├── hooks/               # Custom hooks (e.g. useClarity, useFullScreenRoot)
├── pages/
│   ├── home.jsx         # Landing page
│   ├── vehicles.jsx     # Vehicle catalog
│   ├── destinations.jsx
│   ├── services.jsx
│   ├── reviews.jsx
│   ├── about.jsx
│   ├── contact.jsx
│   ├── auth/            # sign-in, sign-up, otp, terms, privacy-policy
│   ├── dashboard/       # Customer dashboard (vehicles, bookings, favourites, chat, license, support)
│   └── admin/           # Admin panel
├── services/
│   └── api.js           # Shared Axios instance
└── utils/
```

Static assets referenced by absolute paths (e.g. `/images/mercy.png`, `/icons.svg`) live in `public/`.

## Routing

Routes are centralized in <ref_file file="C:\Users\YOGA\Documents\S4\Manajemen Proyek Sistem Informasi\bali-trans\src\App.jsx" />. The global `<Header />` is rendered once at the layout level so the active-link underline can animate across route changes. Routes listed in `FULLSCREEN_ROUTES` (the dashboard shell) and any path under `/admin` suppress the global header so those screens can ship their own chrome.

Main route groups:

- Public: `/`, `/vehicles`, `/destinations`, `/services`, `/reviews`, `/about`, `/contact`
- Auth: `/sign-in`, `/sign-up`, `/otp`, `/terms`, `/privacy-policy`
- Dashboard: `/dashboard`, `/dashboard/vehicles`, `/dashboard/bookings`, `/dashboard/favourites`, `/dashboard/chat`, `/dashboard/license`, `/dashboard/support`

## Path Aliases

`vite.config.js` maps `@` to `./src`. Prefer `@/...` imports for app-local modules:

```jsx
import { Header } from "@/components/Header";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";
```

## Styling

- Tailwind CSS v4 is enabled through `@tailwindcss/vite` and imported from `src/index.css` with `@import "tailwindcss";`.
- Global CSS variables, base typography, and responsive root sizing live in `src/index.css`.
- The UI uses a monochrome design system (thin 1px borders, small 4–8px radii). Palette tokens are centralized near the top of each page file (e.g. `INK`, `TEXT`, `MUTED`, `BORDER`, `SOFT`).

## Linting

ESLint is configured with the flat config in `eslint.config.js` for `**/*.{js,jsx}`. It extends recommended JavaScript rules, React Hooks rules, and Vite React Refresh rules; `dist/` is ignored.

## Build & Deploy

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

Deploy the contents of `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, etc.). Make sure the host is configured for SPA fallback (serve `index.html` for unknown routes) so client-side routing works.
