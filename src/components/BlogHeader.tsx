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
    <header className="pixel-blog-header mb-10">
      {date && (
        <p className="pixel-meta mb-2">{date}</p>
      )}
      <h1 className="pixel-title-lg mb-2">
        {title}
      </h1>
      <p className="pixel-subtitle mb-4">{subtitle}</p>
      {primaryAction && (
        <Link
          href={primaryAction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 pixel-link underline underline-offset-2 transition-colors"
        >
          {showGitHubIcon && <FaGithub className="w-4 h-4" />}
          {primaryAction.text} →
        </Link>
      )}
    </header>
  );
}
