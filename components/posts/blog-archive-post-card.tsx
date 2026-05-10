import Link from "next/link";

import { CompactPostVoteControls } from "@/components/posts/compact-post-vote-controls";
import { PostCoverImage } from "@/components/posts/post-cover-image";
import { PostSourceLinks } from "@/components/posts/post-source-links";
import { siteConfig } from "@/lib/config/site";
import type { PostSummary } from "@/types/post";

interface BlogArchivePostCardProps {
  post: PostSummary;
}

const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function BlogArchivePostCard({ post }: BlogArchivePostCardProps) {
  return (
    <article className="flex h-full flex-col gap-4">
      <Link href={`/blog/${post.slug}`} className="block">
        <PostCoverImage
          title={post.title}
          category={post.category}
          src={post.coverImageUrl}
          sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 35vw, 100vw"
          className="aspect-[1.42/1] rounded-[0.3rem]"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3">
        <div className="text-xs text-zinc-600">
          {siteConfig.author.name} • {shortDateFormatter.format(new Date(post.publishedAt))}
        </div>

        <div className="flex items-start justify-between gap-4">
          <Link href={`/blog/${post.slug}`} className="min-w-0">
            <h2 className="overflow-hidden font-display text-[1.9rem] font-semibold leading-tight tracking-tight text-zinc-950 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {post.title}
            </h2>
          </Link>
          <Link
            href={`/blog/${post.slug}`}
            className="pt-1 text-lg text-zinc-900 transition hover:text-accent"
          >
            ↗
          </Link>
        </div>

        <p className="overflow-hidden text-sm leading-7 text-zinc-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {post.excerpt}
        </p>

        <PostSourceLinks links={post.sourceLinks} limit={2} />

        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-300 px-2.5 py-1 text-[11px] font-medium text-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <CompactPostVoteControls slug={post.slug} />
        </div>
      </div>
    </article>
  );
}
