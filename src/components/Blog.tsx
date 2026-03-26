import { Post } from "@/lib/getAllPosts";
import { PostCard } from "./post-card";

interface BlogProps {
  posts: Post[];
}

const Blog = ({ posts }: BlogProps) => (
  <>
    <h1 className="text-2xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
      Blog
    </h1>
    <p className="text-purple-600 dark:text-purple-400 mb-8">
      Anything related to my hobbies, programming, and technology.
    </p>
    <div>
      {posts.map(({ slug, meta }) => (
        <PostCard key={slug} meta={meta} href={`/blog/${slug}`} />
      ))}
    </div>
  </>
);

export default Blog;
