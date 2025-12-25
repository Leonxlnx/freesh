import React, { useState } from 'react';
import { INGREDIENTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Dna, Activity, ArrowRight, Leaf } from 'lucide-react';

const IMAGES = [
  "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=2070&auto=format&fit=crop", // Green Tea
  "https://images.unsplash.com/photo-1625944299557-ad6d7b4a2404?q=80&w=2070&auto=format&fit=crop", // Mushroom Texture
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2070&auto=format&fit=crop", // Coffee
  "https://images.unsplash.com/photo-1620216669986-e575727183e2?q=80&w=2070&auto=format&fit=crop"  // Roots
];

export const Ingredients: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="compound" className="py-24 md:py-32 bg-freesh-dark relative overflow-hidden scroll-mt-20">
      
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-20 gap-8">
           <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 bg-freesh-lime animate-pulse rounded-full" />
                 <span className="text-freesh-lime text-xs font-mono uppercase tracking-[0.2em]">Pure Ingredients</span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight leading-[0.9]">
                WHAT'S <br/> INSIDE
              </h2>
           </div>
           <p className="text-freesh-muted max-w-sm text-sm border-l border-white/10 pl-6 leading-relaxed">
             No fillers. No hidden blends. Just effective, high-quality ingredients you can pronounce.
           </p>
        </div>

        {/* --- Main Interactive Interface --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:h-[600px]">
          
          {/* LEFT: The List (Control Panel) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-2 order-2 lg:order-1">
             {INGREDIENTS.map((ing, idx) => {
               const isActive = activeIndex === idx;
               return (
                 <motion.div 
                   key={idx}
                   onMouseEnter={() => setActiveIndex(idx)}
                   onClick={() => setActiveIndex(idx)}
                   initial={false}
                   animate={{ 
                     backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                     borderColor: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
                     x: isActive ? 10 : 0
                   }}
                   className="group cursor-pointer relative border rounded-xl p-5 md:p-6 transition-all duration-300 active:scale-95 md:active:scale-100"
                 >
                    <div className="flex justify-between items-center relative z-10">
                       <div>
                          <span className={`text-[10px] font-mono uppercase tracking-widest mb-1 block transition-colors ${isActive ? 'text-freesh-lime' : 'text-freesh-muted'}`}>
                            Ingredient 0{idx + 1}
                          </span>
                          <h3 className={`font-display text-xl md:text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'text-white/40'}`}>
                            {ing.name}
                          </h3>
                       </div>
                       <ArrowRight 
                         size={18} 
                         className={`transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 text-freesh-lime' : 'opacity-0 -translate-x-4'}`} 
                       />
                    </div>
                    
                    {/* Active Glow Bar */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-freesh-lime rounded-l-xl"
                      />
                    )}
                 </motion.div>
               );
             })}
          </div>

          {/* RIGHT: The Display (Scanner View) */}
          <div className="lg:col-span-7 relative h-[400px] lg:h-full rounded-[2rem] overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm order-1 lg:order-2">
             
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeIndex}
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.6 }}
                 className="absolute inset-0 z-0"
               >
                 <img 
                   src={IMAGES[activeIndex % IMAGES.length]} 
                   alt="Ingredient Macro" 
                   className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                 />
                 {/* Cinematic Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                 
               </motion.div>
             </AnimatePresence>

             {/* HUD Overlay Data */}
             <div className="absolute inset-0 z-10 p-6 md:p-12 flex flex-col justify-end">
                
                <motion.div 
                   key={`text-${activeIndex}`}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                   className="relative"
                >
                   {/* Technical Specs Grid */}
                   <div className="grid grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8 border-t border-white/10 pt-6 md:pt-8">
                      <div>
                         <div className="flex items-center gap-2 text-freesh-lime mb-2">
                            <Leaf size={16} />
                            <span className="text-[10px] font-mono uppercase tracking-widest">Source</span>
                         </div>
                         <p className="text-white font-mono text-xs md:text-sm opacity-80">{INGREDIENTS[activeIndex].scientificName}</p>
                      </div>
                      <div>
                         <div className="flex items-center gap-2 text-freesh-lime mb-2">
                            <Microscope size={16} />
                            <span className="text-[10px] font-mono uppercase tracking-widest">Dosage</span>
                         </div>
                         <p className="text-white font-mono text-sm opacity-80">{INGREDIENTS[activeIndex].dosage}</p>
                      </div>
                   </div>

                   {/* Main Function Description */}
                   <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-xl">
                      <div className="flex items-center gap-2 mb-3 text-freesh-lime">
                         <Activity size={16} />
                         <span className="text-[10px] font-mono uppercase tracking-widest">Primary Benefit</span>
                      </div>
                      <p className="text-base md:text-lg text-white font-light leading-relaxed">
                        {INGREDIENTS[activeIndex].function}
                      </p>
                   </div>
                </motion.div>

                {/* Decorative HUD Corner */}
                <div className="absolute top-8 right-8 hidden md:block">
                   <div className="w-16 h-16 border-t border-r border-white/20 rounded-tr-3xl" />
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
};