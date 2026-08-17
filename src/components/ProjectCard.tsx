import { ExternalLink, FolderOpen } from 'lucide-react';
import { GlassCard } from './GlassCard';
import type { Project } from '../data/portfolio';

interface ProjectCardProps {
  project: Project;
}

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, tags, image, githubUrl, liveUrl } = project;

  return (
    <GlassCard hoverable={true} className="flex flex-col h-full border border-border/40 bg-surface/30">
      {/* Project Thumbnail Image */}
      {image ? (
        <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-5 bg-background-deep border border-border/20 group">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-base/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-xs font-semibold text-white tracking-wide">View Project</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full aspect-video rounded-lg mb-5 bg-background-deep border border-border/20 text-text-muted">
          <FolderOpen size={40} className="stroke-[1.2] opacity-40 text-accent-cyan" />
        </div>
      )}

      {/* Tags / Categories */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold font-mono tracking-wider text-accent-cyan/80 bg-accent-cyan/5 px-2.5 py-1 rounded-full border border-accent-cyan/10"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Details */}
      <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-accent-cyan transition-colors">
        {title}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* CTA Links */}
      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-white transition-colors duration-200"
          >
            <GithubIcon size={15} />
            <span>Code</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-cyan hover:text-accent-cyan/80 transition-colors duration-200"
          >
            <ExternalLink size={15} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </GlassCard>
  );
};
