import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { postService } from "@/features/posts/service/post-service";
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
    <Container className="py-16 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <div className="space-y-6 border-b border-black/10 pb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
            {post.category}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            {post.title}
          </h1>
          <p className="text-xl leading-8 text-stone-600">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-stone-300" />
            <span>{formatReadingTime(post.readingTimeInMinutes)}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 py-10 text-lg leading-8 text-stone-700">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </Container>
  );
}
