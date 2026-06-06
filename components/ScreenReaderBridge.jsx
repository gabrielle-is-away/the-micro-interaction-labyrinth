import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ScreenReaderBridge() {
  const [interactiveState, setInteractiveState] = useState('Idle');
  const [score, setScore] = useState(0);

  const handleInteraction = (stateName) => {
    setInteractiveState(stateName);
    setScore((prev) => prev + 10);
  };

  return (
    <div className="p-8 bg-slate-900 text-white rounded-3xl relative overflow-hidden shadow-2xl border border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Interactive Canvas Node</span>
          <h2 className="text-xl font-bold mt-1">Abstract Interaction Engine</h2>
        </div>
        
        {/* Dynamic ARIA Live region announce internal microstate updates */}
        <div 
          aria-live="polite" 
          className="sr-only"
        >
          {`Status changed to ${interactiveState}. Current process count is ${score} points.`}
        </div>

        <div className="px-3 py-1 bg-slate-800 border border-slate-700 text-xs font-mono rounded-lg flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live DOM Synced
        </div>
      </div>

      {/* Visual Canvas Playground Box */}
      <div className="h-48 w-full bg-slate-950 rounded-xl relative flex items-center justify-center border border-slate-800/80">
        <motion.div
          animate={{
            scale: interactiveState === 'Pulse' ? [1, 1.2, 1] : 1,
            rotate: interactiveState === 'Spin' ? [0, 360] : 0,
            x: interactiveState === 'Shift' ? [-20, 20, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
          className="h-16 w-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl shadow-xl shadow-indigo-500/20"
        />
        <div className="absolute bottom-3 right-3 text-[10px] text-slate-500 font-mono">
          Renderer: Canvas Emulation
        </div>
      </div>

      {/* Interface Handles */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {['Pulse', 'Spin', 'Shift'].map((action) => (
          <button
            key={action}
            onClick={() => handleInteraction(action)}
            className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 active:bg-indigo-600 rounded-xl border border-slate-700/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
          >
            Trigger {action}
          </button>
        ))}
      </div>
    </div>
  );
}
