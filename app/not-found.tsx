import Link from "next/link";

import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-black/10 bg-white p-10 text-center shadow-[0_20px_80px_rgba(41,37,36,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950">
          This page could not be found.
        </h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          The article or page you tried to open does not exist anymore, or the
          link was never valid in the first place.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
        >
          Browse the blog
        </Link>
      </div>
    </Container>
  );
}
