# BrightSweep Landing

Ultra-fast Next.js landing page for a boutique cleaning service, designed with optimized SVG imagery and light, responsive styling.

## Getting Started

```bash
npm install
npm run backend   # optional: start the mock Node.js API on http://localhost:4001
npm run dev
```

Visit `http://localhost:3000` to preview the landing page.

## Available Scripts

- `npm run dev` – start a local development server
- `npm run build` – create an optimized production build
- `npm run start` – run the production server locally
- `npm run lint` – check linting status using Next.js defaults
- `npm run backend` – launch the standalone Node.js mock API that stores form submissions in memory

## Performance Notes

- Lightweight, SVG-based hero art to keep LCP under control
- Hand-tuned CSS for minimal, cache-friendly styling across responsive breakpoints
- API route `/api/contact` mocks a zero-latency form submission
- Prefers system fonts to skip extra network requests
- Optional Node.js backend (`npm run backend`) captures submissions and exposes them at `GET /api/contact`
