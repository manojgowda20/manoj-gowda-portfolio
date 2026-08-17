import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  className
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 flex flex-col md:mb-16',
        align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start',
        className
      )}
    >
      {/* Elegant minimalist category tag, avoiding the pulsing dot biscuit badge */}
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-widest text-accent-cyan uppercase mb-3"
        >
          {badge}
        </motion.span>
      )}

      {/* Main Title with fine-tuned line spacing and gradient coloring */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight',
          align === 'center' ? 'text-center' : 'text-left'
        )}
      >
        {title}
      </motion.h2>

      {/* Subtle bottom line for visual anchor */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn(
          'h-[2px] w-12 bg-gradient-to-r from-accent-cyan to-accent-blue mt-4 origin-left',
          align === 'center' ? 'mx-auto origin-center' : 'origin-left'
        )}
      />

      {/* Description / Subtitle with premium line height and spacing */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            'mt-5 text-base sm:text-lg text-text-muted font-normal leading-relaxed',
            align === 'center' ? 'text-center' : 'text-left'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
