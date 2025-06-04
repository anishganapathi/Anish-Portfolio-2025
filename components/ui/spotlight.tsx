'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
};

export function Spotlight({
  className,
  size = 400,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = containerRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', () => setIsHovered(true));
    element.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', () => setIsHovered(true));
      element.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-hidden',
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 transition duration-300"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
    </motion.div>
  );
}
