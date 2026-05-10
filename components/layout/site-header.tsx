import Link from "next/link";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-xl">
      <Container className="py-3">
        <div className="flex items-center gap-3 lg:gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-full border border-line bg-white px-3 py-2 transition hover:border-line-strong"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              FV
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-sm font-semibold text-zinc-950">
                {siteConfig.author.name}
              </span>
              <span className="block truncate text-xs text-zinc-500">
                r/personal-blog
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 lg:block">
            <div className="flex h-11 items-center rounded-full border border-line bg-surface-soft px-4 text-sm text-zinc-500">
              Search the feed, topics, and posts
            </div>
          </div>

          <nav className="ml-auto flex items-center gap-2 text-sm font-medium text-zinc-600">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 transition hover:bg-zinc-100 hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/admin/login"
              className="rounded-full bg-accent px-4 py-2 font-semibold text-white transition hover:bg-[#cf741c]"
            >
              Backoffice
            </Link>
          </nav>
        </div>

        <div className="mt-3 lg:hidden">
          <div className="flex h-11 items-center rounded-full border border-line bg-surface-soft px-4 text-sm text-zinc-500">
            Search the feed, topics, and posts
          </div>
        </div>
      </Container>
    </header>
  );
}
