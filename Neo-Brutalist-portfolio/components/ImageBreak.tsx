import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageBreak() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 20,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[60vh] md:h-[80vh] overflow-hidden relative">
      <img 
        ref={imgRef}
        src="https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=2864&auto=format&fit=crop" 
        alt="Abstract Texture" 
        className="w-full h-[120%] object-cover -translate-y-[10%]"
      />
      <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
    </div>
  );
}