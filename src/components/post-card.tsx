import Link from "next/link";
import { PostMeta } from "@/lib/getAllPosts";
import { FaGithub, FaRegStar } from "react-icons/fa";

interface PostCardProps {
  meta: PostMeta;
  href: string;
  compact?: boolean;
  showPrimaryActionLink?: boolean;
  starCount?: number;
}

function getValidGitHubUrl(value?: string): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return undefined;

    const host = url.hostname.toLowerCase();
    if (host === "github.com" || host.endsWith(".github.com")) {
      return value;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function GitHubStarCount({ count }: { count: number }) {
  const formatted = count.toLocaleString("en-US");

  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm tabular-nums text-gray-500 dark:text-gray-400"
      title={`${formatted} GitHub stars`}
    >
      <FaRegStar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>
        {formatted}
        <span className="sr-only"> GitHub stars</span>
      </span>
    </span>
  );
}

export function PostCard({
  meta,
  href,
  compact = false,
  showPrimaryActionLink = false,
  starCount,
}: PostCardProps) {
  const githubHref = showPrimaryActionLink
    ? getValidGitHubUrl(meta.github)
    : undefined;
  const hasStarCount =
    typeof starCount === "number" &&
    Number.isInteger(starCount) &&
    starCount >= 0;

  return (
    <article
      className={`${compact ? "py-3" : "py-4"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Link href={href} className="block flex-1 min-w-0 group">
          <h3 className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {meta.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {meta.subtitle}
          </p>
        </Link>
        {(githubHref || meta.date || hasStarCount) && (
          <div className="ml-auto flex shrink-0 items-center justify-end gap-3">
            {meta.date && (
              <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0">
                {meta.date}
              </span>
            )}
            {hasStarCount ? <GitHubStarCount count={starCount} /> : null}
            {githubHref && (
              <Link
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${meta.title ?? "project"} on GitHub`}
                className="shrink-0 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
