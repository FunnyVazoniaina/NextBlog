import Link from "next/link";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-stone-950 text-stone-200">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-lg font-semibold">{siteConfig.author.name}</p>
          <p className="text-sm leading-7 text-stone-400">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-stone-300">
          {siteConfig.socialLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
