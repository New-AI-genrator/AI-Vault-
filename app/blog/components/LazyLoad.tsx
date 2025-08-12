'use client';

import { ReactNode, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LazyLoadProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  animateIn?: boolean;
}

export default function LazyLoad({
  children,
  className = '',
  once = true,
  threshold = 0.1,
  rootMargin = '100px',
  animateIn = true,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = containerRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, rootMargin, threshold]);

  if (!animateIn) {
    return <div ref={containerRef} className={className}>{isVisible && children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {isVisible && children}
    </motion.div>
  );
}
