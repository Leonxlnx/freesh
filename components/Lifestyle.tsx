import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Activity, ArrowUpRight, Aperture, Layers } from 'lucide-react';

const MODES = [
  {
    id: '01',
    title: 'DEEP FOCUS',
    subtitle: 'Heads Down',
    description: 'Tune out the noise. Perfect for coding, writing, or whenever you need to lock in for a few hours.',
    metrics: { hz: 'Steady', type: 'Flow State', duration: '4h+' },
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2532&auto=format&fit=crop' // Coding
  },
  {
    id: '02',
    title: 'CREATIVE SESSION',
    subtitle: 'Big Picture',
    description: 'Relaxed alertness. Great for brainstorming, design work, or connecting the dots.',
    metrics: { hz: 'Relaxed', type: 'Open Mind', duration: 'Variable' },
    icon: Aperture,
    image: 'https://images.unsplash.com/photo-1499750310159-52f0f913202c?q=80&w=2574&auto=format&fit=crop' // Notebook/Writing
  },
  {
    id: '03',
    title: 'ACTIVE',
    subtitle: 'Keep Moving',
    description: 'Clean energy for your workout or a long hike. No heavy stomach feeling, just go.',
    metrics: { hz: 'Active', type: 'Endurance', duration: '6h' },
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop' // Active
  }
];

export const Lifestyle: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('01');

  return (
    <section className="py-24 md:py-32 bg-freesh-black relative border-t border-white/5 overflow-hidden">
      
      {/* HUD Lines Background */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-10 bottom-0 w-px bg-white/5" />
         <div className="absolute top-0 right-10 bottom-0 w-px bg-white/5" />
         <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
             <div className="flex items-center gap-3 mb-4">
                <Layers size={16} className="text-freesh-lime" />
                <span className="text-freesh-lime font-mono text-xs uppercase tracking-[0.2em]">Use Cases</span>
             </div>
             <h2 className="font-display font-bold text-4xl md:text-5xl text-white">YOUR DAY, UPGRADED</h2>
          </div>
          <div className="hidden md:block text-right">
             <span className="block text-freesh-muted font-mono text-xs uppercase tracking-widest">Select Vibe</span>
             <span className="block text-white font-mono text-xl">01 — 03</span>
          </div>
        </div>

        {/* Interactive Accordion */}
        <div className="flex flex-col lg:flex-row gap-4 h-[600px] md:h-[600px]">
           {MODES.map((mode) => {
             const isActive = activeId === mode.id;
             
             return (
               <motion.div
                 key={mode.id}
                 layout
                 onClick={() => setActiveId(mode.id)}
                 className={`relative overflow-hidden rounded-2xl cursor-pointer border transition-colors duration-500 ease-out group ${
                   isActive ? 'lg:flex-[3] border-freesh-lime/50' : 'lg:flex-[1] border-white/5 hover:border-white/20'
                 }`}
               >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                     <img 
                       src={mode.image} 
                       alt={mode.title} 
                       className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105 saturate-100' : 'scale-110 saturate-0 opacity-40 group-hover:opacity-60'}`} 
                     />
                     <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-90'}`} />
                     
                     {/* Scanline Effect */}
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                  </div>

                  {/* Vertical Label (Inactive State) */}
                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center lg:rotate-[-90deg]">
                       <span className="font-display font-bold text-2xl text-white/50 tracking-widest whitespace-nowrap group-hover:text-white transition-colors">
                          {mode.title}
                       </span>
                    </div>
                  )}

                  {/* Active Content */}
                  <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-between transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                     
                     {/* Top Bar */}
                     <div className="flex justify-between items-start">
                        <div className="bg-freesh-lime text-black px-3 py-1 rounded text-xs font-mono font-bold uppercase">
                           Mode_{mode.id}
                        </div>
                        <ArrowUpRight className="text-white opacity-50" />
                     </div>

                     {/* Middle Data (Only visible on large expanded) */}
                     <div className="hidden lg:grid grid-cols-3 gap-8 border-t border-white/20 pt-8 mt-auto mb-12">
                        <div>
                           <span className="block text-[10px] text-freesh-muted uppercase tracking-wider mb-1">Target State</span>
                           <span className="block text-xl font-mono text-white">{mode.metrics.hz}</span>
                        </div>
                        <div>
                           <span className="block text-[10px] text-freesh-muted uppercase tracking-wider mb-1">Feeling</span>
                           <span className="block text-xl font-mono text-white">{mode.metrics.type}</span>
                        </div>
                        <div>
                           <span className="block text-[10px] text-freesh-muted uppercase tracking-wider mb-1">Duration</span>
                           <span className="block text-xl font-mono text-white">{mode.metrics.duration}</span>
                        </div>
                     </div>

                     {/* Bottom Info */}
                     <div>
                        <div className="flex items-center gap-3 mb-4">
                           <mode.icon size={24} className="text-freesh-lime" />
                           <h3 className="font-display font-bold text-3xl md:text-4xl text-white">{mode.title}</h3>
                        </div>
                        <p className="text-freesh-muted max-w-md text-base md:text-lg font-light leading-relaxed">
                           {mode.description}
                        </p>
                     </div>
                  </div>

                  {/* Hover Overlay Flash */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
               </motion.div>
             );
           })}
        </div>
      </div>
    </section>
  );
};