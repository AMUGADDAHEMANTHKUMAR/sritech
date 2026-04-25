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

    const isInteractiveElement = (target: EventTarget | null): boolean => {
      return target instanceof Element && Boolean(target.closest('a, button, input, textarea, select, .cursor-pointer'));
    };

    const onPointerOver = (event: PointerEvent) => {
      if (isInteractiveElement(event.target)) {
        cursor.classList.add('hovered');
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!isInteractiveElement(event.relatedTarget)) {
        cursor.classList.remove('hovered');
      }
    };

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
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
