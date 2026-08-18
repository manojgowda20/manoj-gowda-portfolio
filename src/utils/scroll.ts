/**
 * Reliable cross-browser smooth scroll utility
 * Handles fixed header offset, mobile touch lifecycles, and animation frames.
 */
export const smoothScrollTo = (targetId: string, headerOffset: number = 75) => {
  if (typeof window === 'undefined') return;

  const target = document.getElementById(targetId);
  if (!target) return;

  // Calculate absolute document offset
  const rect = target.getBoundingClientRect();
  const absoluteTop = rect.top + window.pageYOffset;
  const targetTop = Math.max(0, absoluteTop - headerOffset);

  // Perform smooth scroll
  window.scrollTo({
    top: targetTop,
    behavior: 'smooth',
  });

  // Secondary verification pass (handles mobile reflow/drawer closing delays)
  setTimeout(() => {
    const freshRect = target.getBoundingClientRect();
    if (Math.abs(freshRect.top - headerOffset) > 15) {
      const freshAbsoluteTop = freshRect.top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, freshAbsoluteTop - headerOffset),
        behavior: 'smooth',
      });
    }
  }, 220);
};
