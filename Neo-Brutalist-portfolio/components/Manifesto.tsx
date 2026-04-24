import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statements = [
  "Design is not visual.",
  "It is a feeling.",
  "We reject the template.",
  "Chaos is our grid.",
  "Building for tomorrow."
];

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${statements.length * 100}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Calculate which index should be active based on progress
          const index = Math.floor(self.progress * (statements.length - 1));
          
          textRefs.current.forEach((el, i) => {
             if (el) {
               if (i === index) {
                 gsap.to(el, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5 });
               } else {
                 gsap.to(el, { opacity: 0, scale: 0.9, filter: 'blur(10px)', duration: 0.5 });
               }
             }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-[#050505] text-[#e1e1e1] overflow-hidden relative flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white rounded-full blur-[150px] animate-pulse"></div>
      </div>

      <div className="relative z-10 container text-center">
         {statements.map((text, i) => (
           <h2 
             key={i}
             ref={el => textRefs.current[i] = el}
             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-[6vw] md:text-[5vw] font-heading font-bold uppercase leading-tight mix-blend-difference ${i === 0 ? 'opacity-100' : 'opacity-0 scale-90 blur-sm'}`}
           >
             {text}
           </h2>
         ))}
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-mono tracking-[0.2em] opacity-50">
        ( THE MANIFESTO )
      </div>
    </section>
  );
}