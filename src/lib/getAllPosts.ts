import fs from "fs";
import { join } from "path";

export interface PostMeta {
  title?: string;
  subtitle?: string;
  featuredImage?: string;
  date?: string;
  github?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
}

export interface Post {
  slug: string;
  meta: PostMeta;
}

type Directories = "blog" | "portfolio" | "apps";

interface Options {
  directory: Directories;
  limit?: number;
}

const getDirectory = (dir: string) => join(process.cwd(), `content/${dir}`);

export function getPostSlugs(options: Options): string[] {
  const dir = getDirectory(options.directory);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((item) => item.endsWith(".mdx"))
    .slice(0, options.limit === -1 ? undefined : options.limit);
}

function extractMeta(content: string): PostMeta {
  const metaMatch = content.match(
    /export const meta = (\{[\s\S]*?\n\})[\s;]*\n/,
  );
  if (!metaMatch) return {};

  try {
    const fn = new Function("return " + metaMatch[1]);
    return fn() as PostMeta;
  } catch {
    return {};
  }
}

export async function getPosts(options: Options): Promise<Post[]> {
  const slugs = getPostSlugs({ ...options, limit: -1 });
  const posts = slugs
    .map((slug) => {
      const filePath = join(getDirectory(options.directory), slug);
      const content = fs.readFileSync(filePath, "utf-8");
      const meta = extractMeta(content);
      return { slug: slug.replace(".mdx", ""), meta };
    })
    .sort(
      (a, b) =>
        new Date(b.meta.date ?? 0).getTime() -
        new Date(a.meta.date ?? 0).getTime(),
    );

  return options.limit === -1 ? posts : posts.slice(0, options.limit);
}

export async function getPostBySlug(
  directory: Directories,
  slug: string,
): Promise<{ meta: PostMeta; default: React.ComponentType }> {
  const filePath = join(getDirectory(directory), `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const meta = extractMeta(content);

  const { default: Content } = await import(
    `../../content/${directory}/${slug}.mdx`
  );

  return { meta, default: Content };
}
