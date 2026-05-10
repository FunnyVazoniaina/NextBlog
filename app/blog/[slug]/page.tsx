import type { Metadata } from "next";
import Link from "next/link";
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
    <section className="bg-white">
      <Container className="py-10 sm:py-12 lg:py-14">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="min-w-0">
            <div className="border-b border-line pb-8">
              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                <span className="font-medium text-zinc-800">{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span>{siteConfig.author.name}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
                {post.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                <span>{formatReadingTime(post.readingTimeInMinutes)}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span>{post.coverLabel}</span>
                {post.featured ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-zinc-300" />
                    <span className="font-medium text-accent">Featured</span>
                  </>
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-500">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </div>

            <div className="space-y-6 py-10 text-[1.04rem] leading-8 text-zinc-700">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="space-y-8 xl:border-l xl:border-line xl:pl-8">
            <PostVoteControls slug={post.slug} />

            <section className="space-y-4 text-sm text-zinc-600">
              <p className="text-sm font-medium text-zinc-700">
                Post details
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    Published
                  </p>
                  <p className="mt-1 text-zinc-900">{formatDate(post.publishedAt)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    Reading time
                  </p>
                  <p className="mt-1 text-zinc-900">
                    {formatReadingTime(post.readingTimeInMinutes)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    Explore
                  </p>
                  <Link href="/blog" className="mt-1 inline-block text-zinc-900 hover:text-accent">
                    Back to all posts
                  </Link>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </Container>
    </section>
  );
}
