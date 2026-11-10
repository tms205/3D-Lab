import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'crimson' | 'jade' | 'taro' | 'dark';
  className?: string;
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variantStyles = {
    gold: 'bg-pia-gold/15 text-pia-gold border-pia-gold/30',
    crimson: 'bg-pia-crimson/15 text-red-300 border-pia-crimson/30',
    jade: 'bg-pia-jade/20 text-emerald-300 border-pia-jade/30',
    taro: 'bg-pia-taro/20 text-purple-300 border-pia-taro/30',
    dark: 'bg-pia-charcoal/80 text-pia-muted border-pia-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border tracking-wide uppercase',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
