import { useEffect, useRef } from 'react';

type CursorState = 'default' | 'pointer' | 'view';

/**
 * CustomCursor — premium minimal cursor for desktop fine-pointer devices.
 *
 * Implementation notes:
 *  • All position/state updates go directly to the DOM via refs — zero React
 *    re-renders during cursor movement.
 *  • requestAnimationFrame loop lerps smoothed position toward raw mouse
 *    position for a soft, premium feel.
 *  • document.elementFromPoint() on each frame determines the cursor state
 *    by reading data-cursor attributes, so no prop-drilling is needed.
 *  • pointer-events: none on the cursor element ensures nothing is blocked.
 *  • Activated only when (hover: hover) and (pointer: fine) matches, so
 *    mobile / touchscreen devices are completely unaffected.
 */
export const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate for real mouse / fine-pointer devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const ring = ringRef.current;
    if (!ring) return;

    // ── Position tracking ────────────────────────────────────────────────
    let rawX = -200;
    let rawY = -200;
    let smoothX = -200;
    let smoothY = -200;

    // ── State tracking ───────────────────────────────────────────────────
    let currentState: CursorState = 'default';
    let rafId: number;
    let isVisible = false;

    // ── Helpers ──────────────────────────────────────────────────────────
    const LERP = 0.15; // smoothing factor (0 = no movement, 1 = instant)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const resolveState = (x: number, y: number): CursorState => {
      // Use elementFromPoint on the smoothed position
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return 'default';

      // Project card — check for our data attribute
      if (el.closest('[data-cursor="view"]')) return 'view';

      // Clickable elements: buttons, anchors, [role=button]
      if (
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[role="button"]') ||
        el.closest('[tabindex]')
      ) {
        return 'pointer';
      }

      return 'default';
    };

    // ── rAF animation loop ───────────────────────────────────────────────
    const tick = () => {
      // Smooth lerp toward raw target
      smoothX = lerp(smoothX, rawX, LERP);
      smoothY = lerp(smoothY, rawY, LERP);

      // Apply position (translate centres the ring on the cursor point)
      ring.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0) translate(-50%, -50%)`;

      // Determine and apply state (avoid redundant DOM writes)
      const nextState = resolveState(Math.round(smoothX), Math.round(smoothY));
      if (nextState !== currentState) {
        ring.setAttribute('data-state', nextState);
        currentState = nextState;
      }

      rafId = requestAnimationFrame(tick);
    };

    // ── Event listeners ──────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      rawX = e.clientX;
      rawY = e.clientY;

      // Show cursor on first movement
      if (!isVisible) {
        isVisible = true;
        ring.style.opacity = '1';
        // Snap to position immediately on first move so it does not slide in from off-screen
        smoothX = rawX;
        smoothY = rawY;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (rawX > -199) {
        isVisible = true;
        ring.style.opacity = '1';
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });

    // Start the loop
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

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
