import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Writing from "@/components/Writing";
import Speaking from "@/components/Speaking";
import { getPosts } from "@/lib/getAllPosts";

export default async function HomePage() {
  const projects = await getPosts({ directory: "portfolio", limit: 5 });
  const posts = await getPosts({ directory: "blog", limit: 5 });

  return (
    <>
      <Hero />
      <Work posts={projects} showAllLink showPrimaryActionLink />
      <Writing posts={posts} />
      <Speaking />
    </>
  );
}
