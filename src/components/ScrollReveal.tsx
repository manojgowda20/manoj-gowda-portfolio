import React, { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fade' | 'slide-up' | 'scale' | 'blur';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If the user prefers reduced motion, disable all animation properties completely
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Mobile optimization: decrease slide distances on smaller screens to prevent rendering lag
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const slideDistance = isMobile ? 18 : 30;

  const animationVariants = {
    hidden: {
      opacity: 0,
      y: variant === 'slide-up' ? slideDistance : 0,
      scale: variant === 'scale' ? 0.95 : 1,
      filter: variant === 'blur' ? 'blur(8px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.8, 0.25, 1] as any, // Cubic bezier easing for premium momentum feel
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: `-${threshold * 100}%` }}
      variants={animationVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
