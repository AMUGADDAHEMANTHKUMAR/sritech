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

  const title = "Transform Your Tech Career";

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
        <div aria-hidden="true" />

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
                "Quality programming education tailored to your journey. Whether you're starting fresh or advancing your skills."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
