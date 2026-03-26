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
    <h2 className="text-sm font-medium text-purple-500 dark:text-purple-400 uppercase tracking-wide mb-4">
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
        className="inline-block mt-4 text-purple-500 dark:text-purple-500 hover:text-purple-900 dark:hover:text-purple-100 transition-colors text-sm"
      >
        All projects →
      </Link>
    )}
  </section>
);

export default Work;
