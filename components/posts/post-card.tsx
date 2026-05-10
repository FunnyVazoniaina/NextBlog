import Link from "next/link";

import { siteConfig } from "@/lib/config/site";
import { formatDate, formatReadingTime } from "@/lib/utils/format";
import type { PostSummary } from "@/types/post";

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  const scoreLabel = post.featured ? "Hot" : "Fresh";

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[0_1px_2px_rgba(17,17,17,0.06)] transition hover:border-accent hover:shadow-[0_12px_40px_rgba(17,17,17,0.08)]">
      <div className="grid grid-cols-[4.5rem_minmax(0,1fr)]">
        <div className="flex flex-col items-center gap-3 border-r border-line bg-zinc-50 px-2 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-sm font-bold text-accent">
            {post.category.slice(0, 1).toUpperCase()}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
            {scoreLabel}
          </span>
          <span className="text-center text-[11px] font-medium text-zinc-500">
            {post.readingTimeInMinutes}m
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 font-semibold text-accent">
              {post.category}
            </span>
            <span>u/{siteConfig.author.name.replace(/\s+/g, "").toLowerCase()}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span>{formatDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span>{post.coverLabel}</span>
          </div>

          <Link href={`/blog/${post.slug}`} className="mt-4 block space-y-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-950 transition group-hover:text-accent sm:text-[1.85rem]">
              {post.title}
            </h2>
            <p className="text-[15px] leading-7 text-zinc-600">{post.excerpt}</p>
          </Link>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-surface-soft px-3 py-1 text-xs font-medium text-zinc-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
              Open thread
            </span>
            <span>{formatReadingTime(post.readingTimeInMinutes)}</span>
            {post.featured ? (
              <span className="rounded-full bg-accent px-3 py-1 font-semibold text-white">
                Featured
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
