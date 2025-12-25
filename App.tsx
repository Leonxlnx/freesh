import React from 'react';
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

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-freesh-black selection:bg-freesh-lime selection:text-freesh-black">
      {/* Noise Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-noise"></div>
      
      <NavBar />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Visualizer />
        <Ingredients />
        <DataSection />
        <ProductShowcase />
        <Protocol />
        <Lifestyle />
      </main>
      <Footer />
    </div>
  );
};

export default App;