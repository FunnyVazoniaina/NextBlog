import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Hero } from "@/components/posts/hero";
import { PostCard } from "@/components/posts/post-card";
import { postService } from "@/features/posts/service/post-service";
import { siteConfig } from "@/lib/config/site";

const backendCapabilities = [
  {
    title: "Service layer",
    description:
      "Post retrieval lives in a dedicated service so the UI stays free of data access details.",
  },
  {
    title: "Repository pattern",
    description:
      "MongoDB Atlas is now the only content source, and the app stays ready for real posts as soon as the collection is populated.",
  },
  {
    title: "Route handlers",
    description:
      "REST-style endpoints are already exposed for health checks and post retrieval.",
  },
];

export default async function Home() {
  const featuredPosts = await postService.getFeaturedPosts();
  const hasFeaturedPosts = featuredPosts.length > 0;

  return (
    <>
      <Hero />

      <Container className="py-16 sm:py-20">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
              Editorial direction
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              A flexible foundation for a blog that can become a real platform.
            </h2>
            <p className="text-lg leading-8 text-stone-600">
              The public pages are rendered as server components, the backend is
              exposed through route handlers, and the post model now maps
              cleanly to MongoDB Atlas through a dedicated repository.
            </p>
            <p className="text-base leading-7 text-stone-500">
              Built for {siteConfig.author.name}, with enough structure to grow
              into categories, admin tools, search, or a CMS later.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {backendCapabilities.map((capability) => (
              <article
                key={capability.title}
                className="rounded-[1.75rem] border border-black/10 bg-white p-5"
              >
                <h3 className="text-lg font-semibold text-stone-950">
                  {capability.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-18">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
                Featured posts
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
                Recent writing from the desk.
              </h2>
            </div>

            <Link
              href="/blog"
              className="text-sm font-semibold text-stone-950 transition hover:text-amber-700"
            >
              View every article
            </Link>
          </div>

          {hasFeaturedPosts ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-black/15 bg-stone-50 p-8 text-center">
              <p className="text-lg font-semibold text-stone-900">
                No featured posts were found in MongoDB Atlas yet.
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Add published documents to the `posts` collection and they will
                appear here automatically.
              </p>
            </div>
          )}
        </section>
      </Container>
    </>
  );
}
