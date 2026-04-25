import React, { useState, FormEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Course } from './CourseCard';

export default function CourseDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course as Course | undefined;
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect to home if no course data
    if (!course) {
      navigate('/');
      return;
    }

    // Animate page elements
    gsap.from('.detail-title', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2
    });

    gsap.from('.detail-content', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.4
    });

    gsap.from('.detail-form', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.6
    });
  }, [course, navigate]);

  const validateForm = (): boolean => {
    const newErrors: { name?: string; phone?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Clean phone number (remove any non-digit characters)
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Format phone number for WhatsApp (add country code if not present)
    let whatsappNumber = cleanPhone;
    if (cleanPhone.length === 10) {
      // Assume Indian number, add 91
      whatsappNumber = '91' + cleanPhone;
    }
    
    // Create pre-filled WhatsApp message
    const message = encodeURIComponent(`Hi, I want to join the ${course?.name} course. My details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    setIsSubmitting(false);
  };

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#e1e1e1] pt-24 pb-12 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400 hover:text-white transition-colors mb-8 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Courses
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT SIDE - Course Details */}
          <div className="detail-content">
            <h1 className="detail-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              {course.name}
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {course.description}
            </p>

            {/* Duration */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Duration</div>
                <div className="text-lg">{course.duration}</div>
              </div>
            </div>

            {/* Key Topics */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-white">Key Topics</h3>
              <div className="flex flex-wrap gap-2">
                {course.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#111] border border-gray-800 text-sm text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Benefits</h3>
              <ul className="space-y-3">
                {course.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE - Registration Form */}
          <div className="detail-form">
            <div className="bg-[#111] border border-gray-800 p-6 md:p-8 rounded-lg sticky top-24">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                Register Now
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Fill in your details and we'll connect you on WhatsApp
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className={`w-full bg-[#0a0a0a] border ${errors.name ? 'border-red-500' : 'border-gray-700'} px-4 py-3 outline-none focus:border-white transition-colors text-white`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className={`w-full bg-[#0a0a0a] border ${errors.phone ? 'border-red-500' : 'border-gray-700'} px-4 py-3 outline-none focus:border-white transition-colors text-white`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full bg-[#0a0a0a] border ${errors.email ? 'border-red-500' : 'border-gray-700'} px-4 py-3 outline-none focus:border-white transition-colors text-white`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Course Name (Auto-filled) */}
                <div>
                  <label htmlFor="course" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Course
                  </label>
                  <input
                    type="text"
                    id="course"
                    value={course.name}
                    readOnly
                    className="w-full bg-[#0a0a0a] border border-gray-700 px-4 py-3 outline-none text-gray-400 cursor-not-allowed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-bold uppercase text-sm tracking-[0.15em] hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
                >
                  {isSubmitting ? 'Processing...' : 'Submit & Join via WhatsApp'}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting, you agree to be contacted via WhatsApp
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
