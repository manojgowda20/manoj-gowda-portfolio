import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GitFork, Star, ExternalLink, RefreshCw, BookOpen } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

interface GithubProfile {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  homepage: string | null;
}

// Fallback repo data based strictly on your three resume projects (no invented info)
const FALLBACK_REPOS: Repository[] = [
  {
    id: 1,
    name: "ICU-Monitoring-Dashboard",
    description: "AI-Powered ICU deterioration risk prediction and physiological vital-sign monitoring decision support system.",
    html_url: "https://github.com/manojgowda20",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    homepage: null
  },
  {
    id: 2,
    name: "Land-Registration-Portal",
    description: "Full-Stack web registry application managing secure title deed property registration and ownership transfers.",
    html_url: "https://github.com/manojgowda20",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    homepage: null
  },
  {
    id: 3,
    name: "Smart-AI-Security-Monitor",
    description: "Surveillance video object detection, centroid tracking, and suspicious activity logs parsing solution.",
    html_url: "https://github.com/manojgowda20",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    homepage: null
  }
];

export const Github = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const username = "manojgowda20";
  const shouldReduceMotion = useReducedMotion();

  const fetchGithubData = async () => {
    setLoading(true);
    setError(false);
    try {
      // 1. Fetch public profile metadata
      const profileRes = await fetch(`https://api.github.com/users/${username}`);
      if (!profileRes.ok) throw new Error("Profile fetch failed");
      const profileData = await profileRes.json();
      
      // 2. Fetch public repository details
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (!reposRes.ok) throw new Error("Repos fetch failed");
      const reposData = await reposRes.json();

      setProfile({
        avatar_url: profileData.avatar_url,
        name: profileData.name || "Manoj Gowda CD",
        login: profileData.login,
        bio: profileData.bio || "Full-Stack Developer & Python Backend Developer",
        public_repos: profileData.public_repos,
        followers: profileData.followers,
        html_url: profileData.html_url
      });

      // Filter out fork repositories to show only original works
      const originalRepos = reposData
        .filter((repo: any) => !repo.fork)
        .map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          homepage: repo.homepage
        }));

      setRepos(originalRepos.length > 0 ? originalRepos : FALLBACK_REPOS);
    } catch (e) {
      console.warn("GitHub API rate limit exceeded or network failure, falling back to static presentation.");
      setError(true);
      // Populate fallback mock structures derived solely from your project portfolio
      setRepos(FALLBACK_REPOS);
      setProfile({
        avatar_url: "/src/assets/profile.jpg",
        name: "Manoj Gowda CD",
        login: username,
        bio: "Full-Stack Developer | Python Backend Developer",
        public_repos: 3,
        followers: 0,
        html_url: `https://github.com/${username}`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  return (
    <section 
      id="github" 
      className="relative py-20 lg:py-28 overflow-hidden border-t border-border/20"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Open Source"
          title="GitHub Integration"
          subtitle="Dynamic activity logging and source repositories fetched directly from the GitHub API."
          align="center"
        />

        {loading ? (
          /* Loading Skeletons */
          <div className="max-w-4xl mx-auto mt-12 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-border/40 bg-surface/5 h-28 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl border border-border/40 bg-surface/5 h-36 animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mt-12 space-y-6 text-left">
            
            {/* Error fallback alert banner */}
            {error && (
              <div className="p-3.5 rounded-xl border border-amber-500/25 bg-amber-500/5 text-amber-200 text-xs font-mono flex items-center justify-between gap-4">
                <span>⚠️ GitHub API rate limit reached or network restricted. Presenting static resume repositories.</span>
                <button 
                  onClick={fetchGithubData} 
                  className="flex items-center gap-1 text-white hover:text-accent-cyan transition-colors"
                >
                  <RefreshCw size={12} className="animate-spin" />
                  <span>Retry</span>
                </button>
              </div>
            )}

            {/* Profile Summary Card */}
            {profile && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
                className="glass-panel p-6 rounded-2xl border border-border/40 bg-surface/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glass"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <img 
                    src={profile.avatar_url} 
                    alt="GitHub Avatar" 
                    className="w-14 h-14 rounded-full border border-border/80 object-cover bg-background-deep"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = "/src/assets/profile.jpg";
                    }}
                  />
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{profile.name}</h3>
                    <span className="text-[11px] font-mono text-accent-cyan">@{profile.login}</span>
                    <p className="text-xs text-text-muted mt-1 font-light leading-normal">{profile.bio}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-center sm:text-right border-t sm:border-t-0 border-border/20 pt-4 sm:pt-0 w-full sm:w-auto justify-around sm:justify-end">
                  <div className="text-left font-mono">
                    <span className="text-[9px] text-text-muted block uppercase">Public Repos</span>
                    <span className="text-lg font-bold text-white">{profile.public_repos}</span>
                  </div>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-transparent bg-gradient-to-r from-accent-blue/15 to-accent-cyan/15 border-accent-cyan/35 text-white text-xs font-semibold hover:brightness-110 shadow-glass-glow transition-all"
                  >
                    <span>View GitHub Profile</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            )}

            {/* Repositories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo, idx) => (
                <motion.div
                  key={repo.id}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: idx * 0.08 }}
                  className="group"
                >
                  <div className="glass-panel p-5 rounded-2xl border border-border/40 bg-surface/10 hover:bg-surface-hover/10 hover:border-white/20 -translate-y-0 hover:-translate-y-1 transition-all duration-300 shadow-glass flex flex-col justify-between h-full">
                    
                    <div>
                      {/* Title */}
                      <h4 className="text-sm font-bold text-white tracking-tight leading-tight group-hover:text-accent-cyan transition-colors duration-200 flex items-center gap-2">
                        <BookOpen size={13} className="text-text-muted" />
                        <span>{repo.name}</span>
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-text-secondary mt-2.5 leading-relaxed font-light min-h-[42px] line-clamp-3">
                        {repo.description || "Source codebase repository representing active development."}
                      </p>
                    </div>

                    {/* Bottom Metadata row */}
                    <div className="mt-5 pt-3 border-t border-border/20 flex items-center justify-between text-[10px] text-text-muted">
                      <div className="flex items-center gap-3">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                            <span className="font-mono">{repo.language}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-0.5">
                          <Star size={11} className="text-amber-500" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-0.5">
                          <GitFork size={11} className="text-text-muted" />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cyan hover:text-white inline-flex items-center gap-0.5 transition-colors font-medium text-[9px] uppercase tracking-wide font-mono"
                        aria-label={`View code repository for ${repo.name}`}
                      >
                        <span>Code</span>
                        <ExternalLink size={9} />
                      </a>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
