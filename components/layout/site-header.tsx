import Link from "next/link";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-xl">
      <Container className="py-3">
        <div className="flex items-center gap-3 lg:gap-4">
          <nav className="flex items-center gap-2 text-sm font-medium text-zinc-600">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-line bg-white px-4 py-2 transition hover:border-line-strong hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden min-w-0 flex-1 lg:block">
            <div className="flex h-11 items-center rounded-full border border-line bg-surface-soft px-4 text-sm text-zinc-500">
              Search the blog posts and topics
            </div>
          </div>
        </div>

        <div className="mt-3 lg:hidden">
          <div className="flex h-11 items-center rounded-full border border-line bg-surface-soft px-4 text-sm text-zinc-500">
            Search the blog posts and topics
          </div>
        </div>
      </Container>
    </header>
  );
}
