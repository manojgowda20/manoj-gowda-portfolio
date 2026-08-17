import { useState, useEffect } from 'react';
import { GlassHero } from './components/GlassHero';
import { Navbar } from './components/Navbar';
import { About } from './sections/About';
import { Work } from './sections/Work';
import { Skills } from './sections/Skills';
import { Education } from './sections/Education';
import { Footer } from './components/Footer';
import { ProjectDetails } from './components/ProjectDetails';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Handle URL hash changes for deep linking to sections or projects
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash.startsWith('project-')) {
        setSelectedProjectId(hash);
        window.scrollTo({ top: 0, behavior: 'instant' as any });
      } else if (['about', 'work', 'skills', 'education'].includes(hash)) {
        setSelectedProjectId(null);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
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
      setSelectedProjectId(null);
      try {
        window.history.pushState("", document.title, window.location.pathname + `#${sectionId}`);
      } catch {
        window.location.hash = sectionId;
      }
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    try {
      window.history.pushState("", document.title, window.location.pathname + `#${sectionId}`);
    } catch {
      window.location.hash = sectionId;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    window.location.hash = projectId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    try {
      window.history.pushState("", document.title, window.location.pathname + '#work');
    } catch {
      window.location.hash = 'work';
    }
    setTimeout(() => {
      const el = document.getElementById('work');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  if (selectedProjectId) {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#edf5ff] text-[#0e1111] font-display">
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
