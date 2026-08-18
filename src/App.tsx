import { useState, useEffect, useRef } from 'react';
import { GlassHero } from './components/GlassHero';
import { Navbar } from './components/Navbar';
import { About } from './sections/About';
import { Work } from './sections/Work';
import { Skills } from './sections/Skills';
import { Education } from './sections/Education';
import { Footer } from './components/Footer';
import { ProjectDetails } from './components/ProjectDetails';
import { CustomCursor } from './components/CustomCursor';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  // Track which section to scroll to after closing project view
  const pendingScrollTarget = useRef<string | null>(null);

  // After project view unmounts and main page mounts, execute pending scroll
  useEffect(() => {
    if (!selectedProjectId && pendingScrollTarget.current) {
      const target = pendingScrollTarget.current;
      pendingScrollTarget.current = null;
      // Give the main page DOM time to mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(target);
          if (el) {
            const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
          }
        });
      });
    }
  }, [selectedProjectId]);

  // Handle URL hash changes for deep linking to sections or projects
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash.startsWith('project-')) {
        setSelectedProjectId(hash);
        window.scrollTo({ top: 0, behavior: 'instant' as any });
      } else if (['about', 'work', 'skills', 'education'].includes(hash)) {
        setSelectedProjectId(null);
        pendingScrollTarget.current = hash;
      } else if (hash === '' || hash === 'home') {
        setSelectedProjectId(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // IntersectionObserver to track the active section during scrolling
  useEffect(() => {
    if (selectedProjectId) return;

    const sectionIds = ['home', 'about', 'work', 'skills', 'education'];
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedProjectId]);

  const handleNavigate = (sectionId: string) => {
    if (selectedProjectId) {
      // We're on project view — need to go back to main page first, then scroll
      pendingScrollTarget.current = sectionId;
      setSelectedProjectId(null);
      try {
        window.history.pushState('', document.title, window.location.pathname + `#${sectionId}`);
      } catch {
        // ignore
      }
      return;
    }

    try {
      window.history.pushState('', document.title, window.location.pathname + `#${sectionId}`);
    } catch {
      window.location.hash = sectionId;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    try {
      window.history.pushState('', document.title, window.location.pathname + `#${projectId}`);
    } catch {
      window.location.hash = projectId;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    pendingScrollTarget.current = 'work';
    setSelectedProjectId(null);
    try {
      window.history.pushState('', document.title, window.location.pathname + '#work');
    } catch {
      window.location.hash = 'work';
    }
  };

  if (selectedProjectId) {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#edf5ff] text-[#0e1111] font-display">
        {/* Premium custom cursor — desktop only, pointer-events: none */}
        <CustomCursor />
        <Navbar activeSection="work" onNavigate={handleNavigate} isProjectView={true} />
        <ProjectDetails
          projectId={selectedProjectId}
          onBack={handleBackToProjects}
          onSelectProject={handleSelectProject}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#edf5ff] text-[#0e1111] font-display">
      {/* Premium custom cursor — desktop only, pointer-events: none */}
      <CustomCursor />

      {/* Sticky Top Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Hero with interactive Liquid-Glass Reveal Canvas */}
      <GlassHero onNavigate={handleNavigate} />

      {/* 01. About Section */}
      <About />

      {/* 02. Work Section (Experience + Projects) */}
      <Work onSelectProject={handleSelectProject} />

      {/* 03. Skills Section */}
      <Skills />

      {/* 04. Education & Certifications Section */}
      <Education />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
