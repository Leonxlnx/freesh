import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Manifesto } from './components/Manifesto';
import { Ingredients } from './components/Ingredients';
import { Visualizer } from './components/Visualizer';
import { DataSection } from './components/DataSection';
import { ProductShowcase } from './components/ProductShowcase';
import { Protocol } from './components/Protocol';
import { Footer } from './components/Footer';
import { Lifestyle } from './components/Lifestyle';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, Lock, ArrowRight } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, plan }: { isOpen: boolean, onClose: () => void, plan: string }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="relative w-full max-w-lg bg-freesh-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-freesh-lime font-bold text-[10px] uppercase tracking-widest block mb-2">Shopping Bag</span>
                <h3 className="text-2xl font-display font-bold text-white">Review Your Selection</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} className="text-white/50" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <p className="text-white font-bold text-lg">Freesh (12 Cans)</p>
                  <p className="text-sm text-white/50">{plan === 'sub' ? 'Monthly Delivery' : 'One-Time Order'}</p>
                </div>
                <p className="text-white font-bold text-xl">${plan === 'sub' ? '38.00' : '45.00'}</p>
              </div>
              
              <div className="space-y-3 px-2">
                <div className="flex items-center gap-3 text-sm text-white/60">
                   <Check size={16} className="text-freesh-lime" />
                   <span>Free Priority Shipping Included</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                   <Check size={16} className="text-freesh-lime" />
                   <span>Environmentally Responsible Packaging</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-freesh-lime text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-freesh-lime/10">
              Continue to Payment <ArrowRight size={20} />
            </button>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-white/30 uppercase font-bold tracking-widest">
              <Lock size={12} /> Secure Stripe Checkout
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState('sub');

  const openCheckout = (plan: string = 'sub') => {
    setActivePlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-freesh-black selection:bg-freesh-lime selection:text-freesh-black">
      <NavBar onGetStarted={() => openCheckout('sub')} />
      <main>
        <Hero onCta={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />
        <Marquee />
        <Manifesto />
        <Visualizer />
        <Ingredients />
        <DataSection />
        <ProductShowcase onCheckout={openCheckout} />
        <Protocol />
        <Lifestyle />
      </main>
      <Footer />
      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} plan={activePlan} />
    </div>
  );
};

export default App;