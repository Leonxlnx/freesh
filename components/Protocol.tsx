import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Coffee, Moon, Battery, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    time: "07:00",
    label: "WAKE UP",
    icon: Sun,
    desc: "Let your body wake up naturally. Hydrate with water first.",
  },
  {
    time: "10:30",
    label: "MORNING BOOST",
    icon: Battery,
    desc: "Drink Freesh when you start your deep work. This bridges the gap to lunch without the jitters.",
  },
  {
    time: "14:00",
    label: "AFTERNOON",
    icon: Coffee,
    desc: "No crash. The time-release ingredients keep you steady through the 3 PM slump.",
  },
  {
    time: "22:00",
    label: "SLEEP",
    icon: Moon,
    desc: "System cleared. No lingering caffeine means you sleep soundly.",
  }
];

export const Protocol: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draw the center line
      gsap.fromTo(lineRef.current, 
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );

      // 2. Reveal items as they come into view
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-freesh-dark relative overflow-hidden border-t border-white/5">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <Clock size={14} className="text-freesh-muted" />
              <span className="text-xs font-mono uppercase text-freesh-muted tracking-widest">Daily Routine</span>
           </div>
           <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">THE RHYTHM</h2>
           <p className="text-freesh-muted max-w-xl mx-auto">
             Timing matters. We designed Freesh to work with your body's natural clock, not fight against it.
           </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
           
           {/* Center Line Container */}
           <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2">
             <div ref={lineRef} className="w-full h-full bg-freesh-lime/50" />
           </div>

           <div className="space-y-16">
              {TIMELINE.map((item, idx) => (
                <div 
                  key={idx}
                  ref={el => { itemsRef.current[idx] = el }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                   
                   {/* Content Side */}
                   <div className="pl-16 md:pl-0 md:w-1/2 md:px-12 text-left md:text-right">
                      <div className={`md:text-right ${idx % 2 !== 0 ? 'md:text-left' : ''}`}>
                         <span className="inline-block px-2 py-1 rounded text-[10px] font-mono font-bold mb-2 bg-white/5 text-freesh-lime border border-white/10">
                            {item.time}
                         </span>
                         <h3 className="font-display font-bold text-xl text-white mb-2">
                           {item.label}
                         </h3>
                         <p className="text-sm text-freesh-muted leading-relaxed">
                           {item.desc}
                         </p>
                      </div>
                   </div>

                   {/* Center Icon Node */}
                   <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-freesh-black border border-white/20 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      <item.icon size={20} className="text-white/80" />
                   </div>

                   {/* Empty Space for Grid Balance */}
                   <div className="hidden md:block md:w-1/2" />

                </div>
              ))}
           </div>

        </div>

      </div>
    </section>
  );
};