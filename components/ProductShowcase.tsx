import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from './ui/Button';
import { ShoppingBag, Check, Info } from 'lucide-react';

interface ProductShowcaseProps {
  onCheckout: (plan: string) => void;
}

const PRICING = {
  single: { price: 45, label: "One-Time Purchase", desc: "12-Pack Cans" },
  sub: { price: 38, label: "Monthly Supply", desc: "Delivered Every 30 Days (-15%)" }
};

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onCheckout }) => {
  const [plan, setPlan] = useState<'single' | 'sub'>('sub');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left - width / 2) / 20);
    mouseY.set((e.clientY - top - height / 2) / 20);
  }

  return (
    <section id="shop" ref={containerRef} onMouseMove={handleMouseMove} className="py-24 md:py-32 bg-freesh-black relative scroll-mt-20 border-t border-white/5 overflow-hidden">
       <div className="container mx-auto px-6 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 relative h-[500px] flex items-center justify-center">
               <motion.div 
                 style={{ rotateX: springY, rotateY: springX }}
                 className="relative z-10 w-full max-w-[280px] aspect-[1/2] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
               >
                  <img 
                    src="https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&q=80&w=1200" 
                    alt="Freesh Product" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
               </motion.div>
               <div className="absolute w-[400px] h-[400px] bg-freesh-lime/10 blur-[100px] rounded-full pointer-events-none" />
            </div>

            <div className="lg:col-span-6">
               <div className="mb-10">
                  <span className="text-freesh-lime text-xs font-bold uppercase tracking-widest block mb-4">Now Available</span>
                  <h2 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 uppercase">The Fix It Case</h2>
                  <p className="text-white/70 text-lg font-light leading-relaxed max-w-md">
                    Clean energy, delivered directly to your door. Choose a one-time purchase or join our subscription for consistent focus.
                  </p>
               </div>

               <div className="space-y-4 mb-10">
                  {Object.entries(PRICING).map(([key, item]) => (
                    <div 
                      key={key}
                      onClick={() => setPlan(key as 'single' | 'sub')}
                      className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${plan === key ? 'bg-white/5 border-freesh-lime shadow-lg' : 'border-white/10 hover:border-white/20'}`}
                    >
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                             <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${plan === key ? 'border-freesh-lime' : 'border-white/30'}`}>
                                {plan === key && <div className="w-2 h-2 rounded-full bg-freesh-lime" />}
                             </div>
                             <div>
                                <span className="block font-bold text-white text-lg">{item.label}</span>
                                <span className="text-sm text-white/50">{item.desc}</span>
                             </div>
                          </div>
                          <span className="font-display font-bold text-2xl text-white">${item.price}</span>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="flex flex-col gap-6">
                  <Button 
                    onClick={() => onCheckout(plan)}
                    className="w-full text-lg h-16 uppercase font-bold tracking-widest" 
                    icon={<ShoppingBag size={20} />}
                  >
                     Order Fix It Case — ${PRICING[plan].price}
                  </Button>
                  
                  <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                     <span className="flex items-center gap-2"><Check size={14} /> Free Shipping</span>
                     <span className="flex items-center gap-2"><Check size={14} /> Cancel Anytime</span>
                     <span className="flex items-center gap-2"><Info size={14} /> Sustainable Packaging</span>
                  </div>
               </div>
            </div>
         </div>
       </div>
    </section>
  );
};