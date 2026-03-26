import Link from "next/link";
import { Post } from "@/lib/getAllPosts";
import { PostCard } from "./post-card";

interface WritingProps {
  posts: Post[];
}

const Writing = ({ posts }: WritingProps) => (
  <section className="mb-16">
    <h2 className="text-sm font-medium text-purple-500 dark:text-purple-400 uppercase tracking-wide mb-4">
      Writing
    </h2>
    <div>
      {posts.map(({ slug, meta }) => (
        <PostCard key={slug} meta={meta} href={`/blog/${slug}`} compact />
      ))}
    </div>
    <Link
      href="/blog"
      className="inline-block mt-4 text-purple-500 dark:text-purple-500 hover:text-purple-900 dark:hover:text-purple-100 transition-colors text-sm"
    >
      All posts →
    </Link>
  </section>
);

export default Writing;
