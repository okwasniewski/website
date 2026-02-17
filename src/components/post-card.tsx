import Link from "next/link";
import { PostMeta } from "@/lib/getAllPosts";
import { FaGithub } from "react-icons/fa";

interface PostCardProps {
  meta: PostMeta;
  href: string;
  compact?: boolean;
  showPrimaryActionLink?: boolean;
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

export function PostCard({
  meta,
  href,
  compact = false,
  showPrimaryActionLink = false,
}: PostCardProps) {
  const githubHref = showPrimaryActionLink
    ? getValidGitHubUrl(meta.github)
    : undefined;

  return (
    <article
      className={`pixel-entry ${compact ? "py-3" : "py-4"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Link href={href} className="block flex-1 min-w-0 group">
          <h3 className="pixel-title transition-colors">
            {meta.title}
          </h3>
          <p className="pixel-subtitle mt-1">
            {meta.subtitle}
          </p>
        </Link>
        {(githubHref || meta.date) && (
          <div className="flex items-center gap-3 shrink-0">
            {githubHref && (
              <Link
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${meta.title ?? "project"} on GitHub`}
                className="pixel-icon-link transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </Link>
            )}
            {meta.date && (
              <span className="pixel-meta shrink-0">
                {meta.date}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
