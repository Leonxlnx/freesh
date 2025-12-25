import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Sparkles, Brain, Zap, Fingerprint } from 'lucide-react';

// --- Micro-Interaction Card Component ---
const FeatureCard = ({ title, desc, icon: Icon, delay }: { title: string, desc: string, icon: any, delay: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative bg-freesh-dark/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-white/10 transition-colors"
    >
      {/* Mouse Follow Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(190, 242, 100, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-freesh-lime mb-6 group-hover:scale-110 group-hover:bg-freesh-lime group-hover:text-black transition-all duration-500">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-freesh-muted leading-relaxed text-sm font-light border-l border-white/10 pl-4">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export const Manifesto: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="manifesto" ref={sectionRef} className="py-32 md:py-48 bg-freesh-black relative overflow-hidden scroll-mt-20">
      
      {/* --- Ambient Background --- */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-freesh-lime/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Top Editorial Section --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center mb-32">
          
          {/* Typography */}
          <motion.div 
            style={{ opacity: opacityText }}
            className="lg:col-span-7 relative z-20"
          >
             <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-freesh-lime" />
                <span className="text-freesh-lime font-mono text-xs uppercase tracking-[0.2em]">Our Philosophy</span>
             </div>
             
             <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tighter mb-8">
               DON'T BORROW <br/>
               <span className="text-white/20">ENERGY.</span> <br/>
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-freesh-lime via-white to-freesh-lime animate-pulse">
                 GENERATE IT.
               </span>
             </h2>

             <div className="max-w-md ml-auto lg:ml-12 border-l border-white/20 pl-8">
               <p className="text-lg text-freesh-muted font-light leading-relaxed">
                 Caffeine is often a loan with high interest. Freesh is different. 
                 We build <span className="text-white font-medium">consistent energy</span> using plants and mushrooms.
                 No spikes. No debt. Just pure, sustainable output.
               </p>
             </div>
          </motion.div>
          
          {/* Parallax Image */}
          <div className="lg:col-span-5 relative h-[500px] w-full">
             <motion.div 
               style={{ y: yImage }}
               className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-freesh-black via-transparent to-transparent z-10" />
                
                <img 
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Water Ripples" 
                  className="w-full h-full object-cover scale-110"
                />
             </motion.div>
             
          </div>
        </div>

        {/* --- Feature Grid with Magnetic Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <FeatureCard 
             delay={0}
             icon={Brain}
             title="Calm Alertness"
             desc="L-Theanine creates a 'calm alert' state, smoothing out the rough edges of caffeine so you can actually focus."
           />
           <FeatureCard 
             delay={0.1}
             icon={Fingerprint}
             title="Natural Ingredients"
             desc="We use ingredients your body actually recognizes, sourced from nature, not a lab."
           />
           <FeatureCard 
             delay={0.2}
             icon={Zap}
             title="Steady Release"
             desc="Energy that lasts over 6 hours, rather than hitting you all at once and leaving you crashed."
           />
        </div>

      </div>
    </section>
  );
};