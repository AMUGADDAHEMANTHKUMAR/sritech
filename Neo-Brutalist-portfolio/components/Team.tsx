import React from 'react';

const testimonials = [
  {
    name: 'Prakash',
    role: 'Web Developer',
    review: 'After a 2-year career break, I restarted with Java Full Stack here. The mock interviews and project reviews helped me get selected in a product startup.'
  },
  {
    name: 'Sanvitha',
    role: 'UI Support Engineer',
    review: 'I moved from non-IT work to web development. Weekly assignments and mentor feedback improved my confidence and I got my first IT role.'
  },
  {
    name: 'Rajesh',
    role: 'Full Stack Developer',
    review: 'The MERN training was practical from day one. I completed real client-style tasks and cracked interviews after months of trying without direction.'
  },
  {
    name: 'Keerthi',
    role: 'Python Developer',
    review: 'I was returning to work after maternity break. The flexible batches and placement support helped me re-enter IT with a Python backend role.'
  },
  {
    name: 'Naveen',
    role: 'Frontend Developer',
    review: 'I had a long employment gap and no portfolio. With guidance on projects and freelancing, I built proof of work and got hired within 3 months.'
  },
  {
    name: 'Ayesha',
    role: 'QA Analyst',
    review: 'The internship track gave me real SDLC exposure and teamwork practice. That experience made a big difference in interviews and job conversion.'
  }
];

const scrollTestimonials = [...testimonials, ...testimonials];

export default function Team() {
  return (
    <section id="testimonials" className="section-padding bg-[#050505] text-[#e1e1e1] overflow-hidden">
      <div className="container">
        <div className="mb-24 text-center">
          <span className="text-xs font-mono uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full">Testimonials</span>
          <h2 className="mt-8 text-5xl md:text-7xl">What Our<br/>Students Say</h2>
        </div>

        <div className="testimonial-marquee">
          <div className="testimonial-track">
            {scrollTestimonials.map((item, i) => (
              <article key={`${item.name}-${i}`} className="testimonial-card">
                <div className="border border-white/20 p-6 bg-[#0b0b0b] min-h-[240px] flex flex-col justify-between">
                  <p className="text-sm text-gray-300 leading-relaxed mb-5">{item.review}</p>
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="text-2xl font-serif-italic mb-1">{item.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-500">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((item) => (
            <div key={item.name} className="border border-white/15 p-5">
              <p className="text-sm text-gray-300 leading-relaxed">{item.review}</p>
              <div className="mt-4">
                <h4 className="text-lg font-serif-italic">{item.name}</h4>
                <span className="text-xs uppercase tracking-widest text-gray-500">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}