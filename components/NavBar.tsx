import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

// Defined outside component to prevent re-creation on render
const NAV_ITEMS = [
  {
    label: "Essence",
    bgColor: "#0a120a", 
    textColor: "#e7e5e4",
    links: [
      { label: "Manifesto", href: "#manifesto" },
      { label: "Philosophy", href: "#manifesto" }
    ]
  },
  {
    label: "Compound", 
    bgColor: "#142615",
    textColor: "#e7e5e4",
    links: [
      { label: "Ingredients", href: "#compound" },
      { label: "Clinical Data", href: "#data" }
    ]
  },
  {
    label: "Acquire",
    bgColor: "#bef264", 
    textColor: "#050a05",
    links: [
      { label: "Shop Vessel", href: "#shop" },
      { label: "Subscription", href: "#shop" },
    ]
  }
];

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Refs for GSAP
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      // Force initial height to header height (70px) and hide content
      gsap.set(navRef.current, { height: 70 });
      gsap.set(cardsRef.current, { y: 20, autoAlpha: 0 });

      // 2. Create Timeline
      tl.current = gsap.timeline({ paused: true })
        .to(navRef.current, {
          height: "auto", // Smoothly animate to natural height
          duration: 0.6,
          ease: "expo.inOut",
        })
        .to(cardsRef.current, {
          y: 0,
          autoAlpha: 1, // Handles visibility + opacity automatically
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out"
        }, "-=0.3"); // Overlap the height animation by 0.3s
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    if (!tl.current) return;
    
    if (!isOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={wrapperRef} className="fixed top-6 left-0 right-0 z-50 flex justify-center perspective-[1000px] px-4">
      <nav 
        ref={navRef}
        className="relative w-full max-w-3xl bg-[#050a05]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden will-change-[height]"
      >
        {/* --- Header / Top Bar --- */}
        <div className="absolute top-0 left-0 right-0 h-[70px] flex items-center justify-between px-6 z-20 bg-[#050a05]/50">
          
          {/* Hamburger Button */}
          <button 
            onClick={toggleMenu}
            className="group flex flex-col justify-center gap-[5px] w-10 h-10 p-1 hover:opacity-80 transition-opacity"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            <span className={`h-[2px] w-6 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`h-[2px] w-6 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`h-[2px] w-6 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>

          {/* Centered Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 select-none pointer-events-none">
            <div className="w-6 h-6 bg-freesh-lime rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(190,242,100,0.3)]">
              <span className="font-display font-bold text-black text-[10px] translate-y-[1px]">F</span>
            </div>
            <span className="font-display font-bold text-white text-sm tracking-widest hidden md:block">FREESH</span>
          </div>

          {/* CTA Button */}
          <a href="#shop" className="hidden md:flex items-center justify-center bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-freesh-lime transition-colors">
            Get Started
          </a>
          <div className="md:hidden w-10" /> {/* Spacer for mobile center alignment */}
        </div>

        {/* --- Dropdown Content --- */}
        {/* We use paddingTop to push content below the absolute header */}
        <div className="pt-[70px] p-3 flex flex-col md:flex-row gap-2">
          {NAV_ITEMS.map((item, idx) => (
            <div
              key={idx}
              ref={el => { cardsRef.current[idx] = el }}
              className="flex-1 rounded-xl p-6 min-h-[160px] flex flex-col justify-between transition-transform"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <h3 className="font-display font-semibold text-xl tracking-tight opacity-90">{item.label}</h3>
              
              <div className="flex flex-col gap-2 mt-4">
                {item.links.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.href}
                    onClick={() => { toggleMenu(); }} // Close on click
                    className="group/link flex items-center gap-2 text-sm font-medium uppercase tracking-wide opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight size={14} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};