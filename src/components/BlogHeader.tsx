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
    <header className="mb-10 pb-6 border-b border-purple-200 dark:border-purple-800">
      {date && (
        <p className="text-sm text-purple-500 dark:text-purple-500 mb-2">{date}</p>
      )}
      <h1 className="text-2xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
        {title}
      </h1>
      <p className="text-purple-600 dark:text-purple-400 mb-4">{subtitle}</p>
      {primaryAction && (
        <Link
          href={primaryAction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-purple-900 dark:text-purple-100 underline underline-offset-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          {showGitHubIcon && <FaGithub className="w-4 h-4" />}
          {primaryAction.text} →
        </Link>
      )}
    </header>
  );
}
