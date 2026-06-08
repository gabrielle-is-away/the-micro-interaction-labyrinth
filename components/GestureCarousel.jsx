import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GestureCarousel Component
 * 
 * A performant, accessible carousel with:
 * - Drag/swipe gestures with momentum
 * - Keyboard navigation (arrow keys)
 * - Touch-friendly on mobile
 * - ARIA live regions for screen readers
 * - Respects prefers-reduced-motion
 * 
 * @param {Array} items - Array of items to display
 * @param {number} itemWidth - Width of each item in pixels
 * @param {Function} onSlideChange - Callback when slide changes
 */
export const GestureCarousel = ({
  items = [],
  itemWidth = 300,
  onSlideChange = () => {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    const swipeVelocityThreshold = 500;

    // Check swipe distance or velocity
    if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -swipeVelocityThreshold
    ) {
      // Swiped left - go to next
      goToSlide((currentIndex + 1) % items.length);
    } else if (
      info.offset.x > swipeThreshold ||
      info.velocity.x > swipeVelocityThreshold
    ) {
      // Swiped right - go to previous
      goToSlide((currentIndex - 1 + items.length) % items.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    onSlideChange(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      goToSlide((currentIndex + 1) % items.length);
    } else if (e.key === 'ArrowLeft') {
      goToSlide((currentIndex - 1 + items.length) % items.length);
    }
  };

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const transitionConfig = reducedMotion
    ? { duration: 0.01 }
    : { type: 'spring', stiffness: 300, damping: 30 };

  return (
    <div
      ref={carouselRef}
      className="relative w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900"
      role="region"
      aria-label="Image carousel"
      aria-live="polite"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Carousel Container */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -itemWidth * (items.length - 1), right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        onDragCapture={() => setIsDragging(true)}
        className="flex cursor-grab active:cursor-grabbing"
        style={{ width: itemWidth * items.length }}
      >
        <AnimatePresence mode="wait">
          {items.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitionConfig}
              className="flex-shrink-0"
              style={{ width: itemWidth }}
            >
              <div className="h-full flex items-center justify-center p-4">
                {item.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-blue-600 w-6'
                : 'bg-gray-400 w-2 hover:bg-gray-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* Keyboard hint for accessibility */}
      <div className="sr-only">
        Use arrow keys to navigate carousel. Current slide {currentIndex + 1} of{' '}
        {items.length}
      </div>
    </div>
  );
};

export default GestureCarousel;
