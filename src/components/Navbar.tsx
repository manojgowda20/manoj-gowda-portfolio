import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { personalInfo } from '../data/portfolio';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isProjectView?: boolean;
}

export const Navbar = ({ activeSection, onNavigate, isProjectView = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'ABOUT', id: 'about' },
    { label: 'WORK', id: 'work' },
    { label: 'SKILLS', id: 'skills' },
    { label: 'EDUCATION', id: 'education' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleItemClick = (id: string) => {
    setMobileMenuOpen(false);
    // Delegate all navigation to parent — App.tsx handles
    // both "scroll on main page" and "go back to main then scroll"
    onNavigate(id);
  };

  const showNavbar = isScrolled || isProjectView;


  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-[100] transition-all duration-300 pointer-events-none',
        showNavbar 
          ? 'py-3 bg-white/95 backdrop-blur-md border-b border-black/15 shadow-sm pointer-events-auto opacity-100 translate-y-0' 
          : 'py-5 bg-transparent opacity-0 -translate-y-4 pointer-events-none'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between pointer-events-auto">
        
        {/* Brand Name */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 rounded p-1 text-left"
        >
          <svg viewBox="0 0 32 32" className="w-5 h-5 fill-none stroke-current stroke-[2.2] text-[#0e1111]" aria-hidden="true">
            <path d="M6 24V8l10 10 10-10v16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-technical text-xs sm:text-sm font-bold tracking-tight uppercase text-[#0e1111]">
            MANOJ GOWDA CD
          </span>
        </button>

        {/* Central Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-technical text-xs uppercase tracking-wider text-[#0e1111]" aria-label="Main navigation">
          {navItems.map((item) => {
            const isCurrent = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  'transition-all duration-200 relative py-1 focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 rounded px-1.5 cursor-pointer',
                  isCurrent ? 'text-[#0e1111] font-bold' : 'text-[#0e1111]/70 hover:text-[#0e1111]'
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {item.label}
                {isCurrent && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0e1111] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-[#0e1111] text-white hover:bg-[#0e1111]/90 border border-black/10 px-4 py-2 rounded-full font-technical text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 flex items-center gap-1.5"
          >
            <span>Let's talk</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 md:hidden text-[#0e1111] hover:bg-black/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 cursor-pointer active:scale-90 touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full bg-[#edf5ff] border-b border-[#0e1111]/10 md:hidden overflow-hidden shadow-lg pointer-events-auto"
          >
            <nav className="flex flex-col px-6 py-5 gap-3 font-technical text-xs uppercase tracking-wider" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isCurrent = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      'text-left py-3 px-3.5 rounded-lg transition-colors min-h-[44px] touch-manipulation cursor-pointer flex items-center',
                      isCurrent 
                        ? 'bg-black/5 text-[#0e1111] font-bold border-l-2 border-[#0e1111]' 
                        : 'text-[#0e1111]/70 hover:text-[#0e1111] active:bg-black/5'
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-3 mt-1 border-t border-[#0e1111]/10 flex flex-col gap-2">
                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#0e1111] text-white border border-black/10 rounded-lg text-center font-bold shadow-sm flex items-center justify-center gap-1.5 min-h-[44px] touch-manipulation active:scale-95 transition-transform"
                >
                  <span>Let's talk</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
