import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial clear state
      gsap.set(".hero-char", { yPercent: 120, rotateZ: 10 });

      // Chaotic text entry
      tl.to(".hero-char", {
        yPercent: 0,
        rotateZ: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
      });
      
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        delay: 1
      });

      // Parallax Background Image
      gsap.to(".hero-bg", {
        yPercent: 30,
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const title = "CONNECT WITH OUR EXPERTS";

  return (
    <section id="home" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505] text-[#e1e1e1]">
      {/* Background Image with effects */}
      <div className="hero-bg absolute inset-0 z-0 opacity-40">
         <img 
           src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop"
           alt="Hero background"
           className="w-full h-full object-cover grayscale contrast-125 scale-105"
         />
         <div className="absolute inset-0 bg-[#050505]/50 mix-blend-multiply"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-12">
        <div className="flex justify-between items-start hero-fade">
           <div className="flex flex-col gap-2 md:gap-3">
             <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-60">
               ( SriTech Learning )
             </div>
             <div className="hidden md:block text-xs font-mono uppercase tracking-wider opacity-40 max-w-[200px]">
               Job Ready Training<br/>
               <span className="text-white/60">& Placement Support</span>
             </div>
           </div>
           <div className="hidden md:flex text-right flex-col items-end gap-2 md:gap-3">
             <div className="flex items-center gap-2">
               <span className="text-xs font-mono uppercase tracking-wider opacity-50">Admissions Open</span>
               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
             </div>
             <div className="text-xs font-mono uppercase tracking-wider opacity-50">
               Hyderabad, India
             </div>
             <div className="flex gap-2 mt-2">
               <a href="#choose-path" className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors text-xs">
                 IN
               </a>
               <a href="#courses" className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors text-xs">
                 CR
               </a>
             </div>
           </div>
        </div>

        {/* Decorative elements on right side - hidden on mobile */}
        <div className="hidden lg:flex absolute right-12 top-1/3 flex-col gap-8 opacity-30 hero-fade">
          <div className="flex flex-col items-end gap-2 text-xs font-mono">
            <div className="w-12 h-[1px] bg-white/40"></div>
            <span className="text-white/60">001</span>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs font-mono">
            <div className="w-8 h-[1px] bg-white/40"></div>
            <span className="text-white/60">002</span>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs font-mono">
            <div className="w-16 h-[1px] bg-white/40"></div>
            <span className="text-white/60">003</span>
          </div>
        </div>

        <div className="relative mb-8 md:mb-12">
          <h1 ref={titleRef} className="text-[10vw] sm:text-[8vw] md:text-[7vw] leading-[1.1] font-heading font-black tracking-tight text-white">
            <div className="flex flex-wrap">
              {title.split("").map((char, i) => (
                <span key={i} className="hero-char inline-block origin-bottom will-change-transform">{char}</span>
              ))}
            </div>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-6 md:mt-12 border-t border-white/20 pt-4 md:pt-8 hero-fade gap-4 md:gap-6">
            <div className="flex-1 max-w-2xl">
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-serif-italic text-gray-300 leading-snug mb-4 md:mb-6">
                "Connect With Our Experts And Start Learning Today"
              </p>
              <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-white/70 mb-4 md:mb-6">
                Job-ready training, freelancing guidance, and placement support
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-[10px] md:text-xs font-mono uppercase tracking-wider opacity-70">
                <div>
                  <div className="text-white/40 mb-1">Mode</div>
                  <div>Online Live</div>
                </div>
                <div>
                  <div className="text-white/40 mb-1">Focus</div>
                  <div>Job Oriented</div>
                </div>
                <div>
                  <div className="text-white/40 mb-1">Projects</div>
                  <div>Real Time</div>
                </div>
                <div>
                  <div className="text-white/40 mb-1">Support</div>
                  <div>Placement</div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
               <a href="#choose-path" className="inline-block px-6 md:px-8 py-3 md:py-4 border border-white/30 rounded-full uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                 Register for Free Demo
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}