const BASE = 'https://api.github.com';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN ?? '';

const headers = {
  Accept: 'application/vnd.github+json',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

function parseRepoUrl(url) {
  const match = url?.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/);
  return match ? { owner: match[1], repo: match[2] } : null;
}

async function fetchContributorStats(owner, repo, retries = 3) {
  const url = `${BASE}/repos/${owner}/${repo}/stats/contributors`;
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, { headers });
    if (res.status === 202) { await new Promise((r) => setTimeout(r, 2000)); continue; }
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
    return res.json();
  }
  return [];
}

export async function fetchRepoProgress(repoUrl, target = 100) {
  const parsed = parseRepoUrl(repoUrl);
  if (!parsed) throw new Error('Invalid or non-GitHub repository URL.');

  const stats = await fetchContributorStats(parsed.owner, parsed.repo);
  if (!stats?.length) return { totalCommits: 0, overallProgress: 0, collaborators: [] };

  const totalCommits = stats.reduce((sum, c) => sum + (c.total ?? 0), 0);
  const overallProgress = Math.min(100, Math.round((totalCommits / target) * 100));

  const collaborators = stats
    .map((c) => ({
      login: c.author?.login ?? 'unknown',
      avatar: c.author?.avatar_url ?? '',
      commits: c.total ?? 0,
      percentage: totalCommits > 0 ? Math.round(((c.total ?? 0) / totalCommits) * 100) : 0,
    }))
    .sort((a, b) => b.commits - a.commits);

  return { totalCommits, overallProgress, collaborators };
}
