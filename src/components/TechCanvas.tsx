import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial, Line, Html } from '@react-three/drei';
import * as THREE from 'three';

// 1. Definition of digital engineering nodes
interface NodeData {
  name: string;
  pos: [number, number, number];
  color: string;
  glowColor: string;
}

const NODES_DATA: NodeData[] = [
  { name: 'Core Engine (AI)', pos: [0, 0.8, 0.2], color: '#bc8cff', glowColor: 'rgba(139, 92, 246, 0.2)' },
  { name: 'REST APIs / Endpoints', pos: [-2.0, -0.4, 0.8], color: '#38bdf8', glowColor: 'rgba(56, 189, 248, 0.2)' },
  { name: 'Relational & NoSQL Databases', pos: [2.0, -0.2, -0.6], color: '#39c5cf', glowColor: 'rgba(57, 197, 207, 0.2)' },
  { name: 'AWS Cloud Services', pos: [0.8, -1.4, 1.0], color: '#2f81f7', glowColor: 'rgba(47, 129, 247, 0.2)' },
  { name: 'Docker / Containers', pos: [-1.0, -1.2, -1.0], color: '#ff7b72', glowColor: 'rgba(255, 123, 114, 0.2)' }
];

const DigitalNetwork = ({ scrollY, reducedMotion }: { scrollY: number; reducedMotion: boolean }) => {
  const networkGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Generate sparse background data particles
  const particleCount = 180;
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 1.5; // Spread out particles in depth
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.mouse.x; // range [-1, 1]
    const mouseY = state.mouse.y;

    if (networkGroupRef.current) {
      if (reducedMotion) {
        // Static positioning for accessibility
        networkGroupRef.current.rotation.y = scrollY * 0.001;
      } else {
        // Slow ambient rotation coupled with scroll-depth rotation
        const targetRotY = time * 0.04 + scrollY * 0.0015;
        
        // Apply smooth mouse parallax (lerp)
        networkGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          networkGroupRef.current.rotation.x, 
          -mouseY * 0.25, 
          0.04
        );
        networkGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          networkGroupRef.current.rotation.y, 
          targetRotY + mouseX * 0.25, 
          0.04
        );
      }
    }

    if (coreRef.current && !reducedMotion) {
      coreRef.current.rotation.y = -time * 0.1;
      coreRef.current.rotation.z = time * 0.05;
      const pulse = 1 + Math.sin(time * 1.5) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={networkGroupRef}>
      {/* 1. Ambient Background Data Particles */}
      <Points positions={particlePositions} stride={3}>
        <PointMaterial
          transparent
          color="#38bdf8"
          size={0.045}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.5}
        />
      </Points>

      {/* 2. Central Core Architecture Geometry */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0.2} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#bc8cff" transparent opacity={0.6} />
      </mesh>

      {/* 3. Floating Satellites (Nodes), Labels, and Interconnecting Line Rays */}
      {NODES_DATA.map((node, idx) => (
        <group key={idx}>
          {/* Connecting Line Ray from Core to Satellite Node */}
          <Line
            points={[[0, 0, 0], node.pos]}
            color={node.color}
            lineWidth={1}
            transparent
            opacity={0.25}
          />

          {/* Floating Satellite Mesh */}
          <mesh position={node.pos}>
            <dodecahedronGeometry args={[0.18, 0]} />
            <meshBasicMaterial 
              color={node.color} 
              wireframe 
              transparent 
              opacity={0.7} 
            />
          </mesh>
          <mesh position={node.pos}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.5} />
          </mesh>

          {/* 3D-Anchored HTML Label Overlay */}
          <Html 
            position={node.pos} 
            distanceFactor={5.5} 
            center
            style={{ pointerEvents: 'none' }}
          >
            <div 
              className="px-2.5 py-1 rounded bg-background-deep/85 border backdrop-blur-sm text-[9px] font-bold font-mono text-white select-none whitespace-nowrap tracking-wide"
              style={{ borderColor: node.color + '40', boxShadow: `0 0 10px ${node.glowColor}` }}
            >
              {node.name}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

// Premium SVG / CSS Flow Fallback Illustration
const FallbackVisual = () => {
  return (
    <div className="w-full h-full max-w-[420px] max-h-[420px] aspect-square relative flex items-center justify-center pointer-events-none select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full text-text-muted opacity-80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="purpleLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Backdrop Ambient Glow */}
        <circle cx="100" cy="100" r="80" fill="url(#glowGrad)" />

        {/* Connection Rays (Lines) */}
        <line x1="100" y1="100" x2="40" y2="60" stroke="url(#cyanLine)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="100" y1="100" x2="160" y2="70" stroke="url(#purpleLine)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="100" y1="100" x2="130" y2="150" stroke="url(#cyanLine)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="100" y1="100" x2="60" y2="140" stroke="url(#purpleLine)" strokeWidth="1" strokeDasharray="4 3" />

        {/* Central Core Nodes */}
        <circle cx="100" cy="100" r="14" fill="#030712" stroke="#8b5cf6" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="6" fill="#bc8cff" />

        {/* Satellite Nodes */}
        {/* API */}
        <circle cx="40" cy="60" r="6" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="40" cy="60" r="2.5" fill="#38bdf8" />
        
        {/* Database */}
        <circle cx="160" cy="70" r="6" fill="#030712" stroke="#39c5cf" strokeWidth="1.5" />
        <circle cx="160" cy="70" r="2.5" fill="#39c5cf" />

        {/* Cloud */}
        <circle cx="130" cy="150" r="6" fill="#030712" stroke="#2f81f7" strokeWidth="1.5" />
        <circle cx="130" cy="150" r="2.5" fill="#2f81f7" />

        {/* Containers */}
        <circle cx="60" cy="140" r="6" fill="#030712" stroke="#ff7b72" strokeWidth="1.5" />
        <circle cx="60" cy="140" r="2.5" fill="#ff7b72" />
      </svg>

      {/* Floating HTML labels on fallback graph */}
      <div className="absolute top-[18%] left-[22%] px-2 py-0.5 rounded border border-[#38bdf8]/30 bg-background-deep/90 backdrop-blur-sm text-[8px] font-mono font-bold text-white shadow-sm">
        REST APIs
      </div>
      <div className="absolute top-[23%] right-[22%] px-2 py-0.5 rounded border border-[#39c5cf]/30 bg-background-deep/90 backdrop-blur-sm text-[8px] font-mono font-bold text-white shadow-sm">
        Databases
      </div>
      <div className="absolute bottom-[35%] right-[32%] px-2 py-0.5 rounded border border-[#2f81f7]/30 bg-background-deep/90 backdrop-blur-sm text-[8px] font-mono font-bold text-white shadow-sm">
        AWS Cloud
      </div>
      <div className="absolute bottom-[30%] left-[30%] px-2 py-0.5 rounded border border-[#ff7b72]/30 bg-background-deep/90 backdrop-blur-sm text-[8px] font-mono font-bold text-white shadow-sm">
        Containers
      </div>
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 mt-8 px-2 py-0.5 rounded border border-[#bc8cff]/30 bg-background-deep/90 backdrop-blur-sm text-[8px] font-mono font-bold text-white shadow-sm">
        AI Core
      </div>
    </div>
  );
};

export const TechCanvas = () => {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Diagnostics: Check screen size, WebGL availability, and motion preferences
  useEffect(() => {
    // Check mobile screens
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const supportsWebGL = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebglSupported(supportsWebGL);
    } catch (e) {
      setWebglSupported(false);
    }

    // Scroll listener for 3D relative translation
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  // 2. Render Fallback if conditions dictate (no WebGL, mobile screens, or highly-reduced motion requested)
  if (!webglSupported || isMobile) {
    return <FallbackVisual />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[350px] lg:min-h-[480px]">
      <Suspense fallback={<FallbackVisual />}>
        <Canvas 
          camera={{ position: [0, 0, 4.8], fov: 60 }} 
          className="w-full h-full"
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <DigitalNetwork scrollY={scrollY} reducedMotion={reducedMotion} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={!reducedMotion} 
            autoRotateSpeed={0.25} 
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
