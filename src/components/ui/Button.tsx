import { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Magnetic } from './Magnetic';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'gold' | 'outline' | 'dark' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  magnetic?: boolean;
  className?: string;
}

export function Button({
  variant = 'gold',
  size = 'md',
  children,
  magnetic = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center font-sans font-medium rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5 tracking-wide',
  };

  const variantStyles = {
    gold: 'bg-gradient-to-r from-pia-gold via-pia-goldLight to-pia-gold text-pia-dark font-semibold shadow-lg shadow-pia-gold/25 hover:shadow-pia-gold/40 hover:brightness-110 active:scale-95',
    outline: 'border border-pia-gold/50 text-pia-cream hover:text-pia-gold hover:border-pia-gold bg-pia-charcoal/40 backdrop-blur-sm hover:bg-pia-gold/10 active:scale-95',
    dark: 'bg-pia-surface text-pia-cream border border-pia-border hover:border-pia-gold/40 hover:bg-pia-surface/80 active:scale-95',
    ghost: 'text-pia-muted hover:text-pia-gold hover:bg-pia-gold/5 active:scale-95',
    glow: 'bg-pia-gold text-pia-dark font-bold shadow-[0_0_25px_rgba(229,169,60,0.5)] hover:shadow-[0_0_40px_rgba(229,169,60,0.7)] hover:scale-105 active:scale-95',
  };

  const content = (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {/* Golden Shine Shimmer Sweep */}
      <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );

  if (magnetic) {
    return <Magnetic strength={0.3}>{content}</Magnetic>;
  }

  return content;
}
