import Link from "next/link";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-black/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,119,6,0.2),_transparent_35%),linear-gradient(180deg,_#fffaf2_0%,_#ffffff_65%)]" />
      <Container className="relative py-18 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-amber-300 bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-900">
              Fullstack notes
            </span>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl">
                Building a personal corner of the internet with code, clarity,
                and consistency.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
                {siteConfig.description}
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_80px_rgba(41,37,36,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
              Current focus
            </p>
            <p className="mt-4 text-2xl font-semibold text-stone-950">
              Next.js architecture, product thinking, and writing in public.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Explore the articles
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
