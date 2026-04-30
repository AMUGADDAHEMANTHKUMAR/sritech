import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courseButtons = [
  'Java Full Stack',
  'MERN Full Stack',
  'Python Full Stack',
  'Web Development',
  'Freelancing',
  'Job Placement',
  'Internship'
] as const;

const WEBHOOK_URL = 'REPLACE_THIS_WITH_N8N_WEBHOOK_URL';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<(typeof courseButtons)[number]>('Java Full Stack');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.path-item').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCourseSelection = (course: (typeof courseButtons)[number]) => {
    setSelectedCourse(course);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          course: selectedCourse
        })
      });

      if (!response.ok) {
        throw new Error('Failed to register.');
      }

      alert('Registered successfully! Check your Telegram.');
      setName('');
      setPhone('');
      setEmail('');
      setSelectedCourse('Java Full Stack');
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="choose-path" className="section-padding bg-[#111] text-[#f4f4f4] relative z-10 overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <h2 className="text-6xl md:text-8xl font-bold">Choose<br />Your Path</h2>
          <p className="max-w-md text-sm uppercase tracking-wide text-gray-400 pt-4">
            Select your preferred track and submit the form to register for a free demo session.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {courseButtons.map((course) => (
            <button
              key={course}
              type="button"
              className={`path-item px-5 py-4 border text-sm uppercase tracking-wider transition-colors duration-300 ${
                selectedCourse === course ? 'bg-white text-black border-white' : 'border-gray-600 hover:border-white hover:text-white'
              }`}
              onClick={() => handleCourseSelection(course)}
            >
              {course}
            </button>
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="border border-gray-700 p-6 md:p-10 rounded-lg bg-[#0f0f0f]">
          <h3 className="text-2xl md:text-3xl mb-6">Register for Free Demo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Your name"
              aria-required="true"
              className="w-full bg-transparent border border-gray-600 px-4 py-3 outline-none focus:border-white"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              aria-label="Your phone number"
              aria-required="true"
              className="w-full bg-transparent border border-gray-600 px-4 py-3 outline-none focus:border-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Your email address"
              aria-required="true"
              className="w-full bg-transparent border border-gray-600 px-4 py-3 outline-none focus:border-white md:col-span-2"
            />
          </div>
          <input type="hidden" name="course" value={selectedCourse} />
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="text-sm text-gray-300">
              Selected Course: <span className="text-white">{selectedCourse}</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 border border-white uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
