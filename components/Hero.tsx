import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/Button';

interface HeroProps {
  onCta?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCta }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-freesh-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-freesh-lime/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
           <span className="text-xs font-semibold uppercase tracking-[0.2em] text-freesh-lime">
             Natural Energy for Professionals
           </span>
        </motion.div>

        <div className="mb-8">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="font-display font-bold text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none"
           >
             REFRESHINGLY <br/>
             <span className="text-freesh-lime">CLEAR.</span>
           </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-freesh-muted text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10"
        >
          A clean boost of focus for your busiest days. No jitters, no sugar, just the energy you need to stay on track.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button onClick={onCta} className="w-full sm:w-auto px-12 py-5 text-lg">
            Shop Freesh
          </Button>
          <button onClick={onCta} className="text-white hover:text-freesh-lime transition-colors font-medium border-b border-white/20 pb-1">
            View Our Ingredients
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};