'use client';

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

interface LazyImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  containerClassName?: string;
  placeholderSrc?: string;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  placeholderSrc = '/images/placeholder.jpg',
  priority = false,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Unobserve after image is in view
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse rounded-lg">
          <Image
            src={placeholderSrc}
            alt=""
            fill
            className="object-cover opacity-0"
            aria-hidden="true"
            priority={priority}
          />
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-full w-full"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-300 ${className}`}
            onLoadingComplete={handleLoadingComplete}
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            {...props}
          />
        </motion.div>
      )}
    </div>
  );
}
