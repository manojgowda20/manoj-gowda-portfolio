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
    <section id="skills" className="py-20 lg:py-28 border-t border-[#0e1111]/10 bg-[#edf5ff] text-[#0e1111]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0e1111]" />
            <span>03 / SKILLS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0e1111]">
            Skills & Technical Toolkit
          </h2>
          <p className="font-display text-sm sm:text-base text-[#0e1111]/70 mt-3 max-w-2xl font-light">
            Core competencies organized across backend architecture, databases, AI/ML pipelines, and engineering workflows.
          </p>
        </div>

        {/* Filter Pills */}
        <div role="tablist" aria-label="Skills filtering options" className="flex flex-wrap gap-2 mb-10">
          {filterOptions.map((filter) => {
            const isActive = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(filter.id)}
                className={cn(
                  'px-4 py-2 rounded-full font-technical text-xs uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 cursor-pointer',
                  isActive
                    ? 'bg-[#0e1111] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#0e1111]/70 hover:text-[#0e1111] border border-black/10 hover:bg-[#edf5ff]'
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
              className="p-6 sm:p-7 rounded-2xl bg-white border border-black/10 shadow-sm text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#0e1111]/10">
                  <h3 className="font-display text-lg font-bold text-[#0e1111]">
                    {cat.category}
                  </h3>
                  <span className="font-technical text-[10px] uppercase text-[#0e1111]/50 font-semibold">
                    {cat.skills.length} skills
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-[#edf5ff] border border-black/5 hover:border-black/15 transition-colors"
                    >
                      <div className="font-display text-sm font-bold text-[#0e1111]">
                        {skill.name}
                      </div>
                      <div className="font-display text-[11px] text-[#0e1111]/70 mt-1 font-light leading-snug">
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
