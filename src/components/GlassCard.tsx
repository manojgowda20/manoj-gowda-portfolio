import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glow?: boolean;
  glowColor?: 'cyan' | 'purple' | 'blue' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverable = true,
  glow = false,
  glowColor = 'none',
  onClick
}) => {
  const glowStyles = {
    none: '',
    cyan: 'before:absolute before:-inset-px before:rounded-[inherit] before:bg-gradient-to-r before:from-accent-cyan/10 before:to-transparent before:-z-10 before:blur-lg',
    purple: 'before:absolute before:-inset-px before:rounded-[inherit] before:bg-gradient-to-r before:from-accent-purple/10 before:to-transparent before:-z-10 before:blur-lg',
    blue: 'before:absolute before:-inset-px before:rounded-[inherit] before:bg-gradient-to-r before:from-accent-blue/10 before:to-transparent before:-z-10 before:blur-lg'
  };

  const CardComponent = onClick ? motion.button : motion.div;

  return (
    <CardComponent
      onClick={onClick}
      whileHover={hoverable ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'glass-panel relative rounded-2xl overflow-hidden p-6 text-left w-full transition-shadow duration-300',
        hoverable && 'glass-panel-hover',
        glow && glowStyles[glowColor],
        onClick && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-cyan/50',
        className
      )}
    >
      {/* Noise background for tactile feel */}
      <div className="noise-overlay absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none" />
      
      {/* Radial lighting glow inside the card, subtly visible */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </CardComponent>
  );
};
