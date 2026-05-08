import Link from "next/link";

import { formatDate, formatReadingTime } from "@/lib/utils/format";
import type { PostSummary } from "@/types/post";

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(41,37,36,0.06)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(41,37,36,0.1)]">
      <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
        <span>{post.category}</span>
        <span>{post.coverLabel}</span>
      </div>

      <div className="mt-6 space-y-4">
        <Link href={`/blog/${post.slug}`} className="block space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-950 transition group-hover:text-amber-700">
            {post.title}
          </h2>
          <p className="text-base leading-7 text-stone-600">{post.excerpt}</p>
        </Link>

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

      <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-stone-500">
        <span>{formatDate(post.publishedAt)}</span>
        <span className="h-1 w-1 rounded-full bg-stone-300" />
        <span>{formatReadingTime(post.readingTimeInMinutes)}</span>
      </div>
    </article>
  );
}
