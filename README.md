# Monblog

A personal fullstack blog built with Next.js App Router.

The project ships with a minimal but scalable structure:

- Server-rendered public pages for the homepage, blog index, and article pages
- Route handlers for health checks and blog post retrieval
- A service and repository layer aligned with MongoDB Atlas
- Reusable layout and post components

## Environment

Create a `.env.local` from the example and replace the placeholder Atlas URI when you are ready to connect a real cluster:

```bash
cp .env.example .env.local
```

```env
MONGODB_URI="mongodb+srv://atlas-user:atlas-password@cluster0.example.mongodb.net/monblog?retryWrites=true&w=majority&appName=monblog"
MONGODB_DB_NAME="monblog"
MONGODB_POSTS_COLLECTION="posts"
```

As long as the placeholder URI is still present, the app falls back to the local seed posts so the pages and APIs keep working during setup.

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
  mongodb/
  utils/
types/
```

## Next steps

- Seed the Atlas `posts` collection with real content
- Add authentication and an admin writing interface
- Add SEO enrichments such as sitemap, RSS, and structured metadata
