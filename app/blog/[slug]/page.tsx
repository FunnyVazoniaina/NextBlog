import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { PostVoteControls } from "@/components/posts/post-vote-controls";
import { postService } from "@/features/posts/service/post-service";
import { siteConfig } from "@/lib/config/site";
import { formatDate, formatReadingTime } from "@/lib/utils/format";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await postService.getPublishedPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await postService.getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await postService.getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-4 sm:py-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="overflow-hidden rounded-[1.6rem] border border-line bg-white shadow-[0_1px_2px_rgba(17,17,17,0.06)]">
          <div className="border-b border-line bg-surface-soft px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span className="rounded-full bg-accent px-3 py-1 font-semibold uppercase tracking-[0.18em] text-white">
                {post.category}
              </span>
              <span>u/{siteConfig.author.name.replace(/\s+/g, "").toLowerCase()}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span>r/personal-blog</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="space-y-5 border-b border-line pb-8">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                {post.title}
              </h1>
              <p className="text-lg leading-8 text-zinc-600">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                <span>{formatReadingTime(post.readingTimeInMinutes)}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span>{post.coverLabel}</span>
                {post.featured ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-zinc-300" />
                    <span className="rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent">
                      Featured thread
                    </span>
                  </>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-surface-soft px-3 py-1 text-xs font-medium text-zinc-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 py-8 text-[1.04rem] leading-8 text-zinc-700">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>

        <aside className="space-y-4">
          <PostVoteControls slug={post.slug} />

          <section className="rounded-[1.5rem] border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Thread details
            </p>
            <div className="mt-4 space-y-3 text-sm text-zinc-700">
              <div className="rounded-2xl bg-surface-soft p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Published
                </p>
                <p className="mt-2 font-medium text-zinc-950">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
              <div className="rounded-2xl bg-surface-soft p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Reading time
                </p>
                <p className="mt-2 font-medium text-zinc-950">
                  {formatReadingTime(post.readingTimeInMinutes)}
                </p>
              </div>
              <div className="rounded-2xl bg-surface-soft p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Author
                </p>
                <p className="mt-2 font-medium text-zinc-950">
                  {siteConfig.author.name}
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </Container>
  );
}
