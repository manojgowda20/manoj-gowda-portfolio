import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { cn } from '../utils/cn';

interface TechNode {
  name: string;
  desc: string;
  color: string;
}

const TECH_NODES: TechNode[] = [
  { name: 'Python', desc: 'Backend server engines & data models.', color: '#38bdf8' },
  { name: 'FastAPI', desc: 'Python API framework with typing validation.', color: '#06b6d4' },
  { name: 'Django', desc: 'Secure backend structure and admin interfaces.', color: '#2f81f7' },
  { name: 'Flask', desc: 'Micro-framework for rapid script routing.', color: '#8b5cf6' },
  { name: 'Node.js', desc: 'Asynchronous server-side JS runtime environment.', color: '#bc8cff' },
  { name: 'Express.js', desc: 'Node.js router for server-side applications.', color: '#39c5cf' },
  { name: 'JavaScript', desc: 'Universal programming language for full-stack.', color: '#f59e0b' },
  { name: 'PostgreSQL', desc: 'Relational database for structured consistency.', color: '#2563eb' },
  { name: 'MySQL', desc: 'Relational storage for high-concurrency.', color: '#d97706' },
  { name: 'MongoDB', desc: 'NoSQL document database for flexible schemas.', color: '#10b981' },
  { name: 'Docker', desc: 'Container virtualization for uniform setups.', color: '#0ea5e9' },
  { name: 'AWS', desc: 'Cloud servers, cache hosts, and deployment.', color: '#f97316' },
  { name: 'Git', desc: 'Local distributed version control logging.', color: '#ef4444' },
  { name: 'GitHub', desc: 'Cloud storage and remote branch collaboration.', color: '#f8fafc' },
  { name: 'OpenCV', desc: 'Image analysis and computer vision processing.', color: '#a855f7' },
  { name: 'YOLO', desc: 'Real-time object detection models.', color: '#e11d48' },
  { name: 'Scikit-learn', desc: 'Predictive data modeling and ML pipelines.', color: '#ea580c' }
];

const CloudSphere = ({ hoveredIdx, setHoveredIdx, scrollY, reducedMotion }: {
  hoveredIdx: number | null;
  setHoveredIdx: (idx: number | null) => void;
  scrollY: number;
  reducedMotion: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const count = TECH_NODES.length;

  // Fibonacci Sphere Algorithm to distribute points evenly on a 3D sphere surface
  const nodePositions = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const phi = Math.PI * (3.0 - Math.sqrt(5.0)); // Golden angle
    for (let i = 0; i < count; i++) {
      const y = 1.0 - (i / (count - 1.0)) * 2.0; // Range [1, -1]
      const radius = Math.sqrt(1.0 - y * y); // Radius at this height
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      // Scale sphere to radius 2.3
      points.push(new THREE.Vector3(x * 2.3, y * 2.3, z * 2.3));
    }
    return points;
  }, [count]);

  // Connect each node to its nearest 2 neighbors to build an organic network mesh
  const connections = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3; startIdx: number; endIdx: number }[] = [];
    for (let i = 0; i < count; i++) {
      const distances = nodePositions.map((pos, idx) => ({
        idx,
        dist: nodePositions[i].distanceTo(pos)
      }));
      // Sort by distance ascending (first item is self at dist 0, so skip it)
      distances.sort((a, b) => a.dist - b.dist);
      // Connect to nearest 2 neighbors
      if (distances[1]) lines.push({ start: nodePositions[i], end: nodePositions[distances[1].idx], startIdx: i, endIdx: distances[1].idx });
      if (distances[2]) lines.push({ start: nodePositions[i], end: nodePositions[distances[2].idx], startIdx: i, endIdx: distances[2].idx });
    }
    return lines;
  }, [nodePositions, count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      if (reducedMotion) {
        groupRef.current.rotation.y = scrollY * 0.0008;
      } else if (hoveredIdx === null) {
        // Slow ambient rotation when nothing is hovered
        groupRef.current.rotation.y = time * 0.08 + scrollY * 0.0008;
        groupRef.current.rotation.x = Math.sin(time * 0.04) * 0.08;
      }
      // If hoveredIdx is active, rotation stops to allow tooltip reading
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Network Connecting Lines */}
      {connections.map((c, idx) => {
        // Highlight line if either of its endpoints is hovered
        const isHighlighted = hoveredIdx === c.startIdx || hoveredIdx === c.endIdx;
        return (
          <Line
            key={idx}
            points={[c.start, c.end]}
            color={isHighlighted ? '#06b6d4' : '#ffffff'}
            lineWidth={isHighlighted ? 1.5 : 0.75}
            transparent
            opacity={isHighlighted ? 0.6 : 0.12}
          />
        );
      })}

      {/* Floating Interactive Nodes */}
      {TECH_NODES.map((node, idx) => {
        const pos = nodePositions[idx];
        const isHovered = hoveredIdx === idx;
        
        return (
          <group key={node.name} position={pos}>
            {/* Visual Node Dot */}
            <mesh 
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredIdx(idx);
              }}
              onPointerOut={() => setHoveredIdx(null)}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial 
                color={node.color} 
                transparent
                opacity={isHovered ? 1.0 : 0.4}
              />
            </mesh>

            {/* Glowing Ring around hovered items */}
            {isHovered && (
              <mesh>
                <ringGeometry args={[0.12, 0.15, 32]} />
                <meshBasicMaterial color={node.color} side={THREE.DoubleSide} />
              </mesh>
            )}

            {/* 3D Anchored HTML Label & Tooltip */}
            <Html 
              distanceFactor={6} 
              center
              style={{ pointerEvents: 'none' }}
            >
              <div 
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative flex flex-col items-center pointer-events-auto"
              >
                {/* 1. Main Label Button */}
                <button
                  className={cn(
                    "px-2.5 py-1 text-[9px] font-bold font-mono tracking-wide rounded-md border backdrop-blur-sm select-none transition-all duration-200 cursor-help",
                    isHovered 
                      ? "text-white bg-background-deep scale-110 shadow-glass-glow" 
                      : "text-text-secondary bg-background-deep/60 border-border/40 hover:text-white"
                  )}
                  style={isHovered ? { borderColor: node.color, boxShadow: `0 0 12px ${node.color}40` } : {}}
                  aria-haspopup="true"
                  aria-expanded={isHovered}
                >
                  {node.name}
                </button>

                {/* 2. Mini Hover Tooltip Box */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: -6, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full mb-2 w-44 p-2.5 rounded-lg bg-background-deep/95 border border-border/80 text-left shadow-glass text-white z-20 pointer-events-none"
                    >
                      <div className="text-[10px] font-bold tracking-tight mb-1" style={{ color: node.color }}>
                        {node.name}
                      </div>
                      <div className="text-[9px] leading-relaxed text-text-secondary font-light">
                        {node.desc}
                      </div>
                      {/* Triangle Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] border-x-4 border-t-4 border-x-transparent border-t-border/80" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

// Premium Mobile / Accessibility Grid Fallback
const FallbackGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mx-auto px-4 mt-6">
      {TECH_NODES.map((node) => (
        <div 
          key={node.name}
          className="glass-panel p-3.5 rounded-xl border border-border/40 bg-surface/10 text-center hover:border-accent-cyan/40 transition-all duration-300"
        >
          <span 
            className="text-xs font-bold font-mono tracking-wider block"
            style={{ color: node.color }}
          >
            {node.name}
          </span>
          <span className="text-[9px] text-text-muted mt-1 leading-normal block font-light">
            {node.desc}
          </span>
        </div>
      ))}
    </div>
  );
};

export const TechCloud = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check motion accessibility constraints
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    // Verify WebGL Canvas capacity
    try {
      const canvas = document.createElement('canvas');
      const supportsWebGL = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebglSupported(supportsWebGL);
    } catch (e) {
      setWebglSupported(false);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-16 pt-12 border-t border-border/20">
      <div className="text-center max-w-2xl mx-auto px-6 mb-8">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <span>Technology Cloud Network</span>
          <span className="text-[9px] font-bold font-mono text-accent-cyan px-2 py-0.5 rounded bg-accent-cyan/10 border border-accent-cyan/20">
            Interactive Node Grid
          </span>
        </h3>
        <p className="text-xs text-text-muted mt-2 leading-relaxed font-light">
          An interactive topological mesh mapping structural dependencies. Hover over a node to focus and view application details.
        </p>
      </div>

      {/* Render 3D Canvas on Desktop, otherwise render flat Grid fallback */}
      {!webglSupported || isMobile ? (
        <FallbackGrid />
      ) : (
        <div className="w-full max-w-4xl h-[420px] relative flex items-center justify-center border border-border/30 rounded-2xl bg-background-light/20 overflow-hidden shadow-glass">
          {/* Subtle backdrop circle lights */}
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-accent-blue/5 to-accent-cyan/5 filter blur-[60px] -z-10 pointer-events-none" />
          
          <Suspense fallback={
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-xs font-mono text-text-muted animate-pulse">Initializing orbit matrix...</span>
            </div>
          }>
            <Canvas
              camera={{ position: [0, 0, 5.2], fov: 60 }}
              className="w-full h-full"
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} intensity={0.8} />
              <CloudSphere 
                hoveredIdx={hoveredIdx} 
                setHoveredIdx={setHoveredIdx}
                scrollY={scrollY}
                reducedMotion={reducedMotion}
              />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate={hoveredIdx === null && !reducedMotion}
                autoRotateSpeed={0.2}
              />
            </Canvas>
          </Suspense>
        </div>
      )}
    </div>
  );
};
