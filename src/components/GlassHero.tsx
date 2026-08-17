import React, { useRef, useEffect } from 'react';
import { personalInfo } from '../data/portfolio';

interface GlassHeroProps {
  onNavigate?: (sectionId: string) => void;
}

export const GlassHero: React.FC<GlassHeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // Animation values stored in refs to prevent React state re-renders
  const rawPos = useRef({ x: -999, y: -999 });
  const smoothedPos = useRef({ x: -999, y: -999 });
  const targetRadius = useRef(0);
  const currentRadius = useRef(0);
  const isTracking = useRef(false);
  const frameId = useRef<number | null>(null);

  const DESKTOP_RADIUS = 235;
  const MOBILE_RADIUS = 150;

  useEffect(() => {
    const container = containerRef.current;
    const revealElement = revealRef.current;
    if (!container || !revealElement) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleQueryChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleQueryChange);

    const tick = () => {
      let x = smoothedPos.current.x;
      let y = smoothedPos.current.y;
      let r = currentRadius.current;

      const targetX = rawPos.current.x;
      const targetY = rawPos.current.y;
      const targetR = targetRadius.current;

      if (prefersReducedMotion) {
        x = targetX;
        y = targetY;
        r = targetR;
      } else {
        // Linear interpolation (lerp) for smooth tracking
        if (x === -999) {
          x = targetX;
        } else {
          x += (targetX - x) * 0.14;
        }

        if (y === -999) {
          y = targetY;
        } else {
          y += (targetY - y) * 0.14;
        }

        r += (targetR - r) * 0.12;
      }

      smoothedPos.current = { x, y };
      currentRadius.current = r;

      // Drive CSS variables on the reveal layer
      revealElement.style.setProperty('--reveal-x', `${x}px`);
      revealElement.style.setProperty('--reveal-y', `${y}px`);
      revealElement.style.setProperty('--reveal-radius', `${r}px`);

      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      mediaQuery.removeEventListener('change', handleQueryChange);
    };
  }, []);

  // Desktop Pointer Handlers
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    targetRadius.current = DESKTOP_RADIUS;
    updatePointerPosition(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      updatePointerPosition(e);
      targetRadius.current = DESKTOP_RADIUS;
    } else if (isTracking.current) {
      updatePointerPosition(e);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    targetRadius.current = 0;
  };

  // Mobile Touch/Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return;
    isTracking.current = true;
    targetRadius.current = MOBILE_RADIUS;
    updatePointerPosition(e);

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (smoothedPos.current.x === -999) {
        smoothedPos.current = { x, y };
      }
    }

    try {
      containerRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture errors
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return;
    isTracking.current = false;
    targetRadius.current = 0;
    try {
      containerRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore capture release errors
    }
  };

  const updatePointerPosition = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      rawPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const scrollToSection = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden isolate touch-none select-none bg-[#edf5ff] text-[#0e1111] font-display flex flex-col justify-between"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Scoped CSS Styles */}
      <style>{`
        .hero-base, .hero-reveal {
          position: absolute;
          inset: 0;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          pointer-events: none;
        }

        .hero-base {
          background-image: url('/images/Base_image_desktop.png');
          z-index: 1;
        }

        .hero-reveal {
          background-image: url('/images/Reveal_image_desktop.png');
          z-index: 2;
          -webkit-mask-image: radial-gradient(
            circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px),
            rgba(255, 255, 255, 0.94) 0%,
            rgba(255, 255, 255, 0.94) 62%,
            rgba(255, 255, 255, 0.72) 76%,
            rgba(255, 255, 255, 0.28) 90%,
            transparent 100%
          );
          mask-image: radial-gradient(
            circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px),
            rgba(255, 255, 255, 0.94) 0%,
            rgba(255, 255, 255, 0.94) 62%,
            rgba(255, 255, 255, 0.72) 76%,
            rgba(255, 255, 255, 0.28) 90%,
            transparent 100%
          );
        }

        @media (max-width: 767px) and (orientation: portrait) {
          .hero-base {
            background-image: url('/images/Base_image_mobile.png');
          }
          .hero-reveal {
            background-image: url('/images/Reveal_image_mobile.png');
          }
        }

        .hero-headline {
          position: absolute;
          left: max(5.6vw, 2rem);
          top: 34%;
          font-size: clamp(5.4rem, 6.2vw, 6.8rem);
          line-height: 0.93;
          letter-spacing: -0.085em;
          font-weight: 400;
          z-index: 10;
        }

        .hero-intro {
          position: absolute;
          left: max(5.6vw, 2rem);
          bottom: 6%;
          max-width: 28rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 10;
        }

        .hero-tagline {
          position: absolute;
          right: max(5.6vw, 2rem);
          bottom: 6%;
          text-align: right;
          z-index: 10;
          line-height: 1.4;
        }

        @media (max-width: 767px) {
          .hero-headline {
            top: 18%;
            left: 1.25rem;
            width: 70%;
            font-size: clamp(2.7rem, 12.5vw, 3.8rem);
            line-height: 0.87;
            max-width: 320px;
          }
          .hero-intro {
            left: 1.25rem;
            right: 1.25rem;
            bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
            max-width: none;
          }
          .hero-tagline {
            top: 52%;
            right: 1.25rem;
            bottom: auto;
          }
        }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(1.035); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUpLine {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInSimple {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-hero-image {
          animation: heroFadeIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-nav {
          animation: fadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }

        .animate-headline-line-1 {
          animation: slideUpLine 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }

        .animate-headline-line-2 {
          animation: slideUpLine 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          opacity: 0;
        }

        .animate-headline-line-3 {
          animation: slideUpLine 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
          opacity: 0;
        }

        .animate-intro-container {
          animation: fadeInSimple 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
          opacity: 0;
        }

        .animate-tagline-text {
          animation: fadeInSimple 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
          opacity: 0;
        }
      `}</style>

      {/* LAYER 1: Base Portrait */}
      <div aria-hidden="true" className="hero-base animate-hero-image" />

      {/* LAYER 2: Reveal Portrait */}
      <div ref={revealRef} aria-hidden="true" className="hero-reveal animate-hero-image" />

      {/* LAYER 3: Technical Grid + Large Circle */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        {/* Desktop 12 Columns, 4 Rows Grid */}
        <div className="absolute inset-0 hidden md:grid grid-cols-12 grid-rows-4 opacity-[0.08]">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border-r border-b border-[#0e1111]/20" />
          ))}
        </div>

        {/* Mobile 4 Columns, 6 Rows Grid */}
        <div className="absolute inset-0 grid md:hidden grid-cols-4 grid-rows-6 opacity-[0.04]">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-r border-b border-[#0e1111]/20" />
          ))}
        </div>

        {/* Desktop Oversized Circle */}
        <div 
          className="absolute hidden md:block rounded-full border border-[#0e1111]/10 opacity-[0.08]"
          style={{
            width: 'min(78vw, 72rem)',
            aspectRatio: '1/1',
            left: '8%',
            top: '-36%',
          }}
        />

        {/* Mobile Oversized Circle */}
        <div 
          className="absolute block md:hidden rounded-full border border-[#0e1111]/10 opacity-[0.04]"
          style={{
            width: '150vw',
            aspectRatio: '1/1',
            left: '-76%',
            top: '-8%',
          }}
        />
      </div>

      {/* Top Bar for initial hero view (integrated navigation with high-visibility frosted pill styling) */}
      <nav 
        className="absolute top-[max(1.5rem,env(safe-area-inset-top,0px))] left-0 right-0 px-[max(4vw,1.5rem)] flex justify-between items-center z-30 animate-nav pointer-events-auto"
        aria-label="Hero navigation"
      >
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-black/15 shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <svg viewBox="0 0 32 32" className="w-5 h-5 fill-none stroke-current stroke-[2.2] text-[#0e1111]" aria-hidden="true">
            <path d="M6 24V8l10 10 10-10v16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-technical text-xs sm:text-sm font-bold tracking-tight uppercase text-[#0e1111]">
            MANOJ GOWDA CD
          </span>
        </button>

        {/* Desktop Links (Click to scroll down to sections - frosted pill container with high contrast) */}
        <div className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full bg-white/95 backdrop-blur-md border border-black/15 shadow-sm font-technical text-xs uppercase tracking-wider text-[#0e1111] font-bold">
          <button 
            onClick={() => scrollToSection('about')}
            className="hover:text-black/60 transition-colors focus:outline-none focus:underline cursor-pointer"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('work')}
            className="hover:text-black/60 transition-colors focus:outline-none focus:underline cursor-pointer"
          >
            Work
          </button>
          <button 
            onClick={() => scrollToSection('skills')}
            className="hover:text-black/60 transition-colors focus:outline-none focus:underline cursor-pointer"
          >
            Skills
          </button>
          <button 
            onClick={() => scrollToSection('education')}
            className="hover:text-black/60 transition-colors focus:outline-none focus:underline cursor-pointer"
          >
            Education
          </button>
        </div>

        {/* Let's Talk CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('about')}
            className="md:hidden px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-black/15 font-technical text-xs uppercase tracking-wider text-[#0e1111] font-bold shadow-sm"
          >
            [About]
          </button>
          <a 
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-[#0e1111] text-white hover:bg-[#0e1111]/90 border border-black/10 px-5 py-2.5 rounded-full font-technical text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 flex items-center justify-center min-h-[40px] hover:-translate-y-[1px] active:translate-y-0"
          >
            Let's talk
          </a>
        </div>
      </nav>

      {/* LAYER 4: Headline and Copy */}
      <section className="hero-headline flex flex-col pointer-events-none">
        <span className="overflow-hidden">
          <span className="block animate-headline-line-1">BUILDING</span>
        </span>
        <span className="overflow-hidden">
          <span className="block animate-headline-line-2">BEYOND</span>
        </span>
        <span className="overflow-hidden">
          <span className="block animate-headline-line-3 text-black/90">POSSIBLE.</span>
        </span>
      </section>

      {/* Bottom copy and action triggers */}
      <div className="hero-intro animate-intro-container flex flex-col items-start gap-5">
        <p className="text-sm md:text-base leading-relaxed text-[#0e1111]/85 font-display tracking-tight pointer-events-auto">
          I am a full-stack developer and Python engineer crafting robust backend APIs, secure registries, and intelligent computer vision pipelines.
        </p>
        <button 
          onClick={() => scrollToSection('work')}
          className="bg-white text-[#0e1111] hover:bg-[#edf5ff] border border-black/10 px-6 py-3 rounded-full font-technical text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 flex items-center justify-center min-h-[44px] hover:-translate-y-[1px] active:translate-y-0 cursor-pointer pointer-events-auto"
        >
          Explore my work
        </button>
      </div>

      {/* Small mono tagline */}
      <div className="hero-tagline animate-tagline-text text-right pointer-events-none">
        <div className="font-technical text-[10px] md:text-xs tracking-wider uppercase opacity-60 leading-relaxed">
          BUILDING THE<br />
          NEXT VERSION<br />
          IN PUBLIC
        </div>
      </div>
    </div>
  );
};
