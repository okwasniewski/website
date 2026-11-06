import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { getPosts } from "./getAllPosts";
import {
  fetchRepositoryStarCount,
  formatRepositoryName,
  getProjectStarCounts,
  parseGitHubRepository,
  readRepositoryStarCount,
} from "./github-stars";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("parseGitHubRepository", () => {
  it("reads the canonical owner and repo from portfolio metadata", () => {
    assert.deepEqual(
      parseGitHubRepository("https://github.com/tester-army/e2e"),
      { owner: "tester-army", name: "e2e" },
    );
    assert.equal(
      formatRepositoryName(
        parseGitHubRepository("https://github.com/tester-army/e2e")!,
      ),
      "tester-army/e2e",
    );
  });

  it("accepts trailing slashes, .git suffixes, and nested GitHub paths", () => {
    assert.deepEqual(
      parseGitHubRepository("https://github.com/okwasniewski/minisim/"),
      { owner: "okwasniewski", name: "minisim" },
    );
    assert.deepEqual(
      parseGitHubRepository("https://github.com/okwasniewski/MiniSim.git"),
      { owner: "okwasniewski", name: "MiniSim" },
    );
    assert.deepEqual(
      parseGitHubRepository(
        "https://www.github.com/callstack/react-native-visionos/tree/main",
      ),
      { owner: "callstack", name: "react-native-visionos" },
    );
  });

  it("rejects values that are not a GitHub repository", () => {
    assert.equal(parseGitHubRepository(undefined), null);
    assert.equal(parseGitHubRepository(""), null);
    assert.equal(parseGitHubRepository("https://e2e.com"), null);
    assert.equal(parseGitHubRepository("https://github.com/okwasniewski"), null);
    assert.equal(parseGitHubRepository("https://github.com/topics/react"), null);
    assert.equal(
      parseGitHubRepository("https://gist.github.com/okwasniewski/e2e"),
      null,
    );
    assert.equal(parseGitHubRepository("javascript:alert(1)"), null);
  });
});

describe("portfolio repository mapping", () => {
  it("derives every portfolio repo from its github metadata", async () => {
    const posts = await getPosts({ directory: "portfolio", limit: -1 });
    const actual = Object.fromEntries(
      posts.map((post) => {
        const repository = parseGitHubRepository(post.meta.github);
        return [
          post.slug,
          repository ? formatRepositoryName(repository) : null,
        ];
      }),
    );

    assert.deepEqual(actual, {
      e2e: "tester-army/e2e",
      "expo-icloud-storage": "okwasniewski/expo-icloud-storage",
      "liquid-glass": "callstack/liquid-glass",
      minisim: "okwasniewski/minisim",
      "react-native-bottom-tabs": "callstack/react-native-bottom-tabs",
      "react-native-emoji-popup": "okwasniewski/react-native-emoji-popup",
      "react-native-menubar-extra": "okwasniewski/react-native-menubar-extra",
      "react-native-svg-decoder": "okwasniewski/react-native-svg-decoder",
      "react-native-visionos": "callstack/react-native-visionos",
    });
    assert.equal(posts[0]?.slug, "e2e");
  });
});

describe("readRepositoryStarCount", () => {
  it("preserves a real zero and rejects anything else", () => {
    assert.equal(readRepositoryStarCount({ stargazers_count: 0 }), 0);
    assert.equal(readRepositoryStarCount({ stargazers_count: 13375 }), 13375);
    assert.equal(readRepositoryStarCount({ stargazers_count: "12" }), undefined);
    assert.equal(readRepositoryStarCount({ stargazers_count: 1.5 }), undefined);
    assert.equal(readRepositoryStarCount({ stargazers_count: -1 }), undefined);
    assert.equal(readRepositoryStarCount({}), undefined);
    assert.equal(readRepositoryStarCount(null), undefined);
  });
});

describe("fetchRepositoryStarCount", () => {
  it("returns parsed counts from a 200 response", async () => {
    mockFetch(200, { stargazers_count: 13375 });

    const stars = await fetchRepositoryStarCount({
      owner: "tester-army",
      name: "e2e",
    });

    assert.equal(stars, 13375);
  });

  it("does not turn rate limits, errors, or invalid payloads into zero", async () => {
    const repository = { owner: "tester-army", name: "e2e" };

    mockFetch(403, { message: "rate limit exceeded", stargazers_count: 0 });
    assert.equal(await fetchRepositoryStarCount(repository), undefined);

    mockFetch(429, { stargazers_count: 0 });
    assert.equal(await fetchRepositoryStarCount(repository), undefined);

    mockFetch(404, { message: "Not Found", stargazers_count: 0 });
    assert.equal(await fetchRepositoryStarCount(repository), undefined);

    mockFetch(200, { message: "missing count" });
    assert.equal(await fetchRepositoryStarCount(repository), undefined);

    globalThis.fetch = async () => {
      throw new Error("network down");
    };
    assert.equal(await fetchRepositoryStarCount(repository), undefined);
  });

  it("does not send an authorization header", async () => {
    let authorization: string | null = "present";
    globalThis.fetch = async (_input, init) => {
      const headers = new Headers(init?.headers);
      authorization = headers.get("authorization");
      return Response.json({ stargazers_count: 18 });
    };

    await fetchRepositoryStarCount({
      owner: "okwasniewski",
      name: "react-native-svg-decoder",
    });

    assert.equal(authorization, null);
  });
});

describe("getProjectStarCounts", () => {
  it("skips projects without a GitHub repo and keeps successful counts when another fetch fails", async () => {
    globalThis.fetch = async (input) => {
      const url = String(input);
      if (url.endsWith("/tester-army/e2e")) {
        return Response.json({ stargazers_count: 13375 });
      }
      return new Response(JSON.stringify({ stargazers_count: 0 }), {
        status: 503,
      });
    };

    const counts = await getProjectStarCounts([
      {
        slug: "marketing-only",
        meta: { github: "https://e2e.com" },
      },
      {
        slug: "missing",
        meta: {},
      },
      {
        slug: "e2e",
        meta: { github: "https://github.com/tester-army/e2e" },
      },
      {
        slug: "minisim",
        meta: { github: "https://github.com/okwasniewski/minisim" },
      },
    ]);

    assert.equal(counts.get("e2e"), 13375);
    assert.equal(counts.has("minisim"), false);
    assert.equal(counts.has("marketing-only"), false);
    assert.equal(counts.has("missing"), false);
  });
});

function mockFetch(status: number, payload: unknown) {
  globalThis.fetch = async () =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json" },
    });
}
