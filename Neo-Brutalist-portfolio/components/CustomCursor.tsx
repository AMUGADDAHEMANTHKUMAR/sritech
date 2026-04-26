import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    // Center the anchor point
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' });
    
    const onMouseMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
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
      moveX(touch.clientX);
      moveY(touch.clientY);
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
