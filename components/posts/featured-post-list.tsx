import Link from "next/link";

import { PostSourceLinks } from "@/components/posts/post-source-links";
import { formatDate } from "@/lib/utils/format";
import type { PostCategory, PostSummary } from "@/types/post";

interface FeaturedPostListProps {
  posts: PostSummary[];
  emptyMessage: string;
}

const thumbnailScenes: Record<PostCategory, string> = {
  engineering:
    "bg-[radial-gradient(circle_at_24%_24%,rgba(255,229,208,0.85),transparent_18%),radial-gradient(circle_at_76%_26%,rgba(79,62,41,0.55),transparent_24%),linear-gradient(135deg,#b08c62_0%,#74624d_32%,#d7c8a8_68%,#8f7356_100%)]",
  product:
    "bg-[radial-gradient(circle_at_26%_22%,rgba(255,255,255,0.24),transparent_18%),radial-gradient(circle_at_72%_26%,rgba(31,31,31,0.48),transparent_22%),linear-gradient(135deg,#181818_0%,#303030_40%,#111111_70%,#535353_100%)]",
  writing:
    "bg-[radial-gradient(circle_at_26%_24%,rgba(255,255,255,0.35),transparent_18%),radial-gradient(circle_at_78%_26%,rgba(96,138,168,0.58),transparent_22%),linear-gradient(135deg,#79b2df_0%,#97c3eb_36%,#cfe6f9_70%,#5d89aa_100%)]",
  career:
    "bg-[radial-gradient(circle_at_26%_22%,rgba(255,241,221,0.8),transparent_18%),radial-gradient(circle_at_72%_24%,rgba(145,89,48,0.48),transparent_22%),linear-gradient(135deg,#a86a39_0%,#d6a56a_36%,#f0dcc0_72%,#8c562d_100%)]",
};

export function FeaturedPostList({
  posts,
  emptyMessage,
}: FeaturedPostListProps) {
  if (posts.length === 0) {
    return <p className="text-sm leading-7 text-zinc-600">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-5">
      {posts.map((post) => (
        <article key={post.slug} className="flex items-start gap-3">
          <Link href={`/blog/${post.slug}`} className="block shrink-0">
            <div
              className={`h-[4.6rem] w-[4.8rem] overflow-hidden rounded-[0.8rem] ${thumbnailScenes[post.category]}`}
            />
          </Link>

          <div className="min-w-0 space-y-1.5">
            <p className="text-xs text-zinc-500">{formatDate(post.publishedAt)}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="block font-display text-[1.05rem] font-semibold leading-snug text-zinc-950 transition hover:text-accent"
            >
              {post.title}
            </Link>
            <PostSourceLinks links={post.sourceLinks} limit={1} />
          </div>
        </article>
      ))}
    </div>
  );
}
