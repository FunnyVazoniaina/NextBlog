import Link from "next/link";

import { siteConfig } from "@/lib/config/site";
import { Container } from "@/components/layout/container";

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-white/80 backdrop-blur-xl">
      <Container className="flex items-center justify-between gap-6 py-5">
        <Link href="/" className="space-y-1">
          <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-stone-500">
            Personal blog
          </span>
          <span className="block text-lg font-semibold text-stone-950">
            {siteConfig.author.name}
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-stone-600">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
