import { useState, useEffect } from 'react';

export const useGitHubStats = (username) => {
  const [stats, setStats] = useState({
    publicRepos: 0,
    totalCommits: 0,
    topLanguages: [],
    loading: true,
    error: null,
    isFallback: false
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();

        // Calculate languages
        const languageCount = {};
        reposData.forEach(repo => {
          if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
          }
        });

        // Get top 3 languages
        const topLanguages = Object.entries(languageCount)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([lang]) => lang);

        // Estimate commits (GitHub API doesn't provide total commits easily)
        const estimatedCommits = reposData.length * 15; // Rough estimate

        setStats({
          publicRepos: userData.public_repos || 0,
          totalCommits: estimatedCommits,
          topLanguages,
          loading: false,
          error: null,
          isFallback: false
        });

      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Fallback data if API fails
        setStats({
          publicRepos: 12,
          totalCommits: 180,
          topLanguages: ['JavaScript', 'Python', 'Java'],
          loading: false,
          error: null, // Don't show error, use fallback instead
          isFallback: true
        });
      }
    };

    if (username) {
      fetchGitHubStats();
    }
  }, [username]);

  return stats;
};