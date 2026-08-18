import { ArrowUp, Mail, Phone } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio';

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-black/10 dark:border-white/[0.08] bg-[#edf5ff] dark:bg-[#070b12] text-[#0e1111] dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-technical text-sm font-bold uppercase tracking-tight text-[#0e1111] dark:text-white">
            {personalInfo.name}
          </span>
          <span className="font-display text-xs text-[#0e1111]/60 dark:text-white/45 mt-1 font-light">
            Full-Stack Developer & Python Backend Engineer
          </span>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-4">
          <a
            href={socialLinks.find(s => s.platform === 'GitHub')?.url || '#'}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-white dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-[#0e1111] dark:text-white hover:bg-[#edf5ff] dark:hover:bg-white/15 transition-colors shadow-2xs dark:shadow-none"
            aria-label="GitHub Profile"
          >
            <GithubIcon />
          </a>
          <a
            href={socialLinks.find(s => s.platform === 'LinkedIn')?.url || '#'}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-white dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-[#0e1111] dark:text-white hover:bg-[#edf5ff] dark:hover:bg-white/15 transition-colors shadow-2xs dark:shadow-none"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2 rounded-full bg-white dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-[#0e1111] dark:text-white hover:bg-[#edf5ff] dark:hover:bg-white/15 transition-colors shadow-2xs dark:shadow-none"
            aria-label="Send Email"
          >
            <Mail size={16} />
          </a>
          <a
            href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
            className="p-2 rounded-full bg-white dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-[#0e1111] dark:text-white hover:bg-[#edf5ff] dark:hover:bg-white/15 transition-colors shadow-2xs dark:shadow-none"
            aria-label="Call Phone"
          >
            <Phone size={16} />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.06] border border-black/10 dark:border-white/10 hover:bg-[#edf5ff] dark:hover:bg-white/15 font-technical text-xs uppercase tracking-wider text-[#0e1111] dark:text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 cursor-pointer shadow-sm"
        >
          <span>Back to Top</span>
          <ArrowUp size={13} />
        </button>

      </div>
    </footer>
  );
};
