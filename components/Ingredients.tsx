import React, { useState } from 'react';
import { INGREDIENTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Shield } from 'lucide-react';

const IMAGES = [
  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=1200", // L-Theanine (Green Tea Leaves) - FIXED
  "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=1200", // Mushrooms
  "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1200", // Coffee
  "https://images.unsplash.com/photo-1515037028865-0a2a82603f7c?auto=format&fit=crop&q=80&w=1200"  // Rhodiola Roots - FIXED
];

export const Ingredients: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="compound" className="py-24 md:py-32 bg-freesh-black relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
           <div className="max-w-2xl">
              <span className="text-freesh-lime text-xs font-bold uppercase tracking-widest block mb-4">Quality Ingredients</span>
              <h2 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight leading-none">
                OUR UNIQUE <br/> FORMULA
              </h2>
           </div>
           <p className="text-freesh-muted max-w-sm text-lg font-light leading-relaxed">
             We use premium, natural ingredients that work together to provide a clean, steady lift.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:h-[600px]">
          <div className="lg:col-span-5 flex flex-col justify-center gap-3 order-2 lg:order-1">
             {INGREDIENTS.map((ing, idx) => {
               const isActive = activeIndex === idx;
               return (
                 <motion.div 
                   key={idx}
                   onMouseEnter={() => setActiveIndex(idx)}
                   onClick={() => setActiveIndex(idx)}
                   className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${isActive ? 'bg-white/5 border-freesh-lime/30' : 'border-white/5 hover:bg-white/[0.02]'}`}
                 >
                    <div className="flex justify-between items-center">
                       <div>
                          <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${isActive ? 'text-freesh-lime' : 'text-freesh-muted'}`}>
                            Benefit 0{idx + 1}
                          </span>
                          <h3 className={`font-display text-2xl font-bold ${isActive ? 'text-white' : 'text-white/40'}`}>
                            {ing.name}
                          </h3>
                       </div>
                       <ArrowRight size={20} className={`transition-all ${isActive ? 'text-freesh-lime opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} />
                    </div>
                 </motion.div>
               );
             })}
          </div>

          <div className="lg:col-span-7 relative h-[400px] lg:h-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-freesh-dark order-1 lg:order-2">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeIndex}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }}
                 className="absolute inset-0"
               >
                 <img src={IMAGES[activeIndex]} className="w-full h-full object-cover opacity-60" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
               </motion.div>
             </AnimatePresence>

             <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.div 
                   key={`desc-${activeIndex}`}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="max-w-md"
                >
                   <div className="flex gap-8 mb-6 text-sm font-medium">
                      <div className="flex items-center gap-2 text-freesh-lime"><Leaf size={16} /> {INGREDIENTS[activeIndex].scientificName}</div>
                      <div className="flex items-center gap-2 text-white/70"><Shield size={16} /> {INGREDIENTS[activeIndex].dosage} Serving</div>
                   </div>
                   <p className="text-xl text-white font-light leading-relaxed">
                     {INGREDIENTS[activeIndex].function}
                   </p>
                </motion.div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};