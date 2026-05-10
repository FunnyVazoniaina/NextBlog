import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BlogArchivePostCard } from "@/components/posts/blog-archive-post-card";
import { postService } from "@/features/posts/service/post-service";
import { formatDate } from "@/lib/utils/format";
import type { PostSummary } from "@/types/post";

export const metadata = {
  title: "Blog",
  description: "All articles published on the personal blog.",
};

interface BlogPageProps {
  searchParams: Promise<{
    view?: string;
  }>;
}

function renderPostGrid(posts: PostSummary[], emptyMessage: string) {
  if (posts.length === 0) {
    return (
      <div className="rounded-[0.9rem] bg-[#fafaf8] px-6 py-10 text-sm leading-7 text-zinc-600">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-10 lg:grid-cols-2 2xl:grid-cols-3">
      {posts.map((post) => (
        <BlogArchivePostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { view } = await searchParams;
  const posts = await postService.getPublishedPosts();
  const featuredPosts = await postService.getFeaturedPosts();
  const mobileView = view === "featured" ? "featured" : "all";
  const mobilePosts = mobileView === "featured" ? featuredPosts : posts;

  return (
    <section className="bg-white">
      <Container className="py-10 sm:py-12 lg:py-14">
        <div className="space-y-8 xl:hidden">
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-950">
              All blog posts
            </h1>

            <div className="flex items-center gap-1 rounded-full bg-zinc-100 p-1">
              <Link
                href="/blog"
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  mobileView === "all"
                    ? "bg-white text-zinc-950 shadow-[0_1px_3px_rgba(17,17,17,0.08)]"
                    : "text-zinc-600"
                }`}
              >
                All
              </Link>
              <Link
                href="/blog?view=featured"
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  mobileView === "featured"
                    ? "bg-white text-zinc-950 shadow-[0_1px_3px_rgba(17,17,17,0.08)]"
                    : "text-zinc-600"
                }`}
              >
                Featured
              </Link>
            </div>
          </div>

          {renderPostGrid(
            mobilePosts,
            mobileView === "featured"
              ? "No featured posts have been selected yet."
              : "No posts have been published yet.",
          )}
        </div>

        <div className="hidden gap-10 xl:grid xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-950">
              All blog posts
            </h1>

            {renderPostGrid(posts, "No posts have been published yet.")}
          </div>

          <aside className="space-y-5 border-l border-line pl-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Featured posts
              </p>
            </div>

            {featuredPosts.length > 0 ? (
              <div className="space-y-5">
                {featuredPosts.map((post) => (
                  <article key={post.slug} className="space-y-2">
                    <p className="text-xs text-zinc-500">
                      {formatDate(post.publishedAt)}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block font-display text-xl font-semibold leading-tight text-zinc-950 transition hover:text-accent"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm leading-7 text-zinc-600">
                      {post.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-7 text-zinc-600">
                Featured posts will appear here once you mark them from the
                admin area.
              </p>
            )}
          </aside>
        </div>
      </Container>
    </section>
  );
}
