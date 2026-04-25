import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CourseCard, { courses } from './CourseCard';

gsap.registerPlugin(ScrollTrigger);

export default function Courses() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.courses-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.courses-title',
          start: 'top 80%'
        }
      });

      // Animate course cards with stagger
      gsap.from('.course-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '#courses',
          start: 'top 70%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="courses" className="section-padding bg-[#0a0a0a] text-[#e1e1e1] relative z-10">
      <div className="container">
        <div className="mb-16">
          <h2 className="courses-title text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            Our <span className="stroke-text">Courses</span>
          </h2>
          <p className="text-sm md:text-base uppercase tracking-widest text-gray-400 max-w-xl">
            Choose from our industry-relevant courses designed to make you job-ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}