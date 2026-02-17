import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostSlugs, getPostBySlug } from "@/lib/getAllPosts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs({ directory: "apps" });
  return slugs.map((slug) => ({ slug: slug.replace(".mdx", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = await getPostBySlug("apps", slug);
    return {
      title: meta.title,
      description: meta.subtitle,
    };
  } catch {
    return { title: "Page Not Found" };
  }
}

export default async function AppsPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug("apps", slug).catch(() => null);
  if (!post) notFound();

  const { default: Content, meta } = post;

  return (
    <>
      <h1 className="pixel-title-lg mb-4">
        {meta.title}
      </h1>
      <div className="mx-auto pixel-prose lg:prose-lg pixel-reveal">
        <Content />
      </div>
    </>
  );
}
