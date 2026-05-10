import Link from "next/link";

import { PostCoverImage } from "@/components/posts/post-cover-image";
import { PostSourceLinks } from "@/components/posts/post-source-links";
import { formatDate } from "@/lib/utils/format";
import type { PostSummary } from "@/types/post";

interface FeaturedPostListProps {
  posts: PostSummary[];
  emptyMessage: string;
}

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
            <PostCoverImage
              title={post.title}
              category={post.category}
              src={post.coverImageUrl}
              sizes="77px"
              className="h-[4.6rem] w-[4.8rem] rounded-[0.8rem]"
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
