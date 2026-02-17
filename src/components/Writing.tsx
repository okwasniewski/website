import Link from "next/link";
import { Post } from "@/lib/getAllPosts";
import { PostCard } from "./post-card";

interface WritingProps {
  posts: Post[];
}

const Writing = ({ posts }: WritingProps) => (
  <section className="mb-16 pixel-reveal">
    <h2 className="pixel-section-title">
      Writing
    </h2>
    <div>
      {posts.map(({ slug, meta }) => (
        <PostCard key={slug} meta={meta} href={`/blog/${slug}`} compact />
      ))}
    </div>
    <Link
      href="/blog"
      className="inline-block mt-4 pixel-link text-sm transition-colors"
    >
      All posts →
    </Link>
  </section>
);

export default Writing;
