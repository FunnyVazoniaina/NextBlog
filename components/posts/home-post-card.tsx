import Link from "next/link";

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
    surface: string;
    role: string;
  }
> = {
  engineering: {
    surface:
      "bg-[radial-gradient(circle_at_22%_28%,rgba(255,214,182,0.95),transparent_18%),radial-gradient(circle_at_78%_22%,rgba(39,82,112,0.85),transparent_22%),linear-gradient(135deg,#83cae7_0%,#9fd5e6_36%,#d8edf5_70%,#f0d49b_100%)]",
    role: "DevOps & Platform Engineer",
  },
  product: {
    surface:
      "bg-[radial-gradient(circle_at_25%_26%,rgba(238,248,214,0.9),transparent_20%),radial-gradient(circle_at_70%_24%,rgba(55,86,69,0.55),transparent_20%),linear-gradient(135deg,#b5d8ba_0%,#8ec0a5_38%,#dce6c1_72%,#f2e7c5_100%)]",
    role: "Product-minded Engineer",
  },
  writing: {
    surface:
      "bg-[radial-gradient(circle_at_26%_22%,rgba(255,229,217,0.9),transparent_18%),radial-gradient(circle_at_78%_30%,rgba(214,147,93,0.55),transparent_24%),linear-gradient(135deg,#f0c6aa_0%,#ebb07e_42%,#f1d6c6_75%,#f6ece6_100%)]",
    role: "Linux & Systems Writer",
  },
  career: {
    surface:
      "bg-[radial-gradient(circle_at_24%_20%,rgba(255,233,219,0.92),transparent_18%),radial-gradient(circle_at_74%_26%,rgba(185,119,74,0.45),transparent_22%),linear-gradient(135deg,#edcfbc_0%,#eeb88f_40%,#f6ddcf_72%,#fbf0ea_100%)]",
    role: "Engineering Mentor",
  },
};

export function HomePostCard({ post }: HomePostCardProps) {
  const scene = categoryScenes[post.category];

  return (
    <article className="h-full rounded-[1rem] bg-white p-3 shadow-[0_10px_28px_rgba(17,17,17,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(17,17,17,0.08)]">
      <div className="flex h-full flex-col">
        <Link href={`/blog/${post.slug}`} className="block">
          <div
            className={`relative aspect-[1.44/1] overflow-hidden rounded-[0.8rem] ${scene.surface}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_45%,rgba(0,0,0,0.04)_100%)]" />
            <div className="absolute left-[13%] top-[18%] h-[44%] w-[26%] rounded-[1rem] bg-white/18 blur-[2px]" />
            <div className="absolute bottom-[12%] left-[18%] h-[14%] w-[52%] rounded-full bg-white/26 blur-sm" />
          </div>
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
