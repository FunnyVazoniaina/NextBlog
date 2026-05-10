import type { PostSourceLink } from "@/types/post";

interface PostSourceLinksProps {
  links: PostSourceLink[];
  limit?: number;
  className?: string;
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function PostSourceLinks({
  links,
  limit,
  className,
}: PostSourceLinksProps) {
  const visibleLinks = typeof limit === "number" ? links.slice(0, limit) : links;

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <div className={joinClassNames("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {visibleLinks.map((link, index) => (
        <a
          key={`${link.label}-${link.url}-${index}`}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-blue-600 underline decoration-blue-300 underline-offset-4 transition visited:text-blue-600 hover:text-blue-800"
        >
          {link.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
