import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/Button';
import { Play } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-freesh-black">
      
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-freesh-black" />
        {/* Subtle Gradient Spotlights */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-freesh-lime/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Fine Grain */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      {/* --- Main Content --- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 container mx-auto px-6 pt-32 md:pt-20 text-center flex flex-col items-center"
      >
        {/* Overline - Simplified */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex items-center gap-3"
        >
           <span className="h-px w-8 md:w-12 bg-freesh-lime/30" />
           <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-freesh-lime">
             Natural Focus
           </span>
           <span className="h-px w-8 md:w-12 bg-freesh-lime/30" />
        </motion.div>

        {/* Headline - Responsive Sizes */}
        <div className="relative mb-8 flex flex-col items-center w-full">
           <div className="overflow-hidden">
             <motion.h1 
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
               className="font-display font-bold text-[13vw] md:text-8xl lg:text-9xl text-white tracking-tight leading-[0.9]"
             >
               CLEAR
             </motion.h1>
           </div>
           <div className="overflow-hidden">
             <motion.h1 
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
               className="font-display font-bold text-[13vw] md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-freesh-muted via-white to-freesh-muted tracking-tight leading-[0.9]"
             >
               MIND.
             </motion.h1>
           </div>
        </div>

        {/* Value Prop */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-freesh-muted text-base md:text-xl font-light leading-relaxed max-w-[90%] md:max-w-[600px] mx-auto mb-12"
        >
          A clean, steady lift for your workday. No jitters, no sugar crash—just you, but sharper.
        </motion.p>
        
        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button className="w-full sm:w-auto min-w-[160px]">
            Shop Now
          </Button>
          <button className="w-full sm:w-auto group px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-3 text-white">
             <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
               <Play size={10} fill="currentColor" />
             </div>
             <span className="text-sm font-medium tracking-wide">Our Story</span>
          </button>
        </motion.div>
      </motion.div>

    </section>
  );
};