# Ned Toukhi — Vite + React

This app now uses Vite for development and build, with React Router, SCSS, and a WebGL orb (OGL). A Cloudflare Worker in `backend/` serves as a simple API/health endpoint.

## Requirements
- Node 18+ recommended

## Frontend

### Install
```bash
npm install
```

### Develop
```bash
npm run dev
```
- Opens on http://localhost:5173 by default.
- Entry HTML is at `index.html` (root). The app script is `/src/index.js`.
- Static assets are served from `public/` and referenced with absolute paths (e.g. `/favicon.ico`, `/fonts/...`).

### Build
```bash
npm run build
```
- Outputs to `dist/`.

### Preview build
```bash
npm run preview
```

### Test (Vitest)
```bash
npm test
```
- Uses jsdom and the existing Testing Library setup in `src/setupTests.js`.

## Backend (Cloudflare Worker)

The Worker in `backend/` returns a JSON status message and has its own test setup (Vitest workers pool).

```bash
cd backend
npm install
npm run dev   # runs wrangler dev
```

You can deploy it with:
```bash
cd backend
npm run deploy
```

## Notes
- The header and landing hero are orchestrated via staged scroll in `src/components/scroll-stage/ScrollStageController.jsx`.
- The animated orb runs via OGL in `src/components/orb/orb.jsx`.
- If you need to call the Worker from the frontend locally without CORS, we can add a Vite `server.proxy` rule in `vite.config.js`.
