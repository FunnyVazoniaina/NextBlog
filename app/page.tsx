import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PostCard } from "@/components/posts/post-card";
import { postService } from "@/features/posts/service/post-service";
import { siteConfig } from "@/lib/config/site";

const stackItems = [
  "MongoDB Atlas for posts and reactions",
  "Private backoffice for publishing",
  "Server-rendered pages and route handlers",
];

const navigationItems = [
  "Top posts",
  "Latest drops",
  "Writing logs",
  "Engineering notes",
];

export default async function Home() {
  const posts = await postService.getPublishedPosts();
  const hasPosts = posts.length > 0;
  const featuredCount = posts.filter((post) => post.featured).length;

  return (
    <Container className="py-4 sm:py-6">
      <div className="grid gap-4 xl:grid-cols-[15rem_minmax(0,1fr)_20rem]">
        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-4">
            <section className="overflow-hidden rounded-[1.5rem] border border-line bg-white">
              <div className="border-b border-line bg-surface-soft px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  Feed shortcuts
                </p>
              </div>
              <div className="space-y-1 p-3">
                {navigationItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-line bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Feed stats
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-surface-soft p-4">
                  <p className="font-display text-2xl font-semibold text-zinc-950">
                    {posts.length}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">Published posts</p>
                </div>
                <div className="rounded-2xl bg-surface-soft p-4">
                  <p className="font-display text-2xl font-semibold text-zinc-950">
                    {featuredCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">Featured threads</p>
                </div>
              </div>
            </section>
          </div>
        </aside>

        <div className="space-y-4">
          <section className="overflow-hidden rounded-[1.6rem] border border-line bg-white">
            <div className="border-b border-line bg-surface-soft px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Live feed
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                  r/personal-blog
                </span>
              </div>
            </div>

            <div className="space-y-4 px-5 py-5 sm:px-6">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                A Reddit-style feed for your writing, experiments, and build
                notes.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg">
                {siteConfig.description} Every article is presented like a
                thread in a clean feed, with room for reactions and a publishing
                flow that stays lightweight.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
                >
                  Browse the archive
                </Link>
                <Link
                  href="/admin/login"
                  className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-accent hover:text-accent"
                >
                  Open backoffice
                </Link>
              </div>
            </div>
          </section>

          {hasPosts ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <section className="rounded-[1.5rem] border border-dashed border-line-strong bg-white p-8">
              <p className="font-display text-2xl font-semibold text-zinc-950">
                The feed is empty for now.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
                Publish your first post from the backoffice and it will appear
                here like a fresh thread in the main feed.
              </p>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <section className="rounded-[1.5rem] border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              About this blog
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-zinc-950">
              Built like a small community feed
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Posts are designed to feel like readable threads instead of flat
              articles, while still keeping the voice personal and focused.
            </p>
          </section>

          <section className="rounded-[1.5rem] border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Stack
            </p>
            <div className="mt-4 space-y-3">
              {stackItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-line bg-surface-soft px-4 py-3 text-sm text-zinc-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Posting rhythm
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-2xl bg-surface-soft p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Voice
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-900">
                  Practical, personal, and direct
                </p>
              </div>
              <div className="rounded-2xl bg-surface-soft p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Format
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-900">
                  Feed cards, threads, and quick reactions
                </p>
              </div>
              <div className="rounded-2xl bg-surface-soft p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Topics
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-900">
                  Engineering, product, writing, growth
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </Container>
  );
}
