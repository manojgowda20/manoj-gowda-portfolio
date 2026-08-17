import React from 'react';
import * as Icons from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '../utils/cn';

interface SkillProps {
  name: string;
  level?: string;
  iconName?: string;
}

interface SkillCardProps {
  skill: SkillProps;
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, className }) => {
  const { name, level, iconName } = skill;

  // Dynamically map a string name to a Lucide icon component, default to "Cpu"
  const getIcon = () => {
    if (!iconName) return <Icons.Cpu size={20} className="text-accent-cyan" />;
    
    // Look up the icon from lucide-react dynamically
    const LucideIcon = (Icons as any)[iconName];
    if (LucideIcon) {
      return <LucideIcon size={20} className="text-accent-cyan" />;
    }
    
    return <Icons.Cpu size={20} className="text-accent-cyan" />;
  };

  return (
    <GlassCard
      hoverable={true}
      className={cn(
        'flex items-center gap-4 py-4 px-5 border border-border/40 bg-surface/20 rounded-xl',
        className
      )}
    >
      <div className="flex-shrink-0 p-2.5 rounded-lg bg-background-deep border border-border/50">
        {getIcon()}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white tracking-tight">{name}</h4>
        {level && (
          <span className="text-[10px] font-medium font-mono text-text-muted mt-0.5 block">
            {level}
          </span>
        )}
      </div>
    </GlassCard>
  );
};
