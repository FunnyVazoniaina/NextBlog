import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PostSourceLinksFieldset } from "@/components/admin/post-source-links-fieldset";
import {
  createPostAction,
  signOutAdminAction,
  toggleFeaturedPostAction,
} from "@/app/admin/actions";
import { requireAdminSession } from "@/features/admin-auth/service/admin-auth-service";
import { postService } from "@/features/posts/service/post-service";

interface NewAdminPostPageProps {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
}

export default async function NewAdminPostPage({
  searchParams,
}: NewAdminPostPageProps) {
  await requireAdminSession();

  const { error, success } = await searchParams;
  const today = new Date().toISOString().slice(0, 10);
  const posts = await postService.getPublishedPosts();

  return (
    <Container className="py-16 sm:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
            Backoffice
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-950">
            Publish a new blog post
          </h1>
          <p className="max-w-2xl text-base leading-7 text-stone-600">
            This form writes directly to MongoDB Atlas using the same post
            model as the public blog.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
          >
            View blog
          </Link>
          <form action={signOutAdminAction}>
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {success ? (
        <p className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          The post &quot;{success}&quot; was created successfully.
        </p>
      ) : null}

      {error ? (
        <p className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <form action={createPostAction} className="mt-8 grid gap-6 lg:grid-cols-2">
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-stone-700">Title</span>
          <input
            type="text"
            name="title"
            className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">
            Custom slug (optional)
          </span>
          <input
            type="text"
            name="slug"
            className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
            placeholder="auto-generated-from-title"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">Category</span>
          <select
            name="category"
            defaultValue="engineering"
            className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
          >
            <option value="engineering">Engineering</option>
            <option value="product">Product</option>
            <option value="writing">Writing</option>
            <option value="career">Career</option>
          </select>
        </label>

        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-stone-700">Excerpt</span>
          <textarea
            name="excerpt"
            rows={3}
            className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
            required
          />
        </label>

        <PostSourceLinksFieldset />

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">
            Tags (comma separated)
          </span>
          <input
            type="text"
            name="tags"
            className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
            placeholder="nextjs, mongodb, writing"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">
            Cover label
          </span>
          <input
            type="text"
            name="coverLabel"
            className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">
            Published date
          </span>
          <input
            type="date"
            name="publishedAt"
            defaultValue={today}
            className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">
            Reading time (minutes)
          </span>
          <input
            type="number"
            name="readingTimeInMinutes"
            min="1"
            defaultValue="5"
            className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">Status</span>
          <select
            name="status"
            defaultValue="published"
            className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-700">
          <input type="checkbox" name="featured" className="h-4 w-4" />
          Mark this post as featured
        </label>

        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-stone-700">
            Content (one paragraph per line)
          </span>
          <textarea
            name="content"
            rows={12}
            className="w-full rounded-[1.5rem] border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
            required
          />
        </label>

        <div className="lg:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Save post to MongoDB Atlas
          </button>
        </div>
      </form>

      <section className="mt-14 space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
            Featured posts
          </p>
          <p className="max-w-2xl text-sm leading-7 text-stone-600">
            Add or remove published posts from the featured list shown on the public blog.
          </p>
        </div>

        <div className="space-y-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.slug}
                className="flex flex-col gap-4 rounded-[1.25rem] border border-black/10 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-stone-950">{post.title}</p>
                  <p className="mt-1 text-sm text-stone-500">
                    {post.featured ? "Currently featured" : "Not featured"}
                  </p>
                </div>

                <form action={toggleFeaturedPostAction}>
                  <input type="hidden" name="slug" value={post.slug} />
                  <input
                    type="hidden"
                    name="featured"
                    value={post.featured ? "false" : "true"}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
                  >
                    {post.featured ? "Remove from featured" : "Add to featured"}
                  </button>
                </form>
              </div>
            ))
          ) : (
            <p className="text-sm text-stone-500">
              Published posts will appear here once you create them.
            </p>
          )}
        </div>
      </section>
    </Container>
  );
}
