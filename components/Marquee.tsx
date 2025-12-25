import React from 'react';
import { motion } from 'framer-motion';

export const Marquee: React.FC = () => {
  const words = ["KINETIC", "HYDRATION", "COGNITIVE", "PRECISION", "FLOW", "STATE", "ZERO", "CRASH"];
  
  return (
    <div className="relative py-8 bg-freesh-black border-y border-white/5 overflow-hidden z-20">
      
      {/* Gradient Masks for Fade Edge Effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-freesh-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-freesh-black to-transparent z-10 pointer-events-none" />

      <motion.div 
        className="flex whitespace-nowrap items-center gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {/* Triple content for seamless loop */}
        {[...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-default">
            
            {/* Text */}
            <span className="font-display font-bold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">
              {word}
            </span>

            {/* Separator - Barcode Style */}
            <div className="flex gap-1 h-8 items-center opacity-30">
               <div className="w-[1px] h-full bg-freesh-lime" />
               <div className="w-[2px] h-2/3 bg-freesh-lime" />
               <div className="w-[1px] h-full bg-freesh-lime" />
            </div>

          </div>
        ))}
      </motion.div>
    </div>
  );
};