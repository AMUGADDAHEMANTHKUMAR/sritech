import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import WorkGallery from './components/WorkGallery';
import Team from './components/Team';
import ContactForm from './components/ContactForm';
import CourseDetails from './components/CourseDetails';
import EnrollPage from './components/EnrollPage';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

function RouteScrollManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    const state = location.state as { scrollToId?: unknown; selectedPath?: unknown } | null;
    const stateTarget = typeof state?.scrollToId === 'string' ? state.scrollToId : null;
    const hashTarget = location.hash ? location.hash.slice(1) : null;
    const targetId = stateTarget ?? hashTarget;
    const pathChanged = previousPathRef.current !== location.pathname;

    previousPathRef.current = location.pathname;

    if (state?.selectedPath) {
      return;
    }

    if (!targetId) {
      if (pathChanged) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (stateTarget) {
      navigate(location.pathname + location.hash, { replace: true, state: null });
    }
  }, [location.hash, location.pathname, location.state, navigate]);

  return null;
}

function MainApp() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkGallery />
        <Intro />
        <Team />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

function CourseDetailsPage() {
  return (
    <>
      <Header />
      <main>
        <CourseDetails />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <SmoothScroll />
      <RouteScrollManager />
      <div className="w-full min-h-screen bg-[#050505] text-[#e1e1e1]">
        <div className="noise-overlay"></div>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/course/:courseId" element={<CourseDetailsPage />} />
          <Route path="/enroll/:courseName" element={<EnrollPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
