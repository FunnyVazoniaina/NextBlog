# Monblog

A personal fullstack blog built with Next.js App Router.

The project ships with a minimal but scalable structure:

- Server-rendered public pages for the homepage, blog index, and article pages
- Route handlers for health checks and blog post retrieval
- A service and repository layer so the content source can move from in-memory data to a database or CMS later
- Reusable layout and post components

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## API routes

- `GET /api/health`
- `GET /api/posts`
- `GET /api/posts/[slug]`

## Project structure

```text
app/
  api/
  blog/
components/
  layout/
  posts/
features/
  posts/
lib/
  config/
  utils/
types/
```

## Next steps

- Replace the in-memory repository with a database or headless CMS
- Add authentication and an admin writing interface
- Add SEO enrichments such as sitemap, RSS, and structured metadata
