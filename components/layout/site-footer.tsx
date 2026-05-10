import Link from "next/link";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="font-display text-lg font-semibold text-zinc-950">
            {siteConfig.author.name}
          </p>
          <p className="text-sm leading-7 text-zinc-600">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
          {siteConfig.socialLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-line bg-surface-soft px-4 py-2 transition hover:border-line-strong hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
