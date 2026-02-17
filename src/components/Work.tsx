import Link from "next/link";
import { Post } from "@/lib/getAllPosts";
import { PostCard } from "./post-card";

interface WorkProps {
  posts: Post[];
  showAllLink?: boolean;
  showPrimaryActionLink?: boolean;
}

const Work = ({
  posts,
  showAllLink = false,
  showPrimaryActionLink = false,
}: WorkProps) => (
  <section className="mb-16">
    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
      Projects
    </h2>
    <div>
      {posts.map(({ slug, meta }) => (
        <PostCard
          key={slug}
          meta={meta}
          href={`/portfolio/${slug}`}
          compact
          showPrimaryActionLink={showPrimaryActionLink}
        />
      ))}
    </div>
    {showAllLink && (
      <Link
        href="/portfolio"
        className="inline-block mt-4 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
      >
        All projects →
      </Link>
    )}
  </section>
);

export default Work;
