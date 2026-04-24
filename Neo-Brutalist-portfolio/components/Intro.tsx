import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.intro-line-wrap');
      
      lines.forEach((line: any) => {
        gsap.fromTo(line.querySelectorAll('.char'), 
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.02,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-56 bg-[#0a0a0a] text-[#f4f4f4] overflow-hidden px-4">
      <div className="container mx-auto">
        
        <div className="flex flex-col text-[7vw] md:text-[6vw] leading-[1.1] font-heading uppercase font-bold tracking-tight">
          
          <div className="intro-line-wrap overflow-hidden flex flex-wrap items-baseline gap-4">
             <span className="char">We</span>
             <span className="char font-serif italic font-light text-gray-400 lowercase">provide</span>
             <span className="char">high-quality</span>
          </div>

          <div className="intro-line-wrap overflow-hidden flex flex-wrap items-baseline gap-4 pl-[5vw]">
             <span className="char stroke-text text-transparent">Online</span>
             <span className="char">Courses.</span>
          </div>

          <div className="intro-line-wrap overflow-hidden flex flex-wrap items-baseline gap-4">
             <span className="char">With</span>
             <span className="char font-serif italic font-light text-white lowercase">experts, projects,</span>
             <span className="char">& training.</span>
          </div>

        </div>

        <div className="mt-32 w-full flex justify-end">
          <div className="w-full md:w-1/3 text-lg md:text-xl font-light text-gray-400 font-mono leading-relaxed border-l border-gray-800 pl-8">
            <p>
              We provide high-quality online courses with expert instructors, real-time projects, and job-oriented training.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}