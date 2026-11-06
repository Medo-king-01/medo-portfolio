# MEDO Portfolio

Personal bilingual portfolio (**English LTR / Arabic RTL**) for **Mohamed Elsayed Abu Jumaa (MEDO)** — Management Information Systems (MIS) major and AI-Assisted Digital Product Builder.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** with shared motion tokens, viewport-aware profiles, and reduced-motion support
- **Context-based i18n** (`en` / `ar` with automatic `ltr` / `rtl` direction switching)

## Project Structure

- `src/config/site.config.js` — Brand metadata, SEO configuration, and dynamic section ordering/toggling
- `src/context/LanguageContext.jsx` — Bilingual language context (`en` / `ar`) and `localStorage` persistence
- `src/data/portfolioData.js` — Structured portfolio data (projects, journey items, skills, personal info)
- `src/data/translations.js` — Complete English and Arabic UI translations
- `src/components/` — Modular section components orchestrated by `src/App.jsx`

## Getting Started

```bash
npm install
npm run dev
```

## Build & Lint

```bash
npm run lint
npm run build
```

## Browser tests

```bash
npx playwright install chromium  # once per machine (and install OS dependencies if prompted)
npm run test:e2e
```

The tests build and serve the production site locally, then exercise desktop and mobile Chromium, both languages, the galleries and certificate PDFs, layout, form validation, and blocked browser storage. Google Fonts are blocked in these tests to avoid depending on an external network; the site uses fallback fonts.
