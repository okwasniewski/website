const GITHUB_STARS_REVALIDATE_SECONDS = 60 * 60;

const RESERVED_OWNERS = new Set([
  "about",
  "account",
  "apps",
  "collections",
  "codespaces",
  "customer-stories",
  "enterprise",
  "events",
  "explore",
  "features",
  "issues",
  "login",
  "logout",
  "marketplace",
  "new",
  "notifications",
  "orgs",
  "organizations",
  "pricing",
  "pulls",
  "readme",
  "settings",
  "signup",
  "sponsors",
  "topics",
  "users",
]);

const REPOSITORY_SEGMENT = /^[A-Za-z0-9_.-]+$/;

export interface GitHubRepository {
  owner: string;
  name: string;
}

export interface StarCountPost {
  slug: string;
  meta: {
    github?: string;
  };
}

export function parseGitHubRepository(
  value?: string,
): GitHubRepository | null {
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;

  const host = url.hostname.toLowerCase();
  if (host !== "github.com" && host !== "www.github.com") return null;

  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length < 2) return null;

  let owner: string;
  let name: string;
  try {
    owner = decodeURIComponent(segments[0]);
    name = decodeURIComponent(segments[1]);
  } catch {
    return null;
  }

  if (name.toLowerCase().endsWith(".git")) {
    name = name.slice(0, -4);
  }

  if (!isRepositorySegment(owner) || !isRepositorySegment(name)) return null;
  if (RESERVED_OWNERS.has(owner.toLowerCase())) return null;

  return { owner, name };
}

export function formatRepositoryName(repository: GitHubRepository): string {
  return `${repository.owner}/${repository.name}`;
}

/**
 * Reads a star count from a GitHub repository payload.
 * Missing or non-integer values are unavailable counts, including a payload
 * that cannot be trusted. A real count of zero is preserved.
 */
export function readRepositoryStarCount(payload: unknown): number | undefined {
  if (!payload || typeof payload !== "object") return undefined;

  const stars = (payload as { stargazers_count?: unknown }).stargazers_count;
  if (typeof stars !== "number" || !Number.isInteger(stars) || stars < 0) {
    return undefined;
  }

  return stars;
}

/**
 * Fetches the public star count for one repository.
 * Successful responses are cached for one hour. Rate limits, HTTP errors,
 * and network failures are not cached and are not reported as zero.
 */
export async function fetchRepositoryStarCount(
  repository: GitHubRepository,
): Promise<number | undefined> {
  const url = `https://api.github.com/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.name)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "oskarkwasniewski.dev",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: GITHUB_STARS_REVALIDATE_SECONDS },
    });

    if (response.status !== 200) {
      console.error(
        `GitHub star count unavailable for ${formatRepositoryName(repository)}: HTTP ${response.status}`,
      );
      return undefined;
    }

    const payload: unknown = await response.json();
    const stars = readRepositoryStarCount(payload);
    if (stars === undefined) {
      console.error(
        `GitHub star count unavailable for ${formatRepositoryName(repository)}: invalid payload`,
      );
    }
    return stars;
  } catch {
    console.error(
      `GitHub star count unavailable for ${formatRepositoryName(repository)}`,
    );
    return undefined;
  }
}

export async function getProjectStarCounts(
  posts: StarCountPost[],
): Promise<Map<string, number>> {
  const counts = new Map<string, number>();

  await Promise.all(
    posts.map(async (post) => {
      const repository = parseGitHubRepository(post.meta.github);
      if (!repository) return;

      const stars = await fetchRepositoryStarCount(repository);
      if (typeof stars === "number") {
        counts.set(post.slug, stars);
      }
    }),
  );

  return counts;
}

function isRepositorySegment(value: string): boolean {
  return value !== "." && value !== ".." && REPOSITORY_SEGMENT.test(value);
}
