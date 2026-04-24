import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    // Center the anchor point
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onHoverStart = () => cursor?.classList.add('hovered');
    const onHoverEnd = () => cursor?.classList.remove('hovered');
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      gsap.to(cursor, {
        x: touch.clientX,
        y: touch.clientY,
        duration: 0.08,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      gsap.set(cursor, {
        x: touch.clientX,
        y: touch.clientY
      });
      cursor.classList.add('hovered');
      window.setTimeout(() => cursor.classList.remove('hovered'), 180);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    
    // Add hover listeners to all clickable elements
    const clickables = document.querySelectorAll('a, button, .cursor-pointer');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', onHoverStart);
      el.addEventListener('mouseleave', onHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', onHoverStart);
        el.removeEventListener('mouseleave', onHoverEnd);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}