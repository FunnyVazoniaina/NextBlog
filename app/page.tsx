import { Container } from "@/components/layout/container";
import { HomePostCard } from "@/components/posts/home-post-card";
import { postService } from "@/features/posts/service/post-service";

export const revalidate = 60;

const topicPills = [
  "Linux",
  "DevOps",
  "Cloud Automation",
  "Platform",
  "Containers",
  "Shell Workflows",
];

export default async function Home() {
  const posts = await postService.getPublishedPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden bg-[#f6f6f3]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[18rem] bg-[radial-gradient(circle_at_top,rgba(227,131,35,0.08),transparent_45%)]" />

        <Container className="relative py-5 sm:py-6 lg:py-8">
          <div className="px-2 pb-8 pt-4 text-center sm:pb-10 sm:pt-6 lg:pb-12 lg:pt-8">
            <div className="mx-auto flex w-full max-w-[22rem] items-center justify-between gap-3 rounded-[1rem] border border-line bg-white px-3.5 py-3 text-left shadow-[0_8px_20px_rgba(17,17,17,0.04)] sm:max-w-3xl sm:px-4">
              <span className="min-w-0 truncate text-sm font-semibold text-zinc-950">
                Funny Vazoniaina
              </span>

              <span className="grid shrink-0 grid-cols-3 gap-1 rounded-xl border border-line bg-white p-2">
                {Array.from({ length: 9 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-zinc-400"
                  />
                ))}
              </span>
            </div>

            <div className="mx-auto max-w-4xl py-12 sm:py-14 lg:py-16">
              <h1 className="font-display text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-[4.7rem]">
                Tech Blog & Notes
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                Explore fresh stories, field notes, and practical insights from
                the worlds of Linux, DevOps, backend engineering, and modern
                infrastructure.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                {topicPills.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-[0.45rem] border border-line bg-white px-3.5 py-2 text-xs font-medium text-zinc-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="pb-14 pt-10 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-14">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-[2.35rem]">
              Latest Posts
            </h2>
          </div>

          {latestPosts.length > 0 ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <HomePostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[1rem] bg-[#fafaf8] px-6 py-10 shadow-[0_10px_28px_rgba(17,17,17,0.05)]">
              <p className="font-display text-2xl font-semibold text-zinc-950">
                The homepage is ready for your first post.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
                Publish a new article from the admin area and it will show up
                here as part of the latest posts grid.
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
