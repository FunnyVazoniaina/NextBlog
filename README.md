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
MONGODB_POST_VOTES_COLLECTION="post_votes"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="change-me"
ADMIN_SESSION_SECRET="change-this-secret"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_UPLOAD_FOLDER="monblog/posts"
```

As long as the placeholder URI is still present, the app does not load any posts and the health route reports the database as unconfigured.
If you want image uploads from the backoffice, replace the Cloudinary placeholder values in `.env.local` before using the new cover image field.

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
- `GET /api/posts/[slug]/vote`
- `POST /api/posts/[slug]/vote`

## Backoffice

- `GET /admin/login`
- `GET /admin/posts/new`

The admin area uses a signed cookie session backed only by environment variables, which keeps the setup light while staying private.

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
- Add post editing and deletion in the backoffice
- Add vote analytics or moderation rules if needed
- Add SEO enrichments such as sitemap, RSS, and structured metadata
