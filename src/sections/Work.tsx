import { Experience } from './Experience';
import { Projects } from './Projects';

interface WorkProps {
  onSelectProject: (id: string) => void;
}

export const Work = ({ onSelectProject }: WorkProps) => {
  return (
    <section id="work" className="scroll-mt-20 py-20 lg:py-28 border-t border-black/10 dark:border-white/10 bg-[#edf5ff] dark:bg-[#070b12] text-[#0e1111] dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 dark:text-white/45 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0e1111] dark:bg-white/40" />
            <span>02 / WORK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0e1111] dark:text-white">
            Experience & Projects
          </h2>
          <p className="font-display text-sm sm:text-base text-[#0e1111]/70 dark:text-white/60 mt-3 max-w-2xl font-light">
            Professional industry internship deliverables alongside full-stack & AI/ML software architectures.
          </p>
        </div>

        {/* 1. Professional Experience */}
        <Experience />

        {/* 2. Featured Projects */}
        <div className="pt-10 border-t border-black/10 dark:border-white/10">
          <Projects onSelectProject={onSelectProject} />
        </div>

      </div>
    </section>
  );
};
