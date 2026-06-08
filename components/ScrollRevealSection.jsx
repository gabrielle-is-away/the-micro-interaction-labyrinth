import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollRevealSection Component
 * 
 * Reveals content as it enters the viewport using Intersection Observer.
 * - High-performance scroll animations
 * - Accessibility-first approach
 * - Respects prefers-reduced-motion
 * - Works without JavaScript for progressive enhancement
 * 
 * @param {React.ReactNode} children - Content to reveal
 * @param {string} direction - Animation direction: 'up', 'down', 'left', 'right'
 * @param {number} delay - Delay in seconds
 */
export const ScrollRevealSection = ({
  children,
  direction = 'up',
  delay = 0,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const directionMap = {
    up: { initial: { y: 40 }, animate: { y: 0 } },
    down: { initial: { y: -40 }, animate: { y: 0 } },
    left: { initial: { x: 40 }, animate: { x: 0 } },
    right: { initial: { x: -40 }, animate: { x: 0 } },
  };

  const variants = {
    initial: {
      opacity: 0,
      ...directionMap[direction].initial,
    },
    animate: {
      opacity: 1,
      ...directionMap[direction].animate,
    },
  };

  const transitionConfig = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, delay, type: 'spring', stiffness: 100, damping: 30 };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isVisible ? 'animate' : 'initial'}
      variants={variants}
      transition={transitionConfig}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;
