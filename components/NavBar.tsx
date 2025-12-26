import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

interface NavBarProps {
  onGetStarted?: () => void;
}

const NAV_ITEMS = [
  {
    label: "About",
    bgColor: "#121212", 
    textColor: "#f5f5f5",
    links: [
      { label: "Our Story", href: "#manifesto" },
      { label: "Ingredients", href: "#compound" }
    ]
  },
  {
    label: "Performance", 
    bgColor: "#1a1a1a",
    textColor: "#f5f5f5",
    links: [
      { label: "How it Works", href: "#data" },
      { label: "Daily Ritual", href: "#protocol" }
    ]
  },
  {
    label: "Shop",
    bgColor: "#bef264", 
    textColor: "#080808",
    links: [
      { label: "View Cases", href: "#shop" },
      { label: "Subscription", href: "#shop" },
    ]
  }
];

export const NavBar: React.FC<NavBarProps> = ({ onGetStarted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { height: 70 });
      gsap.set(cardsRef.current, { y: 20, autoAlpha: 0 });

      tl.current = gsap.timeline({ paused: true })
        .to(navRef.current, {
          height: "auto",
          duration: 0.6,
          ease: "expo.inOut",
        })
        .to(cardsRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out"
        }, "-=0.3");
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      if (isOpen) toggleMenu();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={wrapperRef} className="fixed top-6 left-0 right-0 z-[60] flex justify-center px-4">
      <nav 
        ref={navRef}
        className="relative w-full max-w-2xl bg-[#080808]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="h-[70px] flex items-center justify-between px-6">
          <button 
            onClick={toggleMenu}
            className="group flex flex-col justify-center gap-[5px] w-10 h-10 p-1"
          >
            <span className={`h-[2px] w-6 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`h-[2px] w-6 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-6 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-freesh-lime rounded-full" />
            <span className="font-display font-bold text-white text-sm tracking-widest uppercase">FREESH</span>
          </div>

          <button 
            onClick={() => { if(isOpen) toggleMenu(); onGetStarted?.(); }}
            className="hidden md:block bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-freesh-lime transition-colors"
          >
            Order Now
          </button>
          <div className="md:hidden w-10" />
        </div>

        <div className="p-3 flex flex-col md:flex-row gap-2">
          {NAV_ITEMS.map((item, idx) => (
            <div
              key={idx}
              ref={el => { cardsRef.current[idx] = el }}
              className="flex-1 rounded-xl p-6 min-h-[140px] flex flex-col justify-between"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <h3 className="font-display font-bold text-lg uppercase tracking-wider">{item.label}</h3>
              <div className="flex flex-col gap-2 mt-4">
                {item.links.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight size={14} /> {link.label}
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