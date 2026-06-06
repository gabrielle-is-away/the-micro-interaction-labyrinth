import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const menuItems = [
  { title: 'Features', description: 'Explore tools & plugins' },
  { title: 'Enterprise', description: 'Scalable infrastructure' },
  { title: 'Pricing', description: 'Flexible plans for teams' }
];

export default function AdaptiveMegaMenu() {
  const [activeTab, setActiveTab] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  // Unified animations array that instantly bypasses animations if flags match
  const dropdownVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.95 },
    visible: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.15 } }
  };

  return (
    <nav 
      aria-label="Main Navigation Menu" 
      className="relative z-30 flex gap-4 p-4 bg-white border border-slate-200 shadow-sm rounded-2xl max-w-xl mx-auto"
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setActiveTab(index)}
          onMouseLeave={() => setActiveTab(null)}
        >
          {/* Main Accessible Button Element */}
          <button
            aria-expanded={activeTab === index}
            aria-haspopup="true"
            aria-controls={`menu-panel-${index}`}
            onFocus={() => setActiveTab(index)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setActiveTab(null);
              }
            }}
            className="px-4 py-2 text-sm font-semibold rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
          >
            {item.title}
          </button>

          {/* Sliding Backdrop Visual Indicator (Only if motion is allowed) */}
          <AnimatePresence>
            {activeTab === index && !shouldReduceMotion && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-indigo-50/60 rounded-lg -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </AnimatePresence>

          {/* Expanded Mega Panel */}
          <AnimatePresence>
            {activeTab === index && (
              <motion.div
                id={`menu-panel-${index}`}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute left-0 mt-2 w-64 p-4 bg-white border border-slate-100 rounded-xl shadow-xl z-50 origin-top"
              >
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</h3>
                <p className="text-sm font-medium text-slate-800 mt-1">{item.description}</p>
                <div className="mt-4 space-y-2">
                  <a href="#" className="block text-xs text-indigo-600 hover:underline font-semibold focus-visible:ring-2 focus-visible:ring-indigo-500 p-1 rounded">
                    Documentation Portal →
                  </a>
                  <a href="#" className="block text-xs text-indigo-600 hover:underline font-semibold focus-visible:ring-2 focus-visible:ring-indigo-500 p-1 rounded">
                    API Reference Code →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}
