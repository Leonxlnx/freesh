import React, { useRef, useEffect } from 'react';
import { METRICS } from '../constants';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingDown, Zap, Activity, Timer } from 'lucide-react';

// --- Animated Counter Component ---
const Counter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { stiffness: 50, damping: 20, duration: duration * 1000 });
  
  // Transform spring value to formatted string
  const displayValue = useTransform(spring, (current) => {
    if (Number.isInteger(value)) return Math.round(current);
    return current.toFixed(1);
  });

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// --- Graph Visualization Components ---

const LatencyGraph = () => (
  <svg viewBox="0 0 100 40" className="w-full h-16 opacity-80 overflow-visible">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.2 }} />
        <stop offset="100%" style={{ stopColor: '#bef264', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    {/* Dashed Baseline */}
    <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" />
    
    {/* Animated Path: High to Low */}
    <motion.path 
      d="M0,5 Q40,5 50,20 T100,35" 
      fill="none" 
      stroke="url(#grad1)" 
      strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.circle cx="100" cy="35" r="3" fill="#bef264" 
       initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2 }} 
    />
  </svg>
);

const FocusBar = () => (
   <div className="w-full h-16 flex items-end gap-1">
      {[...Array(12)].map((_, i) => (
         <motion.div
           key={i}
           initial={{ height: "20%", opacity: 0.2 }}
           whileInView={{ height: `${40 + Math.random() * 60}%`, opacity: i > 8 ? 1 : 0.4 + (i * 0.05) }}
           transition={{ duration: 1, delay: i * 0.1 }}
           className={`flex-1 rounded-t-sm ${i > 8 ? 'bg-freesh-lime' : 'bg-white/20'}`}
         />
      ))}
   </div>
);

const CrashComparison = () => (
  <div className="relative w-full h-16 pt-4">
    {/* Competitor Line (Crash) */}
    <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full overflow-visible">
       <motion.path 
         d="M0,35 L20,10 L40,35 L60,38 L100,38" 
         fill="none" 
         stroke="#ef4444" 
         strokeWidth="1"
         strokeDasharray="4 2"
         opacity="0.5"
         initial={{ pathLength: 0 }}
         whileInView={{ pathLength: 1 }}
         transition={{ duration: 2 }}
       />
       {/* Freesh Line (Stable) */}
       <motion.path 
         d="M0,35 L20,30 L40,25 L60,25 L100,24" 
         fill="none" 
         stroke="#bef264" 
         strokeWidth="2"
         initial={{ pathLength: 0 }}
         whileInView={{ pathLength: 1 }}
         transition={{ duration: 2, delay: 0.5 }}
       />
    </svg>
    <div className="absolute top-0 right-0 text-[9px] text-red-400 font-mono">Coffee</div>
    <div className="absolute bottom-0 right-0 text-[9px] text-freesh-lime font-mono">Freesh</div>
  </div>
);

// --- Main Component ---
export const DataSection: React.FC = () => {
  return (
    <section id="data" className="py-24 md:py-32 bg-freesh-black relative scroll-mt-20 border-t border-white/5">
      
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-20">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freesh-lime/10 border border-freesh-lime/20 mb-6">
                 <Activity size={14} className="text-freesh-lime" />
                 <span className="text-xs font-mono uppercase text-freesh-lime tracking-widest">Proven Results</span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                REAL <br/> PERFORMANCE
              </h2>
           </div>
           <div className="max-w-md text-right md:text-left mt-6 md:mt-0">
             <p className="text-freesh-muted text-sm leading-relaxed border-l border-white/10 pl-6">
               Comparing Freesh against standard caffeine and placebo groups. Real numbers, no hype.
             </p>
           </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Latency */}
          <div className="group bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden">
             <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="p-3 rounded-lg bg-white/5 text-white/70"><Timer size={20} /></div>
                <div className="text-[10px] font-mono uppercase text-white/30 tracking-widest">Speed</div>
             </div>
             
             <div className="mb-4">
                <div className="flex items-baseline gap-1 text-white">
                   <span className="text-4xl md:text-5xl font-display font-bold"><Counter value={42} /></span>
                   <span className="text-xl font-display font-bold">%</span>
                </div>
                <h3 className="text-freesh-lime text-sm font-mono uppercase tracking-wider mt-2">Faster Reaction</h3>
             </div>

             <div className="h-20 w-full mt-8">
                <LatencyGraph />
             </div>
             
             <p className="text-xs text-freesh-muted mt-4 opacity-60">Improvement in reaction time tests.</p>
          </div>

          {/* Card 2: Focus Duration */}
          <div className="group bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden">
             <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="p-3 rounded-lg bg-white/5 text-white/70"><Zap size={20} /></div>
                <div className="text-[10px] font-mono uppercase text-white/30 tracking-widest">Duration</div>
             </div>
             
             <div className="mb-4">
                <div className="flex items-baseline gap-1 text-white">
                   <span className="text-4xl md:text-5xl font-display font-bold"><Counter value={6.5} /></span>
                   <span className="text-xl font-display font-bold text-white/50">HRS</span>
                </div>
                <h3 className="text-freesh-lime text-sm font-mono uppercase tracking-wider mt-2">Steady Flow</h3>
             </div>

             <div className="h-20 w-full mt-8 flex items-end">
                <FocusBar />
             </div>

             <p className="text-xs text-freesh-muted mt-4 opacity-60">Hours of sustained focus without jitters.</p>
          </div>

          {/* Card 3: Crash Index */}
          <div className="group bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden">
             <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="p-3 rounded-lg bg-white/5 text-white/70"><TrendingDown size={20} /></div>
                <div className="text-[10px] font-mono uppercase text-white/30 tracking-widest">After Effects</div>
             </div>
             
             <div className="mb-4">
                <div className="flex items-baseline gap-1 text-white">
                   <span className="text-4xl md:text-5xl font-display font-bold">ZERO</span>
                </div>
                <h3 className="text-freesh-lime text-sm font-mono uppercase tracking-wider mt-2">Sugar Crash</h3>
             </div>

             <div className="h-20 w-full mt-8 flex items-center">
                <CrashComparison />
             </div>

             <p className="text-xs text-freesh-muted mt-4 opacity-60">No sudden energy drop-off in the afternoon.</p>
          </div>

        </div>

      </div>
    </section>
  );
};