import { Calendar, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data/portfolio';

export const Experience = () => {
  return (
    <div className="mb-20">
      <div className="flex flex-col items-start mb-10">
        <div className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 dark:text-white/45 mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0e1111] dark:bg-white/40" />
          <span>EXPERIENCE</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0e1111] dark:text-white">
          Industry Internship Experience
        </h3>
        <p className="font-display text-sm text-[#0e1111]/70 dark:text-white/60 mt-1.5 font-light">
          Hands-on software development, REST API engineering, and data analytics.
        </p>
      </div>

      <div className="space-y-8">
        {experienceData.map((exp) => (
          <div 
            key={exp.id} 
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0d1421] border border-black/10 dark:border-white/10 shadow-sm text-left transition-all duration-300 hover:shadow-md hover:border-black/20 dark:hover:border-white/20"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/10 dark:border-white/10 mb-6">
              <div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#0e1111] dark:text-white flex items-center gap-2">
                  <Briefcase size={18} className="text-[#2563eb] dark:text-[#4f9cf9]" />
                  <span>{exp.company}</span>
                </h4>
                <p className="font-technical text-xs uppercase tracking-wider text-[#0e1111]/70 dark:text-white/55 mt-1 font-semibold">
                  {exp.role}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#edf5ff] dark:bg-white/[0.07] border border-black/5 dark:border-white/[0.08] font-technical text-xs text-[#0e1111]/80 dark:text-white/65 font-medium self-start sm:self-center">
                <Calendar size={12} />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Responsibilities list */}
            <div className="mb-6">
              <span className="font-technical text-[10px] uppercase tracking-widest text-[#0e1111]/50 dark:text-white/40 block mb-3 font-semibold">
                Key Responsibilities & Deliverables
              </span>
              <ul className="space-y-2.5 font-display text-xs sm:text-sm text-[#0e1111]/80 dark:text-white/70 leading-relaxed font-light">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <ChevronRight size={14} className="mt-1 text-[#2563eb] dark:text-[#4f9cf9] flex-shrink-0 opacity-80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            {exp.achievements && exp.achievements.length > 0 && (
              <div className="mb-6 pt-5 border-t border-black/10 dark:border-white/10">
                <span className="font-technical text-[10px] uppercase tracking-widest text-[#0e1111]/50 dark:text-white/40 block mb-3 font-semibold">
                  Key Achievements
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-[#edf5ff] dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.07] text-xs text-[#0e1111]/80 dark:text-white/70 font-light font-display">
                      <CheckCircle2 size={14} className="mt-0.5 text-[#2563eb] dark:text-[#4f9cf9] flex-shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack tags */}
            {exp.tags && (
              <div className="pt-5 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-1.5">
                <span className="font-technical text-[10px] uppercase tracking-widest text-[#0e1111]/50 dark:text-white/40 mr-2 font-semibold">
                  Technologies:
                </span>
                {exp.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="font-technical text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#edf5ff] dark:bg-white/[0.07] text-[#0e1111] dark:text-white/65 border border-black/5 dark:border-white/[0.08] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
