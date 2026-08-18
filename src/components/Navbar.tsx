import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { cn } from '../utils/cn';
import { personalInfo } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isProjectView?: boolean;
}

export const Navbar = ({ activeSection, onNavigate, isProjectView = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    // Call onNavigate immediately and App.tsx handles scrolling with offset and view switching
    onNavigate(id);
  };

  const showNavbar = isScrolled || isProjectView;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-[100] transition-all duration-300 pointer-events-none',
        showNavbar
          ? theme === 'dark'
            ? 'py-3 bg-[#070b12]/95 backdrop-blur-md border-b border-white/10 shadow-sm pointer-events-auto opacity-100 translate-y-0'
            : 'py-3 bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm pointer-events-auto opacity-100 translate-y-0'
          : 'py-5 bg-transparent opacity-0 -translate-y-4 pointer-events-none'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between pointer-events-auto">
        
        {/* Brand Name */}
        <button 
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={cn(
            "flex items-center gap-2.5 group focus:outline-none focus:ring-2 rounded p-1 text-left cursor-pointer transition-colors",
            theme === 'dark' ? "focus:ring-white/20 text-white" : "focus:ring-black/20 text-[#0e1111]"
          )}
        >
          <svg viewBox="0 0 32 32" className="w-5 h-5 fill-none stroke-current stroke-[2.2]" aria-hidden="true">
            <path d="M6 24V8l10 10 10-10v16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-technical text-xs sm:text-sm font-bold tracking-tight uppercase">
            MANOJ GOWDA CD
          </span>
        </button>

        {/* Central Nav Links (Desktop) */}
        <nav className={cn(
          "hidden md:flex items-center gap-8 font-technical text-xs uppercase tracking-wider",
          theme === 'dark' ? "text-white" : "text-[#0e1111]"
        )} aria-label="Main navigation">
          {navItems.map((item) => {
            const isCurrent = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  'transition-all duration-200 relative py-1 focus:outline-none rounded px-1.5 cursor-pointer font-semibold',
                  isCurrent
                    ? theme === 'dark' ? 'text-white' : 'text-[#0e1111]'
                    : theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-[#0e1111]/60 hover:text-[#0e1111]'
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {item.label}
                {isCurrent && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className={cn(
                      "absolute -bottom-1 left-0 right-0 h-[2px] rounded-full",
                      theme === 'dark' ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-[#0e1111]"
                    )}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              "p-2.5 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center min-w-[38px] min-h-[38px]",
              theme === 'dark'
                ? "bg-white/10 border-white/15 text-amber-300 hover:bg-white/20 hover:text-amber-200"
                : "bg-black/5 border-black/10 text-indigo-600 hover:bg-black/10"
            )}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "px-4 py-2 rounded-full font-technical text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95",
              theme === 'dark'
                ? "bg-white text-[#070b12] hover:bg-white/90 border border-white/20"
                : "bg-[#0e1111] text-white hover:bg-[#0e1111]/90 border border-black/10"
            )}
          >
            <span>Let's talk</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Mobile Hamburger Button & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full border transition-colors flex items-center justify-center min-w-[38px] min-h-[38px]",
              theme === 'dark'
                ? "bg-white/10 border-white/15 text-amber-300"
                : "bg-black/5 border-black/10 text-indigo-600"
            )}
            aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "p-2.5 rounded-lg transition-colors cursor-pointer active:scale-90 touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center",
              theme === 'dark' ? "text-white hover:bg-white/10" : "text-[#0e1111] hover:bg-black/5"
            )}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={cn(
              "w-full border-b md:hidden overflow-hidden shadow-xl pointer-events-auto",
              theme === 'dark'
                ? "bg-[#070b12] border-white/10 text-white"
                : "bg-[#edf5ff] border-black/10 text-[#0e1111]"
            )}
          >
            <nav className="flex flex-col px-6 py-5 gap-2.5 font-technical text-xs uppercase tracking-wider" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isCurrent = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      'text-left py-3 px-3.5 rounded-xl transition-colors min-h-[44px] touch-manipulation cursor-pointer flex items-center justify-between font-semibold',
                      isCurrent
                        ? theme === 'dark'
                          ? 'bg-white/10 text-white font-bold border-l-4 border-white'
                          : 'bg-black/5 text-[#0e1111] font-bold border-l-4 border-[#0e1111]'
                        : theme === 'dark'
                          ? 'text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10'
                          : 'text-[#0e1111]/70 hover:text-[#0e1111] hover:bg-black/5 active:bg-black/10'
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={14} className="opacity-40" />
                  </button>
                );
              })}
              
              <div className={cn(
                "pt-3 mt-2 border-t flex flex-col gap-2.5",
                theme === 'dark' ? "border-white/10" : "border-black/10"
              )}>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={cn(
                    "w-full py-2.5 px-3.5 rounded-xl border flex items-center justify-between font-technical text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer",
                    theme === 'dark'
                      ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      : "bg-white border-black/10 text-[#0e1111] hover:bg-black/5"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? <Sun size={15} className="text-amber-300" /> : <Moon size={15} className="text-indigo-600" />}
                    <span>Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </span>
                  <span className="text-[10px] opacity-60">Toggle</span>
                </button>

                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full py-3 rounded-xl text-center font-bold shadow-sm flex items-center justify-center gap-1.5 min-h-[44px] touch-manipulation active:scale-95 transition-transform",
                    theme === 'dark'
                      ? "bg-white text-[#070b12] border border-white/20"
                      : "bg-[#0e1111] text-white border border-black/10"
                  )}
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
