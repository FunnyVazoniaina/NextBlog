import type { ReactNode, SVGProps } from "react";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/config/site";

const footerColumns = [
  {
    title: "Quick access",
    links: siteConfig.footer.quickLinks,
  },
  {
    title: "Resources",
    links: siteConfig.footer.devopsResources,
  },
  {
    title: "Social",
    links: siteConfig.socialLinks,
  },
  {
    title: "Build with",
    links: siteConfig.footer.buildWith,
  },
] as const;

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = isExternalLink(href);

  return (
    <a
      href={href}
      className={className}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

function SocialIcon(props: SVGProps<SVGSVGElement> & { label: string }) {
  const { label, ...svgProps } = props;

  switch (label) {
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...svgProps}>
          <path d="M12 2C6.47 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.66-.22.66-.49 0-.25-.01-1.05-.02-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63 1 .07 1.52 1.04 1.52 1.04.88 1.56 2.32 1.11 2.89.85.09-.66.34-1.11.61-1.37-2.22-.26-4.55-1.14-4.55-5.09 0-1.13.39-2.05 1.03-2.77-.11-.26-.45-1.31.1-2.72 0 0 .83-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.5.36 1.91-1.32 2.74-1.05 2.74-1.05.55 1.41.21 2.46.1 2.72.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.82-4.57 5.08.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.67.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...svgProps}>
          <path d="M18.9 2H22l-6.77 7.74L23 22h-6.08l-4.76-7.4L5.7 22H2.58l7.24-8.28L2.36 2h6.23l4.3 6.9L18.9 2Zm-1.07 18h1.69L7.66 3.9H5.84L17.83 20Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...svgProps}>
          <path d="M4.98 3.5A2.48 2.48 0 1 1 5 8.46a2.48 2.48 0 0 1-.02-4.96ZM3 9.96h4v11H3v-11Zm7 0h3.83v1.5h.06c.53-.95 1.84-1.94 3.79-1.94 4.05 0 4.8 2.66 4.8 6.12v5.32h-4v-4.72c0-1.12-.02-2.56-1.56-2.56-1.57 0-1.81 1.22-1.81 2.48v4.8h-4v-11Z" />
        </svg>
      );
  }
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-12 sm:py-14">
        <div className="border-b border-line pb-8 sm:pb-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-[2.35rem]">
                Sign up to my newsletter
              </h2>
              <p className="max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
                Stay up to date with the latest notes, experiments, and engineering articles.
              </p>
            </div>

            <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-[4.35rem] w-full rounded-2xl border border-line bg-white px-5 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-300 sm:h-12 sm:flex-1 sm:rounded-xl sm:px-4 sm:text-sm"
              />
              <FooterLink
                href={`mailto:${siteConfig.author.email}?subject=Newsletter subscription`}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-[#cf741c] hover:text-white"
              >
                Subscribe
              </FooterLink>
            </div>
          </div>
        </div>

        <div className="grid gap-10 border-b border-line py-10 sm:grid-cols-2 xl:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))]">
          <div className="max-w-sm space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-950 text-sm font-semibold text-zinc-950">
                FV
              </span>
              <div>
                <p className="font-display text-base font-semibold text-zinc-950">
                  {siteConfig.author.name}
                </p>
                <p className="text-sm text-zinc-500">{siteConfig.author.role}</p>
              </div>
            </div>

            <p className="text-sm leading-7 text-zinc-600">{siteConfig.description}</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <p className="text-sm font-semibold text-zinc-950">{column.title}</p>
              <ul className="space-y-3 text-sm text-zinc-600">
                {column.links.map((item) => (
                  <li key={item.href}>
                    <FooterLink
                      href={item.href}
                      className="transition hover:text-accent"
                    >
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            &copy; {year} {siteConfig.author.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-3 text-zinc-700">
            {siteConfig.socialLinks.map((item) => (
              <FooterLink
                key={item.label}
                href={item.href}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition hover:border-line-strong hover:text-accent"
              >
                <span className="sr-only">{item.label}</span>
                <SocialIcon label={item.label} className="h-4 w-4" />
              </FooterLink>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
