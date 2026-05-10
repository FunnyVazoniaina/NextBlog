import Link from "next/link";

import { CompactPostVoteControls } from "@/components/posts/compact-post-vote-controls";
import { siteConfig } from "@/lib/config/site";
import type { PostCategory, PostSummary } from "@/types/post";

interface BlogArchivePostCardProps {
  post: PostSummary;
}

const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const categoryScenes: Record<PostCategory, string> = {
  engineering:
    "bg-[radial-gradient(circle_at_22%_28%,rgba(255,223,193,0.88),transparent_18%),radial-gradient(circle_at_78%_22%,rgba(70,96,110,0.70),transparent_23%),linear-gradient(135deg,#9fb4bc_0%,#ccd8dc_42%,#ece5d7_100%)]",
  product:
    "bg-[radial-gradient(circle_at_26%_30%,rgba(255,255,255,0.38),transparent_18%),radial-gradient(circle_at_74%_24%,rgba(210,221,216,0.48),transparent_22%),linear-gradient(135deg,#f1ece7_0%,#efe8e1_28%,#ddd3c7_65%,#b6977d_100%)]",
  writing:
    "bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.30),transparent_18%),radial-gradient(circle_at_74%_24%,rgba(73,104,61,0.60),transparent_21%),linear-gradient(135deg,#748f3d_0%,#ced0b8_32%,#efebe4_68%,#bca47e_100%)]",
  career:
    "bg-[radial-gradient(circle_at_26%_22%,rgba(255,255,255,0.34),transparent_18%),radial-gradient(circle_at_76%_24%,rgba(194,128,55,0.62),transparent_21%),linear-gradient(135deg,#eee8e0_0%,#f3ece4_35%,#d1ab79_70%,#9a6337_100%)]",
};

export function BlogArchivePostCard({ post }: BlogArchivePostCardProps) {
  return (
    <article className="flex h-full flex-col gap-4">
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className={`relative aspect-[1.42/1] overflow-hidden rounded-[0.3rem] ${categoryScenes[post.category]}`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_50%,rgba(0,0,0,0.06)_100%)]" />
        </div>
      </Link>

      <div className="space-y-3">
        <div className="text-xs text-zinc-600">
          {siteConfig.author.name} • {shortDateFormatter.format(new Date(post.publishedAt))}
        </div>

        <div className="flex items-start justify-between gap-4">
          <Link href={`/blog/${post.slug}`} className="min-w-0">
            <h2 className="font-display text-[1.9rem] font-semibold leading-tight tracking-tight text-zinc-950">
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

        <p className="text-sm leading-7 text-zinc-600">{post.excerpt}</p>

        <div className="flex items-end justify-between gap-4">
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
