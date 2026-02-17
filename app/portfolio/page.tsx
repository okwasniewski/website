import type { Metadata } from "next";
import Work from "@/components/Work";
import { getPosts } from "@/lib/getAllPosts";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My latest projects and open source contributions.",
};

export default async function PortfolioPage() {
  const posts = await getPosts({ directory: "portfolio", limit: -1 });

  return <Work posts={posts} showPrimaryActionLink />;
}
