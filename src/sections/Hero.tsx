import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { Button } from '../components/Button';
import { personalInfo, socialLinks } from '../data/portfolio';

const TechCanvas = lazy(() => import('../components/TechCanvas').then(m => ({ default: m.TechCanvas })));

// Custom inline brand SVG components to replace missing Lucide brand icons
const GithubIcon = () => (
  <svg 
    className="w-4 h-4" 
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

const LinkedinIcon = () => (
  <svg 
    className="w-4 h-4" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Hero = () => {
  const techLabels = [
    "Python", "FastAPI", "Django", "Node.js", "REST APIs",
    "SQL", "MongoDB", "AWS", "Docker", "AI/ML"
  ];

  // Framer motion variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] as any }
    }
  };

  const visualVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' as any, delay: 0.4 }
    }
  };

  const getSocialLink = (platform: string) => {
    const found = socialLinks.find(s => s.platform.toLowerCase() === platform.toLowerCase());
    return found ? found.url : '#';
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-80px)] flex items-center py-12 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* Left Column: Typographic Details */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-left flex flex-col justify-center"
        >
          {/* Subtitle Positioning Roles */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 mb-5">
            {personalInfo.positioning.map((role) => (
              <span 
                key={role} 
                className="text-xs font-mono font-bold tracking-wider text-accent-cyan px-3 py-1 rounded bg-accent-cyan/5 border border-accent-cyan/15 uppercase"
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Developer Name */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Description copy */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mb-8 font-light"
          >
            Building web applications, REST APIs, database-driven systems and intelligent AI-powered solutions.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
            <Button 
              variant="glow" 
              icon={<ArrowRight size={15} />} 
              iconPosition="right"
              onClick={handleScrollToProjects}
              data-magnetic="true"
            >
              View Projects
            </Button>
            <a href={personalInfo.resumeUrl} download="Manoj_Gowda_CD_Resume.pdf" className="inline-block" data-magnetic="true">
              <Button 
                variant="secondary" 
                icon={<Download size={15} />}
              >
                Download Resume
              </Button>
            </a>
          </motion.div>

          {/* Social icons row */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3.5 mb-10 pb-6 border-b border-border/30 max-w-md"
          >
            <a
              href={getSocialLink('GitHub')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg text-text-muted hover:text-white border border-border/40 hover:border-text-primary/30 bg-surface-base/10 hover:bg-surface-hover/20 transition-all duration-200"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
            <a
              href={getSocialLink('LinkedIn')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg text-text-muted hover:text-white border border-border/40 hover:border-text-primary/30 bg-surface-base/10 hover:bg-surface-hover/20 transition-all duration-200"
            >
              <LinkedinIcon />
              <span>LinkedIn</span>
            </a>
            <a
              href={personalInfo.email ? `mailto:${personalInfo.email}` : '#contact'}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg text-text-muted hover:text-white border border-border/40 hover:border-text-primary/30 bg-surface-base/10 hover:bg-surface-hover/20 transition-all duration-200"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </motion.div>

          {/* Technology stack labels */}
          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-bold font-mono tracking-widest text-text-muted uppercase block mb-3.5">
              Core Technologies
            </span>
            <div className="flex flex-wrap gap-2 max-w-xl">
              {techLabels.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border/60 bg-surface-card/10 text-text-secondary hover:text-white hover:border-border-glow transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Advanced 3D Network visual */}
        <motion.div 
          variants={visualVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 h-[350px] lg:h-[500px] w-full relative z-10 flex items-center justify-center"
        >
          {/* Visual gradient backdrop */}
          <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full bg-gradient-to-tr from-accent-cyan/15 to-accent-purple/10 filter blur-[40px] -z-10 animate-pulse-slow" />
          
          <Suspense fallback={
            <div className="w-[180px] h-[180px] rounded-full border border-border/40 bg-surface/10 flex flex-col items-center justify-center text-center shadow-glass backdrop-blur-sm animate-pulse">
              <span className="text-[10px] font-bold font-mono text-accent-cyan uppercase tracking-wider">Loading System</span>
              <span className="text-[8px] text-text-muted mt-1 font-mono">Initializing 3D Matrix...</span>
            </div>
          }>
            <TechCanvas />
          </Suspense>
        </motion.div>

      </div>
    </section>
  );
};
