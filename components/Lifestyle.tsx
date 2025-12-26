import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Activity, ArrowUpRight, Camera, Target } from 'lucide-react';

const MODES = [
  {
    id: '01',
    title: 'STAY FOCUSED',
    description: 'Perfect for deep work, coding, or any time you need to lock in and get things done.',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '02',
    title: 'BE CREATIVE',
    description: 'A light mental boost that helps you stay open and inspired throughout your creative process.',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '03',
    title: 'GET ACTIVE',
    description: 'Clean metabolic energy for your morning run or evening workout. No heavy feeling.',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=1200'
  }
];

export const Lifestyle: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('01');

  return (
    <section id="lifestyle" className="py-24 md:py-32 bg-freesh-black relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 md:mb-16">
          <span className="text-freesh-lime text-xs font-bold uppercase tracking-widest block mb-4">Everyday Use</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white uppercase">Tailored Energy</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
           {MODES.map((mode) => {
             const isActive = activeId === mode.id;
             
             return (
               <motion.div
                 key={mode.id}
                 layout
                 onClick={() => setActiveId(mode.id)}
                 className={`relative overflow-hidden rounded-3xl cursor-pointer border transition-all duration-500 flex-1 group ${isActive ? 'lg:flex-[2.5] border-freesh-lime/40 shadow-xl' : 'border-white/10 hover:border-white/20'}`}
               >
                  <div className="absolute inset-0">
                     <img src={mode.image} className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'scale-105 opacity-60' : 'opacity-20 grayscale group-hover:opacity-30'}`} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>

                  <AnimatePresence mode="wait">
                    {!isActive ? (
                      <motion.div key="collapsed" className="absolute inset-0 flex items-center justify-center p-4 lg:rotate-[-90deg]">
                         <span className="font-display font-bold text-xl text-white/40 uppercase tracking-widest whitespace-nowrap group-hover:text-white transition-colors">{mode.title}</span>
                      </motion.div>
                    ) : (
                      <motion.div key="expanded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 p-8 flex flex-col justify-between">
                         <div className="flex justify-between items-start">
                            <div className="bg-freesh-lime text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Ritual 0{mode.id}</div>
                            <ArrowUpRight className="text-white/50" />
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-4">
                               <mode.icon size={28} className="text-freesh-lime" />
                               <h3 className="font-display font-bold text-3xl text-white leading-none">{mode.title}</h3>
                            </div>
                            <p className="text-white/70 max-w-sm text-lg font-light leading-relaxed">{mode.description}</p>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </motion.div>
             );
           })}
        </div>
      </div>
    </section>
  );
};