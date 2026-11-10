import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  className = '',
  direction = 'up',
}: RevealProps) {
  const directionOffsets = {
    up: { y: yOffset, x: 0 },
    down: { y: -yOffset, x: 0 },
    left: { x: yOffset, y: 0 },
    right: { x: -yOffset, y: 0 },
  };

  const initial = {
    opacity: 0,
    ...directionOffsets[direction],
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Cinematic cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
