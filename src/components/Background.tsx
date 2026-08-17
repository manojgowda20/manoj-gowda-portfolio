import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  targetAlpha: number;
  speedMultiplier: number;
}

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Detect prefers-reduced-motion to accommodate accessibility needs
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // 2. Initialize Canvas & Animation Loop
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position with smooth easing targets
    const currentMouse = { x: width / 2, y: height / 2 };
    const targetMouse = { x: width / 2, y: height / 2 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.active = true;
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 3. Setup Particles
    const maxParticles = window.innerWidth < 768 ? 20 : 45; // Sparse, high-performance counts
    const particles: Particle[] = [];

    const colors = [
      '56, 189, 248',  // Cyan / Teal
      '139, 92, 246',  // Purple
      '59, 130, 246'   // Blue
    ];

    const createParticle = (initRandomY = false): Particle => {
      return {
        x: Math.random() * width,
        y: initRandomY ? Math.random() * height : height + 10,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.4 - 0.1, // Floating upwards gently
        size: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0,
        targetAlpha: Math.random() * 0.35 + 0.05,
        speedMultiplier: Math.random() * 0.5 + 0.5
      };
    };

    // Generate initial state
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    // 4. Main Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking interpolation
      if (!reducedMotion && mouseRef.current.active) {
        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;
        
        // Render Interactive Mouse Spotlight Glow
        const mouseGlow = ctx.createRadialGradient(
          currentMouse.x,
          currentMouse.y,
          0,
          currentMouse.x,
          currentMouse.y,
          250
        );
        mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.035)');
        mouseGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.015)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(currentMouse.x, currentMouse.y, 250, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render & Update Particles
      particles.forEach((p, idx) => {
        // Fade in
        if (p.alpha < p.targetAlpha) {
          p.alpha += 0.005;
        }

        // Apply motion if allowed by device/user accessibility configuration
        if (!reducedMotion) {
          p.x += p.vx * p.speedMultiplier;
          p.y += p.vy * p.speedMultiplier;

          // Pull particles subtly towards cursor if close
          if (mouseRef.current.active) {
            const dx = currentMouse.x - p.x;
            const dy = currentMouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const force = (200 - dist) / 2000;
              p.x += dx * force * 0.2;
              p.y += dy * force * 0.2;
            }
          }
        }

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur for rendering performance

        // Recycle particle when it floats off screen
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[idx] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanups
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      motionQuery.removeEventListener('change', handleMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-background-deep -z-20 pointer-events-none">
      {/* 1. Slow-Pulsing Ambient Mesh Blobs (Pure CSS) */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] rounded-full filter blur-[120px] opacity-25 animate-glow-slow"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(6, 182, 212, 0.1) 70%, transparent 100%)',
          animationDuration: '18s'
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] rounded-full filter blur-[140px] opacity-20 animate-glow-slow"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.05) 70%, transparent 100%)',
          animationDuration: '24s',
          animationDelay: '-4s'
        }}
      />

      {/* 2. Custom CSS Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-80" />

      {/* 3. Soft Dot Overlay */}
      <div className="absolute inset-0 dots-overlay opacity-40" />

      {/* 4. Canvas Core for Particles and Spot Glows */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
      />

      {/* 5. Tactile Fine Noise Overlay */}
      <div className="absolute inset-0 noise-overlay mix-blend-overlay opacity-25" />
    </div>
  );
};
