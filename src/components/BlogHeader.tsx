import Link from "next/link";
import { PostMeta } from "@/lib/getAllPosts";
import { FaGithub } from "react-icons/fa";

type BlogHeaderProps = {
  title: string;
  subtitle: string;
  date?: string;
} & Pick<PostMeta, "primaryAction">;

export default function BlogHeader({
  title,
  subtitle,
  date,
  primaryAction,
}: BlogHeaderProps) {
  const showGitHubIcon =
    primaryAction &&
    (primaryAction.text.toLowerCase().includes("github") ||
      primaryAction.href.toLowerCase().includes("github.com"));

  return (
    <header className="mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
      {date && (
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">{date}</p>
      )}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{subtitle}</p>
      {primaryAction && (
        <Link
          href={primaryAction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gray-900 dark:text-gray-100 underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          {showGitHubIcon && <FaGithub className="w-4 h-4" />}
          {primaryAction.text} →
        </Link>
      )}
    </header>
  );
}
