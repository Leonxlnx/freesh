import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import {  Maximize2, Activity, Wind, Droplets } from 'lucide-react';

// --- Flavor Note Bar Component ---
const FlavorBar = ({ label, percentage, delay }: { label: string, percentage: string, delay: number }) => (
  <div className="flex flex-col gap-1 mb-4">
    <div className="flex justify-between text-[10px] uppercase tracking-wider text-freesh-muted font-mono">
      <span>{label}</span>
      <span>{percentage}</span>
    </div>
    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: percentage }}
        transition={{ duration: 1.5, delay, ease: "circOut" }}
        className="h-full bg-freesh-lime shadow-[0_0_10px_rgba(190,242,100,0.5)]"
      />
    </div>
  </div>
);

export const Visualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax & Scroll Animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]); // Text moves slower
  const yOrb = useTransform(scrollYProgress, [0, 1], [50, -100]); // Orb moves faster
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.9, 1.1]);

  // Mouse Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    x.set((clientX / innerWidth - 0.5) * -30); // Tilt amount
    y.set((clientY / innerHeight - 0.5) * -30);
  }

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-freesh-black flex items-center justify-center overflow-hidden py-24 md:py-32"
    >
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-freesh-black to-freesh-black" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* --- Background Typography (Parallax Layer 1) --- */}
      <motion.div 
        style={{ y: yText }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <h2 className="font-display font-black text-[18vw] md:text-[20vw] leading-none text-white/5 tracking-tighter select-none">
          FLAVOR
        </h2>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        
        {/* --- Left: The Flavor Core (Image & Interaction) --- */}
        <div className="lg:col-span-7 relative flex items-center justify-center h-[500px] md:h-auto">
           
           {/* Rotating Rings */}
           <motion.div 
             style={{ rotate }}
             className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-white/5 rounded-full border-dashed animate-[spin_60s_linear_infinite]" 
           />
           <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] border border-white/5 rounded-full opacity-50" 
           />

           {/* The Orb / Image Container */}
           <motion.div
             style={{ y: yOrb, scale, rotateX: mouseY, rotateY: mouseX }}
             className="relative w-[280px] h-[380px] md:w-[450px] md:h-[600px] rounded-[60px] md:rounded-[100px] overflow-hidden border border-white/10 bg-black shadow-2xl perspective-1000"
           >
              {/* Image Source - Real Drink/Liquid */}
              <div className="absolute inset-0 bg-black">
                 <img 
                   src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2787&auto=format&fit=crop" 
                   alt="Yuzu and Basil Drink" 
                   className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                 />
                 {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-freesh-lime/10 mix-blend-overlay" />
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                 <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-xs font-mono text-freesh-lime mb-1">NOTES</span>
                      <span className="font-display font-bold text-2xl md:text-3xl text-white">YUZU</span>
                    </div>
                    <div className="h-px flex-1 bg-white/20 mx-4 mb-2" />
                    <div className="text-right">
                      <span className="block text-xs font-mono text-freesh-lime mb-1">&nbsp;</span>
                      <span className="font-display font-bold text-2xl md:text-3xl text-white">BASIL</span>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* --- Right: The Specs / Data (HUD) --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
           {/* Glass Panel */}
           <div className="glass-panel p-6 md:p-10 rounded-3xl relative overflow-hidden group">
              
              {/* Decoration Line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-freesh-lime/50" />
              
              <div className="flex items-start justify-between mb-8">
                <div>
                   <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">The Taste</h3>
                   <p className="text-freesh-muted text-sm">Bright, Herbaceous, Refreshing.</p>
                </div>
                <Activity className="text-freesh-lime opacity-80" />
              </div>

              <p className="text-gray-400 mb-8 leading-relaxed font-light text-sm md:text-base">
                A complex mix of bright citrus (Limonene) and grounding basil. 
                Designed to wake up your palate and your <span className="text-white font-medium">mind</span> instantly.
              </p>

              {/* Flavor Bars */}
              <div className="space-y-2 mb-8 border-t border-white/5 pt-6">
                 <FlavorBar label="Citrus Punch" percentage="85%" delay={0.2} />
                 <FlavorBar label="Herbal Depth" percentage="65%" delay={0.3} />
                 <FlavorBar label="Sweetness" percentage="12%" delay={0.4} />
                 <FlavorBar label="Sparkle" percentage="90%" delay={0.5} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                    <Wind size={20} className="text-freesh-lime" />
                    <span className="text-xs uppercase font-bold text-white">Aromatic</span>
                 </div>
                 <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                    <Droplets size={20} className="text-blue-400" />
                    <span className="text-xs uppercase font-bold text-white">Hydrating</span>
                 </div>
              </div>

              {/* Corner Accents */}
              <Maximize2 size={16} className="absolute top-4 right-4 text-white/20" />
           </div>
        </motion.div>

      </div>
    </section>
  );
};