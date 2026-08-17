import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<'default' | 'button' | 'link' | 'card'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [disabled, setDisabled] = useState(true); // Disable by default until checks pass

  useEffect(() => {
    // 1. Safeguard Checks: Disable on touch devices, mobile screens, or reduced motion queries
    const touchQuery = window.matchMedia('(pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobileViewport = window.innerWidth < 768;

    const checkEligibility = () => {
      const eligibility = !touchQuery.matches && !motionQuery.matches && !isMobileViewport;
      setDisabled(!eligibility);
      
      // Inject global styling to hide the default browser cursor when custom cursor is active
      if (eligibility) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    checkEligibility();
    touchQuery.addEventListener('change', checkEligibility);
    motionQuery.addEventListener('change', checkEligibility);

    return () => {
      touchQuery.removeEventListener('change', checkEligibility);
      motionQuery.removeEventListener('change', checkEligibility);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (disabled) return;

    // 2. Track global mouse positioning coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // 3. Event Delegation for hover target states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isButton = target.closest('button') || target.closest('.btn') || target.closest('[role="button"]') || target.closest('input[type="submit"]');
      const isLink = target.closest('a');
      const isCard = target.closest('.glass-panel') || target.closest('[data-hover-card]');

      if (isButton) {
        setCursorState('button');
      } else if (isLink) {
        setCursorState('link');
      } else if (isCard) {
        setCursorState('card');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    // 4. Smooth interpolation loop running at hardware-accelerated 60fps
    let animFrameId = 0;
    const updatePosition = () => {
      // Smooth easing factor (dot is fast, ring has a slow lag)
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.8;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.8;

      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      animFrameId = requestAnimationFrame(updatePosition);
    };
    animFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrameId);
    };
  }, [disabled, isVisible]);

  // 5. Magnetic Button Effect Controller
  useEffect(() => {
    if (disabled) return;

    const handleMagneticMove = (e: MouseEvent) => {
      const targets = document.querySelectorAll('[data-magnetic]');
      
      targets.forEach((target) => {
        const el = target as HTMLElement;
        const rect = el.getBoundingClientRect();
        
        // Find the element center point coordinates
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        // Calculate distance from cursor to element center
        const deltaX = e.clientX - elCenterX;
        const deltaY = e.clientY - elCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Pull threshold (e.g. 45px)
        const threshold = 45;
        if (distance < threshold) {
          // Attract element towards the cursor subtly (factor 0.28)
          el.style.transform = `translate3d(${deltaX * 0.28}px, ${deltaY * 0.28}px, 0)`;
          el.style.transition = 'transform 0.08s ease-out';
        } else {
          // Return to normal
          el.style.transform = 'translate3d(0, 0, 0)';
          el.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }
      });
    };

    window.addEventListener('mousemove', handleMagneticMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMagneticMove);
      // Reset any transformed buttons on cleanup
      document.querySelectorAll('[data-magnetic]').forEach((target) => {
        const el = target as HTMLElement;
        el.style.transform = '';
        el.style.transition = '';
      });
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 pointer-events-none z-[999] transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden="true"
    >
      {/* 1. Inner Cursor Dot */}
      <div 
        ref={dotRef}
        className={cn(
          "fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent-cyan -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200",
          cursorState !== 'default' ? "scale-0" : "scale-100"
        )}
      />

      {/* 2. Outer Cursor Follower Ring */}
      <div 
        ref={ringRef}
        className={cn(
          "fixed top-0 left-0 rounded-full border pointer-events-none transition-all duration-300 ease-out",
          // Default state
          cursorState === 'default' && "w-8 h-8 border-accent-cyan/35 bg-transparent",
          // Button state: scale up and soft neon fill
          cursorState === 'button' && "w-11 h-11 border-accent-cyan/80 bg-accent-cyan/10 shadow-glass-glow",
          // Link state: change color and scale down slightly
          cursorState === 'link' && "w-7 h-7 border-accent-purple/90 bg-accent-purple/5 shadow-[0_0_8px_rgba(139,92,246,0.25)]",
          // Card state: scale up further with dashed margins
          cursorState === 'card' && "w-13 h-13 border-dashed border-accent-cyan/25 bg-transparent"
        )}
      />
    </div>
  );
};
