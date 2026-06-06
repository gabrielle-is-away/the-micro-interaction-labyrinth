import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccessibleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const modalRef = useRef(null);

  // Handle escape key and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }

      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements) return;
        
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus the first element inside modal upon opening
    setTimeout(() => {
      const firstInput = modalRef.current?.querySelector('button, input');
      firstInput?.focus();
    }, 50);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
      {/* Trigger Card Button */}
      {!isOpen && (
        <motion.button
          ref={triggerRef}
          layoutId="modal-container"
          onClick={() => setIsOpen(true)}
          className="flex flex-col p-6 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-indigo-500 max-w-sm cursor-pointer"
        >
          <motion.span layoutId="modal-title" className="text-lg font-bold text-slate-900">
            View Analytics Report
          </motion.span>
          <motion.span layoutId="modal-desc" className="text-sm text-slate-500 mt-1">
            Click to expand and explore user engagement metrics for Q3.
          </motion.span>
        </motion.button>
      )}

      {/* Actual Expanded Modal Backdrop and Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Modal Content Window */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                ref={modalRef}
                layoutId="modal-container"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-heading"
                className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 flex flex-col motion-reduce:transition-none"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h2 
                      id="modal-heading" 
                      layoutId="modal-title" 
                      className="text-2xl font-black text-slate-900"
                    >
                      View Analytics Report
                    </motion.h2>
                    <motion.p 
                      layoutId="modal-desc" 
                      className="text-slate-500 text-sm mt-1"
                    >
                      Click to expand and explore user engagement metrics for Q3.
                    </motion.p>
                  </div>
                  <button
                    onClick={handleClose}
                    aria-label="Close modal"
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                  >
                    ✕
                  </button>
                </div>

                {/* Substantive Animated Data (Mock Data) */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                  className="mt-6 space-y-4 border-t border-slate-100 pt-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-4 rounded-xl">
                      <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Total Views</div>
                      <div className="text-2xl font-bold text-indigo-950 mt-1">142,384</div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl">
                      <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Conversion</div>
                      <div className="text-2xl font-bold text-emerald-950 mt-1">4.2%</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    User engagement spiked by 24% following the deployment of micro-interactions across core product paths.
                  </p>
                </motion.div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => alert('Data Exported')}
                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                  >
                    Download CSV
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
