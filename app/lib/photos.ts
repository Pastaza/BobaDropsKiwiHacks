export type GitHubIssue = {
  id: number;
  number: number;
  title: string;
  html_url: string;
  body: string | null;
  created_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  pull_request?: unknown;
};

export type PhotoThread = {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  authorLogin: string;
  authorUrl: string;
  body: string;
  imageUrl?: string;
};

function firstImageUrl(markdown: string): string | undefined {
  // 1) Markdown image: ![alt](url)
  {
    const m = markdown.match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/i);
    if (m?.[1]) return m[1];
  }

  // 2) Raw image URL with common extensions
  {
    const m = markdown.match(/https?:\/\/\S+\.(?:png|jpe?g|webp|gif)(?:\?\S+)?/i);
    if (m?.[0]) return m[0];
  }

  // 3) GitHub "user-attachments" URLs often have no file extension
  {
    const m = markdown.match(/https?:\/\/github\.com\/user-attachments\/assets\/\S+/i);
    if (m?.[0]) return m[0];
  }

  // 4) Older GitHub issue uploads
  {
    const m = markdown.match(/https?:\/\/user-images\.githubusercontent\.com\/\S+/i);
    if (m?.[0]) return m[0];
  }

  return undefined;
}

export async function getPhotoThreads(): Promise<PhotoThread[]> {
  const repo = process.env.PHOTO_THREADS_REPO ?? "Pastaza/BobaDropsKiwiHacks";
  const label = process.env.PHOTO_THREADS_LABEL ?? "cloud-photo";

  const url = new URL(`https://api.github.com/repos/${repo}/issues`);
  url.searchParams.set("labels", label);
  url.searchParams.set("state", "open");
  url.searchParams.set("per_page", "30");
  url.searchParams.set("sort", "created");
  url.searchParams.set("direction", "desc");

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json"
  };

  // Optional: improves rate limits on server.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 600 }
  });

  if (!res.ok) {
    // Fail soft: this is a community enhancement, not core functionality.
    return [];
  }

  const issues = (await res.json()) as GitHubIssue[];

  return issues
    .filter((i) => !i.pull_request)
    .map((i) => {
      const body = i.body ?? "";
      return {
        id: i.id,
        title: i.title,
        url: i.html_url,
        createdAt: i.created_at,
        authorLogin: i.user.login,
        authorUrl: i.user.html_url,
        body,
        imageUrl: firstImageUrl(body)
      };
    });
}
