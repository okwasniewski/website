import { Post } from "@/lib/getAllPosts";
import { PostCard } from "./post-card";

interface BlogProps {
  posts: Post[];
}

const Blog = ({ posts }: BlogProps) => (
  <>
    <h1 className="pixel-title-lg mb-2">
      Blog
    </h1>
    <p className="pixel-body mb-8">
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
