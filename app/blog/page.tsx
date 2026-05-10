import { Container } from "@/components/layout/container";
import { PostCard } from "@/components/posts/post-card";
import { postService } from "@/features/posts/service/post-service";

export const metadata = {
  title: "Blog",
  description: "All articles published on the personal blog.",
};

export default async function BlogPage() {
  const posts = await postService.getPublishedPosts();
  const hasPosts = posts.length > 0;
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <Container className="py-4 sm:py-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-4">
          <section className="overflow-hidden rounded-[1.6rem] border border-line bg-white">
            <div className="border-b border-line bg-surface-soft px-5 py-4 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Archive feed
              </p>
            </div>
            <div className="space-y-4 px-5 py-5 sm:px-6">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Every published thread in one continuous feed.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg">
                This archive keeps the Reddit-style reading flow while surfacing
                longer-form blog posts, experiments, and field notes.
              </p>
            </div>
          </section>

          {hasPosts ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <section className="rounded-[1.5rem] border border-dashed border-line-strong bg-white p-8">
              <p className="font-display text-2xl font-semibold text-zinc-950">
                No posts have been published yet.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
                Once MongoDB Atlas contains published posts, they will fill this
                archive feed automatically.
              </p>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <section className="rounded-[1.5rem] border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Categories
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-line bg-surface-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700"
                  >
                    {category}
                  </span>
                ))
              ) : (
                <span className="text-sm text-zinc-500">
                  Categories will appear once posts are published.
                </span>
              )}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Reading mode
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-surface-soft p-4 text-sm text-zinc-700">
                Cards stay compact in the feed and expand into full threads on
                open.
              </div>
              <div className="rounded-2xl bg-surface-soft p-4 text-sm text-zinc-700">
                Voting is available on each post page so readers can leave a
                quick signal.
              </div>
            </div>
          </section>
        </aside>
      </div>
    </Container>
  );
}
