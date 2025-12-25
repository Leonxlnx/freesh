import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { ShoppingBag, Check, RotateCcw, Box, ShieldCheck } from 'lucide-react';

const TECH_SPECS = [
  { label: "Material", value: "Recycled Aluminium" },
  { label: "Finish", value: "Matte Grip" },
  { label: "Volume", value: "330ml / 11.2oz" },
  { label: "Dosage", value: "4.2g Active" },
];

const PRICING = {
  single: { price: 45, label: "One-Time Purchase", desc: "12-Pack Case" },
  sub: { price: 38, label: "Subscribe & Save", desc: "Delivered Monthly (-15%)" }
};

export const ProductShowcase: React.FC = () => {
  const [plan, setPlan] = useState<'single' | 'sub'>('sub');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yCan = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateCan = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section id="shop" ref={containerRef} className="py-24 md:py-32 bg-freesh-black relative overflow-hidden scroll-mt-20 border-t border-white/5">
       
       {/* Background Noise & Glow */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-freesh-lime/5 blur-[150px] rounded-full pointer-events-none" />

       <div className="container mx-auto px-6 relative z-10">
         
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* --- LEFT: The Artifact (Visual) --- */}
            <div className="lg:col-span-6 relative h-[450px] md:h-[600px] flex items-center justify-center group">
               
               {/* Behind Elements */}
               <div className="absolute inset-0 border border-white/5 rounded-[3rem] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] border border-dashed border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
               </div>

               {/* Floating Product */}
               <motion.div 
                 style={{ y: yCan, rotate: rotateCan }}
                 className="relative z-10 w-full max-w-[200px] md:max-w-sm aspect-[3/5] drop-shadow-2xl"
               >
                  {/* 
                      Premium Can Mockup
                  */}
                  <img 
                    src="https://images.unsplash.com/photo-1625708468763-7988354c4c95?q=80&w=2000&auto=format&fit=crop" 
                    alt="The Vessel" 
                    className="w-full h-full object-cover rounded-[2rem] mask-image-gradient"
                    style={{ maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }}
                  />
                  
                  {/* Reflection Overlay */}
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/20 to-transparent mix-blend-overlay opacity-50" />
                  
                  {/* Floating Tag */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-10 -right-4 md:-right-10 bg-freesh-lime text-freesh-black px-3 md:px-4 py-1 md:py-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg"
                  >
                    Yuzu + Basil
                  </motion.div>
               </motion.div>
            </div>

            {/* --- RIGHT: The Interface (Commerce) --- */}
            <div className="lg:col-span-6">
               
               <div className="mb-8 md:mb-10">
                  <div className="flex items-center gap-3 mb-4">
                     <span className="h-px w-8 bg-freesh-lime" />
                     <span className="text-freesh-lime font-mono text-xs uppercase tracking-widest">In Stock</span>
                  </div>
                  <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6">THE CAN</h2>
                  <p className="text-freesh-muted text-base md:text-lg font-light leading-relaxed max-w-md">
                     Cold matte finish. Recycled aluminum. 12 cans of our signature Yuzu & Basil blend, ready to keep you moving.
                  </p>
               </div>

               {/* Tech Specs Grid */}
               <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 md:mb-10 py-6 md:py-8 border-y border-white/5">
                  {TECH_SPECS.map((spec, i) => (
                    <div key={i}>
                       <span className="block text-[10px] font-mono text-freesh-muted uppercase tracking-widest mb-1">{spec.label}</span>
                       <span className="text-white font-medium text-sm md:text-base">{spec.value}</span>
                    </div>
                  ))}
               </div>

               {/* Selection Interface */}
               <div className="space-y-4 mb-8 md:mb-10">
                  {/* Option: Subscribe */}
                  <div 
                    onClick={() => setPlan('sub')}
                    className={`cursor-pointer relative p-5 md:p-6 rounded-xl border transition-all duration-300 ${plan === 'sub' ? 'bg-white/5 border-freesh-lime/50' : 'bg-transparent border-white/10 hover:border-white/20'}`}
                  >
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                           <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${plan === 'sub' ? 'border-freesh-lime' : 'border-white/30'}`}>
                              {plan === 'sub' && <div className="w-2.5 h-2.5 rounded-full bg-freesh-lime" />}
                           </div>
                           <div>
                              <span className={`block font-display font-bold text-base md:text-lg ${plan === 'sub' ? 'text-white' : 'text-white/60'}`}>{PRICING.sub.label}</span>
                              <span className="text-[10px] md:text-xs text-freesh-muted font-mono">{PRICING.sub.desc}</span>
                           </div>
                        </div>
                        <span className="font-mono text-lg md:text-xl text-white">${PRICING.sub.price}</span>
                     </div>
                     {plan === 'sub' && (
                        <motion.div layoutId="highlight" className="absolute inset-0 border-2 border-freesh-lime rounded-xl pointer-events-none opacity-20" />
                     )}
                  </div>

                  {/* Option: Single */}
                  <div 
                    onClick={() => setPlan('single')}
                    className={`cursor-pointer relative p-5 md:p-6 rounded-xl border transition-all duration-300 ${plan === 'single' ? 'bg-white/5 border-white' : 'bg-transparent border-white/10 hover:border-white/20'}`}
                  >
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                           <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${plan === 'single' ? 'border-white' : 'border-white/30'}`}>
                              {plan === 'single' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                           </div>
                           <div>
                              <span className={`block font-display font-bold text-base md:text-lg ${plan === 'single' ? 'text-white' : 'text-white/60'}`}>{PRICING.single.label}</span>
                              <span className="text-[10px] md:text-xs text-freesh-muted font-mono">{PRICING.single.desc}</span>
                           </div>
                        </div>
                        <span className="font-mono text-lg md:text-xl text-white">${PRICING.single.price}</span>
                     </div>
                  </div>
               </div>

               {/* Actions */}
               <div className="flex flex-col gap-4">
                  <Button className="w-full text-lg h-16" icon={<ShoppingBag size={20} />}>
                     Add to Cart — ${plan === 'sub' ? PRICING.sub.price : PRICING.single.price}
                  </Button>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[9px] md:text-[10px] font-mono text-freesh-muted uppercase tracking-wider">
                     <span className="flex items-center gap-2"><RotateCcw size={12} /> Cancel Anytime</span>
                     <span className="flex items-center gap-2"><Box size={12} /> Free Shipping</span>
                     <span className="flex items-center gap-2"><ShieldCheck size={12} /> Secure Checkout</span>
                  </div>
               </div>

            </div>
         </div>
       </div>
    </section>
  );
};