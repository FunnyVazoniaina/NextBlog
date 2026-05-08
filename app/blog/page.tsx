import { Container } from "@/components/layout/container";
import { PostCard } from "@/components/posts/post-card";
import { postService } from "@/features/posts/service/post-service";

export const metadata = {
  title: "Blog",
  description: "All articles published on the personal blog.",
};

export default async function BlogPage() {
  const posts = await postService.getPublishedPosts();

  return (
    <Container className="py-16 sm:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
          Blog archive
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          Ideas, experiments, and field notes from the work.
        </h1>
        <p className="text-lg leading-8 text-stone-600">
          This space gathers writing about engineering, shipping, learning, and
          the systems behind sustainable creative work.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Container>
  );
}
