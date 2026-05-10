import Link from "next/link";

import { PostCoverImage } from "@/components/posts/post-cover-image";
import { PostSourceLinks } from "@/components/posts/post-source-links";
import { siteConfig } from "@/lib/config/site";
import { formatDate, formatReadingTime } from "@/lib/utils/format";
import type { PostCategory, PostSummary } from "@/types/post";

interface HomePostCardProps {
  post: PostSummary;
}

const categoryScenes: Record<
  PostCategory,
  {
    role: string;
  }
> = {
  engineering: {
    role: "DevOps & Platform Engineer",
  },
  product: {
    role: "Product-minded Engineer",
  },
  writing: {
    role: "Linux & Systems Writer",
  },
  career: {
    role: "Engineering Mentor",
  },
};

export function HomePostCard({ post }: HomePostCardProps) {
  const scene = categoryScenes[post.category];

  return (
    <article className="h-full rounded-[1rem] bg-white p-3 shadow-[0_10px_28px_rgba(17,17,17,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(17,17,17,0.08)]">
      <div className="flex h-full flex-col">
        <Link href={`/blog/${post.slug}`} className="block">
          <PostCoverImage
            title={post.title}
            category={post.category}
            src={post.coverImageUrl}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="aspect-[1.44/1] rounded-[0.8rem]"
          />
        </Link>

        <div className="flex flex-1 flex-col px-0.5 pb-1 pt-4">
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-zinc-700">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span>{formatReadingTime(post.readingTimeInMinutes)}</span>
          </div>

          <Link href={`/blog/${post.slug}`} className="mt-3 block">
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-zinc-950 transition hover:text-accent">
              {post.title}
            </h2>
          </Link>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{post.excerpt}</p>

          <PostSourceLinks links={post.sourceLinks} limit={2} className="mt-4" />

          <div className="mt-auto flex items-center gap-3 pt-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7ede2] text-xs font-semibold text-[#9a5e25]">
              {siteConfig.author.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-950">
                {siteConfig.author.name}
              </p>
              <p className="text-xs text-zinc-500">{scene.role}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
