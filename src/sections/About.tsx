import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Terminal, Layers, Cpu, Database, Sparkles, Cloud, ArrowUpRight, FileDown } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio';
import { cn } from '../utils/cn';

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

export const About = () => {
  const [activeCategory, setActiveCategory] = useState<string>('backend');

  const profileCategories = [
    {
      id: 'backend',
      name: 'Backend Architecture',
      icon: <Terminal size={15} />,
      tags: ['Python', 'FastAPI', 'Django', 'Flask', 'REST APIs'],
      points: [
        'Architecting structured, scalable server-side application layers with clean endpoints.',
        'Implementing secure JWT and role-based access control authentication middleware.',
        'Developing performant CRUD operations with transactional boundary integrity.'
      ]
    },
    {
      id: 'fullstack',
      name: 'Full Stack Development',
      icon: <Layers size={15} />,
      tags: ['React', 'TypeScript', 'Node.js', 'Express.js', 'HTML/CSS'],
      points: [
        'Developing responsive, intuitive browser client user interfaces.',
        'Integrating client-side state hooks with backend REST APIs.',
        'Ensuring cross-device compatibility from desktop to mobile screens.'
      ]
    },
    {
      id: 'aiml',
      name: 'AI / Machine Learning',
      icon: <Cpu size={15} />,
      tags: ['Scikit-learn', 'YOLO', 'OpenCV', 'OpenAI API', 'Pandas'],
      points: [
        'Building predictive classification models using Scikit-learn Random Forests.',
        'Constructing computer vision pipelines with OpenCV and YOLO object detection.',
        'Integrating LLM and generative AI APIs for smart workflow automation.'
      ]
    },
    {
      id: 'databases',
      name: 'Databases & Storage',
      icon: <Database size={15} />,
      tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Mongoose'],
      points: [
        'Designing relational structures, normalized tables, and MongoDB document collections.',
        'Optimizing queries, indexing keys, and accelerating data access speeds.',
        'Managing schema migrations and persistent application state storage.'
      ]
    },
    {
      id: 'testing',
      name: 'Testing & Reliability',
      icon: <Sparkles size={15} />,
      tags: ['Software Testing', 'Unit Tests', 'API Validation', 'Debugging'],
      points: [
        'Writing structured test scripts to verify router boundaries and logic flows.',
        'Debugging edge cases, transaction race conditions, and error boundaries.',
        'Promoting stable, verified releases across software lifecycles.'
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud & Tooling',
      icon: <Cloud size={15} />,
      tags: ['Git & GitHub', 'Docker', 'AWS Services', 'Linux'],
      points: [
        'Managing distributed version control workflows with Git and GitHub.',
        'Containerizing application setups with Docker for reproducible builds.',
        'Deploying and configuring virtual servers and cloud databases.'
      ]
    }
  ];

  const currentCategoryData = profileCategories.find(c => c.id === activeCategory) || profileCategories[0];

  return (
    <section id="about" className="scroll-mt-20 py-20 lg:py-28 border-t border-black/10 dark:border-white/10 bg-[#edf5ff] dark:bg-[#070b12] text-[#0e1111] dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 dark:text-white/45 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0e1111] dark:bg-white/40" />
            <span>01 / ABOUT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0e1111] dark:text-white">
            Developer Profile & Summary
          </h2>
          <p className="font-display text-sm sm:text-base text-[#0e1111]/70 dark:text-white/60 mt-3 max-w-2xl font-light">
            Engineering robust backend services, secure registry portals, and intelligent AI/ML pipelines with clean architecture.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Summary & Developer Bio */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0d1421] border border-black/10 dark:border-white/10 shadow-sm transition-colors duration-300">
              <h3 className="font-display text-xl font-bold text-[#0e1111] dark:text-white mb-1">
                {personalInfo.name}
              </h3>
              <p className="font-technical text-xs uppercase tracking-wider text-[#0e1111]/60 dark:text-white/50 mb-5">
                {personalInfo.title}
              </p>
              
              <div className="space-y-4 text-xs sm:text-sm text-[#0e1111]/85 dark:text-white/75 leading-relaxed font-display font-light">
                <p>
                  {personalInfo.bio}
                </p>
                <p>
                  I am currently pursuing my Bachelor of Engineering (BE) in Information Science and Engineering at Sri Siddhartha Institute of Technology (2023–Present). My passion centers on building practical, scalable systems—from high-throughput REST APIs and database layers to computer vision surveillance and clinical decision support systems.
                </p>
              </div>

              {/* Social and Contact Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mt-6 pt-6 border-t border-black/10 dark:border-white/10 font-technical text-xs">
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#edf5ff] dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 text-[#0e1111] dark:text-white transition-colors"
                >
                  <Mail size={14} className="text-[#0e1111]/70 dark:text-white/60 flex-shrink-0" />
                  <span className="truncate">{personalInfo.email}</span>
                </a>
                <a 
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} 
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#edf5ff] dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 text-[#0e1111] dark:text-white transition-colors"
                >
                  <Phone size={14} className="text-[#0e1111]/70 dark:text-white/60 flex-shrink-0" />
                  <span>{personalInfo.phone}</span>
                </a>
                <a 
                  href={socialLinks.find(s => s.platform === 'LinkedIn')?.url || '#'} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#edf5ff] dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 text-[#0e1111] dark:text-white transition-colors"
                >
                  <LinkedinIcon />
                  <span className="truncate">LinkedIn Profile</span>
                  <ArrowUpRight size={12} className="ml-auto opacity-50 dark:opacity-40 flex-shrink-0" />
                </a>
                <a 
                  href={socialLinks.find(s => s.platform === 'GitHub')?.url || '#'} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#edf5ff] dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 text-[#0e1111] dark:text-white transition-colors"
                >
                  <GithubIcon />
                  <span className="truncate">GitHub Repositories</span>
                  <ArrowUpRight size={12} className="ml-auto opacity-50 dark:opacity-40 flex-shrink-0" />
                </a>
              </div>

              {/* Download Resume Button */}
              <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 font-technical text-xs text-[#0e1111]/60 dark:text-white/45">
                  <MapPin size={13} />
                  <span>{personalInfo.location}</span>
                </div>
                <a 
                  href={personalInfo.resumeUrl} 
                  download="Manoj_Gowda_CD_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0e1111] dark:bg-white text-white dark:text-[#070b12] hover:bg-[#0e1111]/90 dark:hover:bg-white/90 font-technical text-xs uppercase tracking-wider transition-all duration-200 font-bold shadow-sm"
                >
                  <FileDown size={13} />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Skill Focus Matrix */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0d1421] border border-black/10 dark:border-white/10 shadow-sm h-full flex flex-col justify-between transition-colors duration-300">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/10 dark:border-white/10">
                  <span className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 dark:text-white/50 font-semibold">
                    Core Technical Domains
                  </span>
                  <span className="font-technical text-[10px] uppercase tracking-wider text-[#0e1111]/60 dark:text-white/40 px-2 py-0.5 rounded-full bg-[#edf5ff] dark:bg-white/[0.06] border border-black/5 dark:border-white/10">
                    Interactive
                  </span>
                </div>

                {/* Category Pills Tablist */}
                <div role="tablist" aria-label="Technical domain focus areas" className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap gap-2 mb-6 -mx-5 px-5 sm:mx-0 sm:px-0">
                  {profileCategories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                          'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-technical text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap flex-shrink-0 sm:flex-shrink cursor-pointer',
                          isActive
                            ? 'bg-[#0e1111] dark:bg-[#4f9cf9] text-white font-semibold shadow-sm dark:shadow-[#4f9cf9]/30'
                            : 'bg-[#edf5ff] dark:bg-white/[0.06] text-[#0e1111]/70 dark:text-white/55 hover:text-[#0e1111] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/12'
                        )}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Panel Content */}
                <div className="min-h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="font-display text-base font-bold text-[#0e1111] dark:text-white">
                          {currentCategoryData.name}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {currentCategoryData.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="font-technical text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-[#edf5ff] dark:bg-white/[0.07] text-[#0e1111] dark:text-white/75 border border-black/5 dark:border-white/[0.08] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <ul className="space-y-2.5 pt-2 font-display text-xs sm:text-sm text-[#0e1111]/80 dark:text-white/70 leading-relaxed font-light">
                        {currentCategoryData.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0e1111] dark:bg-[#4f9cf9] mt-2 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom badge */}
              <div className="pt-4 mt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-technical text-[#0e1111]/60 dark:text-white/40">
                <span>Domain specialization</span>
                <span>Active 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
