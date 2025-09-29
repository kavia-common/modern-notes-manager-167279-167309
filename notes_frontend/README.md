# Modern Notes – Ocean Professional

A Next.js frontend for creating, viewing, editing, and deleting notes with a modern UI.

## Features
- Sidebar for navigating notes with search
- Top bar with quick actions
- Main editor with title and content, debounced autosave
- Create, update, and delete notes via REST API
- Ocean Professional styling (blue primary, amber accents, minimal, smooth transitions)

## Requirements
- Node.js 18+
- A backend exposing REST endpoints:
  - GET    /notes
  - POST   /notes      { title, content }
  - GET    /notes/:id
  - PUT    /notes/:id  { title?, content? }
  - DELETE /notes/:id

## Setup
1. Copy env example and set API base URL:
```bash
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_BASE_URL to your backend (or leave blank to use same-origin /api)
```

2. Install and run:
```bash
npm install
npm run dev
```

Open http://localhost:3000 to use the app.

## Notes
- If NEXT_PUBLIC_API_BASE_URL is not set, the app will call same-origin `/api`, which allows proxy setups.
- Tailwind CSS v4 is used via the `@tailwindcss/postcss` plugin already configured in postcss.config.mjs.
