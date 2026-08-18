import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { AnimatePresence, motion } from 'framer-motion';

interface GlassHeroProps {
  onNavigate?: (sectionId: string) => void;
}

export const GlassHero: React.FC<GlassHeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure video autoplays smoothly across mobile and desktop browsers
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback: poster/base image displays smoothly
        });
      }
    }
  }, []);

  // Animation values stored in refs to prevent React state re-renders
  const rawPos = useRef({ x: -999, y: -999 });
  const smoothedPos = useRef({ x: -999, y: -999 });
  const targetRadius = useRef(0);
  const currentRadius = useRef(0);
  const isTracking = useRef(false);
  const frameId = useRef<number | null>(null);

  const DESKTOP_RADIUS = 235;
  const MOBILE_RADIUS = 140;

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

  // Desktop Mouse Handlers
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

  // Mobile Touch Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // If the touch target is a button, link, or inside navigation, DO NOT intercept!
    const target = e.target as HTMLElement | null;
    if (target && (target.closest('button') || target.closest('a') || target.closest('nav') || target.closest('.pointer-events-auto'))) {
      return;
    }

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
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return;
    isTracking.current = false;
    targetRadius.current = 0;
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
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
    }
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full h-[100dvh] min-h-[580px] max-h-[1000px] overflow-hidden isolate select-none bg-[#edf5ff] text-[#0e1111] font-display flex flex-col justify-between touch-pan-y"
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
            background-position: 60% 15%;
          }
          .hero-reveal {
            background-image: url('/images/Reveal_image_mobile.png');
            background-position: 60% 15%;
          }
        }

        .hero-headline {
          position: absolute;
          left: max(5.6vw, 2rem);
          top: 32%;
          font-size: clamp(4.2rem, 6vw, 6.8rem);
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
          gap: 1.25rem;
          z-index: 30;
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
            top: 14%;
            left: 1.25rem;
            width: 80%;
            font-size: clamp(2.3rem, 9.5vw, 3.4rem);
            line-height: 0.92;
            max-width: 320px;
          }
          .hero-intro {
            left: 1.25rem;
            right: 1.25rem;
            bottom: calc(1.2rem + env(safe-area-inset-bottom, 0px));
            max-width: none;
            gap: 0.9rem;
          }
          .hero-tagline {
            top: 45%;
            right: 1.25rem;
            bottom: auto;
          }
        }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(1.05); }
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
          animation: heroFadeIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

      {/* LAYER 1: Base Portrait / Video Background (Cropped to remove AI watermarks & centered for mobile & web) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/Base_image_desktop.png"
          className="absolute w-[116%] h-[116%] -left-[8%] top-[1%] max-w-none object-cover object-[60%_15%] md:w-[112%] md:h-[112%] md:-left-[6%] md:top-[1%] md:object-center pointer-events-none"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
          <source src="/images/Man_walking_toward_camera_202608181141.mp4" type="video/mp4" />
        </video>
      </div>
      <div aria-hidden="true" className="hero-base animate-hero-image" style={{ zIndex: 0 }} />

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

      {/* Top Bar for initial hero view (High-visibility frosted pill styling for desktop and mobile) */}
      <nav 
        className="absolute top-[max(1rem,env(safe-area-inset-top,0px))] left-0 right-0 px-3 sm:px-[max(4vw,1.5rem)] flex justify-between items-center z-50 animate-nav pointer-events-auto"
        aria-label="Hero navigation"
      >
        <button 
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-black/15 shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 touch-manipulation"
        >
          <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-[2.2] text-[#0e1111]" aria-hidden="true">
            <path d="M6 24V8l10 10 10-10v16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-technical text-[11px] sm:text-xs font-bold tracking-tight uppercase text-[#0e1111]">
            MANOJ GOWDA CD
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full bg-white/95 backdrop-blur-md border border-black/15 shadow-sm font-technical text-xs uppercase tracking-wider text-[#0e1111] font-bold">
          <button 
            type="button"
            onClick={() => scrollToSection('about')}
            className="hover:text-black/60 transition-colors focus:outline-none focus:underline cursor-pointer touch-manipulation py-1 px-1"
          >
            About
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('work')}
            className="hover:text-black/60 transition-colors focus:outline-none focus:underline cursor-pointer touch-manipulation py-1 px-1"
          >
            Work
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('skills')}
            className="hover:text-black/60 transition-colors focus:outline-none focus:underline cursor-pointer touch-manipulation py-1 px-1"
          >
            Skills
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('education')}
            className="hover:text-black/60 transition-colors focus:outline-none focus:underline cursor-pointer touch-manipulation py-1 px-1"
          >
            Education
          </button>
        </div>

        {/* Mobile menu toggle & WhatsApp CTA */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-black/15 text-[#0e1111] shadow-sm flex items-center justify-center cursor-pointer active:scale-90 transition-transform touch-manipulation min-w-[40px] min-h-[40px]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <a 
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0e1111] text-white hover:bg-[#0e1111]/90 border border-black/10 px-4 sm:px-5 py-2 rounded-full font-technical text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 flex items-center justify-center min-h-[40px] cursor-pointer active:scale-95 touch-manipulation"
          >
            <span>Let's talk</span>
          </a>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown from Hero Header */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[72px] left-3 right-3 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/15 shadow-2xl z-50 md:hidden font-technical text-xs uppercase tracking-wider text-[#0e1111] font-bold flex flex-col gap-2 pointer-events-auto"
          >
            {['about', 'work', 'skills', 'education'].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => scrollToSection(sec)}
                className="text-left p-3 rounded-xl hover:bg-black/5 active:bg-black/10 flex items-center justify-between transition-colors cursor-pointer min-h-[44px] touch-manipulation"
              >
                <span>{sec}</span>
                <ArrowUpRight size={15} className="opacity-60" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
      <div className="hero-intro animate-intro-container flex flex-col items-start pointer-events-auto">
        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#0e1111]/85 font-display tracking-tight pointer-events-auto">
          I am a full-stack developer and Python engineer crafting robust backend APIs, secure registries, and intelligent computer vision pipelines.
        </p>
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pointer-events-auto">
          <button 
            type="button"
            onClick={() => scrollToSection('work')}
            className="bg-white text-[#0e1111] hover:bg-[#edf5ff] border border-black/15 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-technical text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 flex items-center justify-center min-h-[44px] cursor-pointer active:scale-95 touch-manipulation"
          >
            Explore my work
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="md:hidden inline-flex items-center gap-1.5 text-[11px] font-technical uppercase font-bold text-[#0e1111] px-4 py-2.5 rounded-full border border-black/15 bg-white/95 backdrop-blur-sm cursor-pointer active:scale-95 min-h-[44px] touch-manipulation shadow-sm"
          >
            <span>About</span>
            <ChevronDown size={14} className="animate-bounce" />
          </button>
        </div>
      </div>

      {/* Small mono tagline */}
      <div className="hero-tagline animate-tagline-text text-right pointer-events-none">
        <div className="font-technical text-[9px] sm:text-[10px] md:text-xs tracking-wider uppercase opacity-60 leading-relaxed">
          BUILDING THE<br />
          NEXT VERSION<br />
          IN PUBLIC
        </div>
      </div>
    </div>
  );
};
