import { useState } from 'react';
import { categorizedSkills } from '../data/portfolio';
import { cn } from '../utils/cn';

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filterOptions = [
    { label: 'All Stack', id: 'all' },
    { label: 'Languages', id: 'Programming Languages' },
    { label: 'Backend', id: 'Backend' },
    { label: 'Frontend', id: 'Frontend' },
    { label: 'Databases', id: 'Databases' },
    { label: 'Analytics', id: 'Data Analytics' },
    { label: 'AI / ML', id: 'AI / Machine Learning' },
    { label: 'Cloud', id: 'Cloud' },
    { label: 'Tools', id: 'Tools & Version Control' }
  ];

  const displayedCategories = activeCategory === 'all'
    ? categorizedSkills
    : categorizedSkills.filter(c => c.category === activeCategory);

  return (
    <section id="skills" className="scroll-mt-20 py-20 lg:py-28 border-t border-black/10 dark:border-white/10 bg-[#edf5ff] dark:bg-[#070b12] text-[#0e1111] dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 dark:text-white/45 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0e1111] dark:bg-white/40" />
            <span>03 / SKILLS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0e1111] dark:text-white">
            Skills & Technical Toolkit
          </h2>
          <p className="font-display text-sm sm:text-base text-[#0e1111]/70 dark:text-white/60 mt-3 max-w-2xl font-light">
            Core competencies organized across backend architecture, databases, AI/ML pipelines, and engineering workflows.
          </p>
        </div>

        {/* Filter Pills */}
        <div role="tablist" aria-label="Skills filtering options" className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap gap-2 mb-10 -mx-6 px-6 sm:mx-0 sm:px-0">
          {filterOptions.map((filter) => {
            const isActive = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(filter.id)}
                className={cn(
                  'px-4 py-2 rounded-full font-technical text-xs uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 cursor-pointer whitespace-nowrap flex-shrink-0 sm:flex-shrink',
                  isActive
                    ? 'bg-[#0e1111] dark:bg-[#4f9cf9] text-white font-semibold shadow-sm dark:shadow-[#4f9cf9]/30'
                    : 'bg-white dark:bg-[#0d1421] text-[#0e1111]/70 dark:text-white/60 hover:text-[#0e1111] dark:hover:text-white border border-black/10 dark:border-white/10 hover:bg-[#edf5ff] dark:hover:bg-white/10'
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCategories.map((cat) => (
            <div
              key={cat.category}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0d1421] border border-black/10 dark:border-white/10 shadow-sm text-left flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-black/20 dark:hover:border-white/20"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10 dark:border-white/10">
                  <h3 className="font-display text-lg font-bold text-[#0e1111] dark:text-white">
                    {cat.category}
                  </h3>
                  <span className="font-technical text-[10px] uppercase text-[#0e1111]/50 dark:text-white/40 font-semibold">
                    {cat.skills.length} skills
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-[#edf5ff] dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.07] hover:border-black/15 dark:hover:border-white/20 transition-colors"
                    >
                      <div className="font-display text-sm font-bold text-[#0e1111] dark:text-white">
                        {skill.name}
                      </div>
                      <div className="font-display text-[11px] text-[#0e1111]/70 dark:text-white/55 mt-1 font-light leading-snug">
                        {skill.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
