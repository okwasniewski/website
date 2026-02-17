import Link from "next/link";
import { PostMeta } from "@/lib/getAllPosts";
import { FaGithub } from "react-icons/fa";

interface PostCardProps {
  meta: PostMeta;
  href: string;
  compact?: boolean;
  showPrimaryActionLink?: boolean;
}

export function PostCard({
  meta,
  href,
  compact = false,
  showPrimaryActionLink = false,
}: PostCardProps) {
  const githubHref =
    showPrimaryActionLink &&
    meta.primaryAction &&
    /github\.com/i.test(meta.primaryAction.href)
      ? meta.primaryAction.href
      : undefined;

  return (
    <article
      className={`${compact ? "py-3" : "py-4"} border-b border-gray-200 dark:border-gray-800 last:border-b-0`}
    >
      <div className="flex items-start justify-between gap-4">
        <Link href={href} className="block flex-1 min-w-0 group">
          <h3 className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {meta.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </Link>
            )}
            {meta.date && (
              <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0">
                {meta.date}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
