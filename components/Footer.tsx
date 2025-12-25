import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-freesh-black py-20 border-t border-white/5 relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-freesh-lime/5 blur-[100px] rounded-t-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <h2 className="font-display font-bold text-4xl text-white mb-8">FREESH®</h2>
        
        <div className="flex gap-8 mb-12">
           {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
             <a key={social} href="#" className="text-freesh-muted hover:text-freesh-lime transition-colors text-sm font-medium">
               {social}
             </a>
           ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4 mb-16 text-sm text-freesh-muted">
           <a href="#" className="hover:text-white transition-colors">Manifesto</a>
           <a href="#" className="hover:text-white transition-colors">Ingredients</a>
           <a href="#" className="hover:text-white transition-colors">Science</a>
           <a href="#" className="hover:text-white transition-colors">Contact</a>
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
           <a href="#" className="hover:text-white transition-colors">Terms</a>
           <a href="#" className="hover:text-white transition-colors">Shipping</a>
           <a href="#" className="hover:text-white transition-colors">Returns</a>
        </div>

        <p className="text-xs text-freesh-muted/50">
           © 2024 Freesh Labs Inc. All rights reserved. <br/>
           These statements have not been evaluated by the FDA.
        </p>

      </div>
    </footer>
  );
};