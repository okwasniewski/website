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
  <section className="mb-16 pixel-reveal">
    <h2 className="pixel-section-title">
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
        className="inline-block mt-4 pixel-link text-sm transition-colors"
      >
        All projects →
      </Link>
    )}
  </section>
);

export default Work;
