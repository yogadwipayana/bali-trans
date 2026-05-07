# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite development server.
- `npm run build` — create a production build in `dist/`.
- `npm run lint` — run ESLint over the project.
- `npm run preview` — serve the production build locally after building.

There is currently no test script or test runner configured in `package.json`, so there is no repository-standard command for running all tests or a single test yet.

## Project Overview

This is a Vite + React single-page application using ES modules. React 19 is rendered from `src/main.jsx`, which wraps the app in `StrictMode`, `HelmetProvider`, and `BrowserRouter` before mounting `App`.

Routing is centralized in `src/App.jsx` with `react-router`; currently it defines only the `/` route and renders `src/pages/home.jsx`. Add new pages under `src/pages/` and wire them through `Routes` in `App.jsx`.

The home page is still based on the Vite starter structure. It imports assets through the `@` alias and sets document metadata with `react-helmet-async`.

## Styling and Assets

- Tailwind CSS v4 is enabled through `@tailwindcss/vite` in `vite.config.js` and imported from `src/index.css` with `@import "tailwindcss";`.
- Global CSS variables, base typography, responsive layout rules, and root sizing live in `src/index.css`.
- Component/page-specific starter styles currently live in `src/App.css`, imported by `src/pages/home.jsx`.
- Static assets are split between `src/assets/` for imported module assets and `public/` for files referenced by absolute public paths such as `/icons.svg`.

## Path Aliases

`vite.config.js` maps `@` to `./src`. Prefer `@/...` imports for app-local modules and assets when it keeps imports clearer.

## API and Environment Variables

`src/services/api.js` exports a shared Axios instance:

- `baseURL` comes from `import.meta.env.VITE_API_URL`.
- A `Bearer` token is added from `localStorage.getItem('token')` when present.
- JSON content type and a 10-second timeout are configured globally.

`src/hooks/useClarity.js` loads Microsoft Clarity when `VITE_CLARITY_PROJECT_ID` is set. The hook is imported but currently commented out in `src/App.jsx`.

## Linting Configuration

ESLint is configured with the flat config in `eslint.config.js` for `**/*.{js,jsx}`. It extends recommended JavaScript rules, React Hooks rules, and Vite React Refresh rules, ignores `dist`, and treats browser globals as available.