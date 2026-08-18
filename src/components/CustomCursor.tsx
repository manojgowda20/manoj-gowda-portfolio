import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

type CursorState = 'default' | 'pointer' | 'view';

// Glitter colour palette for dark mode
const DARK_GLITTER_COLORS = [
  '#4f9cf9', // accent electric blue
  '#ffffff', // bright white
  '#a5d4ff', // sky blue
  '#c4b5fd', // soft violet
  '#fbbf24', // golden glow
  '#67e8f9', // cyan
];

// Glitter colour palette for light mode
const LIGHT_GLITTER_COLORS = [
  '#2563eb', // royal blue
  '#0284c7', // light blue
  '#0d9488', // teal
  '#7c3aed', // violet
  '#d97706', // amber
  '#059669', // emerald
];

export const CustomCursor = () => {
  const { theme } = useTheme();
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate for real mouse / fine-pointer devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const ring = ringRef.current;
    if (!ring) return;

    // ── Position tracking ────────────────────────────────────────────────
    let rawX = window.innerWidth / 2;
    let rawY = window.innerHeight / 2;
    let smoothX = rawX;
    let smoothY = rawY;

    // ── State tracking ───────────────────────────────────────────────────
    let currentState: CursorState = 'default';
    let rafId: number;
    let isVisible = false;

    // ── Glitter throttle ─────────────────────────────────────────────────
    let lastGlitterTime = 0;
    const GLITTER_INTERVAL = 45; // ms between particle bursts

    const LERP = 0.2; // responsive smooth factor
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // ── Sparkle emitter ──────────────────────────────────────────────────
    const emitSparkle = (x: number, y: number) => {
      const palette = theme === 'light' ? LIGHT_GLITTER_COLORS : DARK_GLITTER_COLORS;
      const count = 2 + Math.floor(Math.random() * 2); // 2-3 particles
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'glitter-particle';

        const color = palette[Math.floor(Math.random() * palette.length)];
        const angle = Math.random() * 360;
        const dist = 12 + Math.random() * 20; // spread radius in px
        const sx = Math.cos((angle * Math.PI) / 180) * dist;
        const sy = Math.sin((angle * Math.PI) / 180) * dist;
        const dur = 0.4 + Math.random() * 0.25; // 0.4-0.65s
        const sr = (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 90);

        el.style.cssText = `
          background: ${color};
          box-shadow: 0 0 6px 1px ${color};
          left: ${x}px;
          top: ${y}px;
          --sx: ${sx}px;
          --sy: ${sy}px;
          --sr: ${sr}deg;
          --dur: ${dur}s;
          width: ${3 + Math.random() * 3.5}px;
          height: ${3 + Math.random() * 3.5}px;
        `;

        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove(), { once: true });
      }
    };

    // ── State resolver ───────────────────────────────────────────────────
    const resolveState = (x: number, y: number): CursorState => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return 'default';
      if (el.closest('[data-cursor="view"]')) return 'view';
      if (
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[role="button"]') ||
        el.closest('[tabindex]') ||
        el.closest('input') ||
        el.closest('textarea')
      ) {
        return 'pointer';
      }
      return 'default';
    };

    // ── rAF animation loop ───────────────────────────────────────────────
    const tick = (timestamp: number) => {
      smoothX = lerp(smoothX, rawX, LERP);
      smoothY = lerp(smoothY, rawY, LERP);

      ring.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0) translate(-50%, -50%)`;

      const nextState = resolveState(Math.round(smoothX), Math.round(smoothY));
      if (nextState !== currentState) {
        ring.setAttribute('data-state', nextState);
        currentState = nextState;
      }

      // Emit glitter if mouse moved
      const moved = Math.abs(rawX - smoothX) > 1.2 || Math.abs(rawY - smoothY) > 1.2;
      if (moved && isVisible && timestamp - lastGlitterTime > GLITTER_INTERVAL) {
        lastGlitterTime = timestamp;
        emitSparkle(Math.round(smoothX), Math.round(smoothY));
      }

      rafId = requestAnimationFrame(tick);
    };

    // ── Event listeners ──────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      rawX = e.clientX;
      rawY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        ring.style.opacity = '1';
        smoothX = rawX;
        smoothY = rawY;
      }
    };

    const onScroll = () => {
      // Keep cursor visible and resolve new hover element under cursor during scroll
      if (isVisible) {
        const nextState = resolveState(Math.round(rawX), Math.round(rawY));
        if (nextState !== currentState) {
          ring.setAttribute('data-state', nextState);
          currentState = nextState;
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      ring.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [theme]);

  return (
    <div
      ref={ringRef}
      className="cc-ring"
      data-state="default"
      aria-hidden="true"
      style={{ opacity: 0 }}
    >
      <div className="cc-ring-inner">
        <span className="cc-label">VIEW</span>
      </div>
    </div>
  );
};
