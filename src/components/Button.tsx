import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, iconPosition = 'left', children, ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
    
    const variants = {
      primary: 'bg-gradient-to-r from-accent-blue via-accent-blue/90 to-accent-cyan text-white shadow-lg hover:shadow-accent-blue/25 hover:brightness-110 border border-transparent',
      secondary: 'glass-panel text-white hover:bg-surface-hover hover:border-accent-cyan/30',
      outline: 'bg-transparent border border-border/80 text-text-secondary hover:text-text-primary hover:border-text-primary/40',
      ghost: 'bg-transparent hover:bg-white/5 text-text-muted hover:text-text-primary',
      glow: 'bg-gradient-to-r from-accent-blue/10 to-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan shadow-glass-glow hover:shadow-cyan-500/20 hover:bg-gradient-to-r hover:from-accent-blue/20 hover:to-accent-cyan/20'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...(props as any)}
      >
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
