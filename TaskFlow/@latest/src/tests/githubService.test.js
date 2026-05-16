import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchRepoProgress } from '../services/githubService';

describe('githubService', () => {

  describe('fetchRepoProgress — invalid URL', () => {
    it('throws for a non-GitHub URL', async () => {
      await expect(fetchRepoProgress('https://gitlab.com/owner/repo')).rejects.toThrow(
        'Invalid or non-GitHub repository URL.'
      );
    });

    it('throws for an empty string', async () => {
      await expect(fetchRepoProgress('')).rejects.toThrow(
        'Invalid or non-GitHub repository URL.'
      );
    });
  });

  describe('fetchRepoProgress — mocked API', () => {
    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn());
    });

    it('returns zero progress when stats are empty', async () => {
      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [],
        headers: { get: () => null },
      });

      const result = await fetchRepoProgress('https://github.com/owner/repo');
      expect(result).toEqual({ totalCommits: 0, overallProgress: 0, collaborators: [] });
    });

    it('calculates correct totals and percentages', async () => {
      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [
          { total: 60, author: { login: 'alice', avatar_url: 'https://avatar/alice' } },
          { total: 40, author: { login: 'bob',   avatar_url: 'https://avatar/bob'   } },
        ],
        headers: { get: () => null },
      });

      const result = await fetchRepoProgress('https://github.com/owner/repo', 100);
      expect(result.totalCommits).toBe(100);
      expect(result.overallProgress).toBe(100);
      expect(result.collaborators[0].login).toBe('alice');
      expect(result.collaborators[0].percentage).toBe(60);
      expect(result.collaborators[1].percentage).toBe(40);
    });

    it('caps overallProgress at 100', async () => {
      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [
          { total: 200, author: { login: 'alice', avatar_url: '' } },
        ],
        headers: { get: () => null },
      });

      const result = await fetchRepoProgress('https://github.com/owner/repo', 100);
      expect(result.overallProgress).toBe(100);
    });

    it('sorts collaborators by commits descending', async () => {
      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [
          { total: 10, author: { login: 'bob',   avatar_url: '' } },
          { total: 50, author: { login: 'alice', avatar_url: '' } },
        ],
        headers: { get: () => null },
      });

      const result = await fetchRepoProgress('https://github.com/owner/repo');
      expect(result.collaborators[0].login).toBe('alice');
      expect(result.collaborators[1].login).toBe('bob');
    });
  });
});
