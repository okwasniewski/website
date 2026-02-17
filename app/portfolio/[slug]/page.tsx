import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogHeader from "@/components/BlogHeader";
import { getPostSlugs, getPostBySlug } from "@/lib/getAllPosts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs({ directory: "portfolio" });
  return slugs.map((slug) => ({ slug: slug.replace(".mdx", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = await getPostBySlug("portfolio", slug);
    return {
      title: meta.title,
      description: meta.subtitle,
      openGraph: {
        title: meta.title,
        description: meta.subtitle,
      },
    };
  } catch {
    return { title: "Project Not Found" };
  }
}

export default async function PortfolioPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug("portfolio", slug).catch(() => null);
  if (!post) notFound();

  const { default: Content, meta } = post;

  return (
    <>
      <BlogHeader
        title={meta.title || ""}
        subtitle={meta.subtitle || ""}
        date={meta.date}
        primaryAction={meta.primaryAction}
      />
      <div className="mx-auto pixel-prose prose-sm sm:prose-base pixel-reveal">
        <Content />
      </div>
    </>
  );
}
