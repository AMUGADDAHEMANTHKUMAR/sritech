import React, { FormEvent, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import { allProjects, Project, SelectedPath, studentProjects, workExperienceProjects } from './WorkGallery';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

const BUSINESS_WHATSAPP_NUMBER = '919494712989';

function getSelectedPathFromState(state: unknown): SelectedPath | null {
  if (!state || typeof state !== 'object' || !('selectedPath' in state)) {
    return null;
  }

  const selectedPath = (state as { selectedPath?: unknown }).selectedPath;
  return selectedPath === 'beginner' || selectedPath === 'professional' ? selectedPath : null;
}

function findCourse(courseName?: string): Project | undefined {
  if (!courseName) {
    return undefined;
  }

  const decodedName = decodeURIComponent(courseName).trim().toLowerCase();
  return allProjects.find((course) => course.title.toLowerCase() === decodedName);
}

function inferSelectedPath(course?: Project): SelectedPath | null {
  if (!course) {
    return null;
  }

  if (studentProjects.some((studentCourse) => studentCourse.id === course.id)) {
    return 'beginner';
  }

  if (workExperienceProjects.some((professionalCourse) => professionalCourse.id === course.id)) {
    return 'professional';
  }

  return null;
}

export default function EnrollPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseName } = useParams<{ courseName: string }>();
  const course = useMemo(() => findCourse(courseName), [courseName]);
  const selectedPath = getSelectedPathFromState(location.state) ?? inferSelectedPath(course) ?? 'beginner';
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(phone)) {
      nextErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');

    if (!course || !validateForm()) {
      return;
    }

    const whatsappText = `Hi, I want to enroll in ${course.title}. My name is ${fullName.trim()}, Email: ${email.trim()}, Phone: ${phone}.`;
    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSuccessMessage('Thank you! Redirecting you to WhatsApp to complete your enrollment.');
  };

  const handleBackToCourses = () => {
    navigate('/', {
      state: { selectedPath }
    });
  };

  if (!course) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#050505] px-[60px] py-[40px] text-white max-md:justify-start max-md:p-[20px]">
        <CustomCursor />
        <div className="flex w-full max-w-[1100px] flex-col">
          <button
            type="button"
            onClick={handleBackToCourses}
            className="mb-4 self-start text-[11px] font-mono uppercase tracking-wider text-gray-400 transition-colors hover:text-white"
          >
            &larr; Back to Courses
          </button>
          <div className="overflow-hidden rounded-[8px] border border-white/15 bg-[#0f0f0f] p-[36px_40px] max-md:p-6">
            <p className="mb-4 font-heading text-[clamp(22px,2.8vw,36px)] uppercase">Course not found</p>
            <p className="text-[13px] text-gray-400">Please go back and choose a course from the courses section.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#050505] px-[60px] py-[40px] text-[#e1e1e1] max-md:justify-start max-md:p-[20px]">
      <CustomCursor />
      <div className="flex w-full max-w-[1100px] flex-col">
        <button
          type="button"
          onClick={handleBackToCourses}
          className="mb-4 self-start text-[11px] font-mono uppercase tracking-wider text-gray-400 transition-colors hover:text-white"
        >
          &larr; Back to Courses
        </button>

        <div className="grid w-full grid-cols-1 overflow-hidden rounded-[8px] md:grid-cols-2">
          <section className="min-w-0 bg-[#0f0f0f] p-[36px_40px] max-md:p-6 md:overflow-y-auto">
            <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.32em] text-gray-500">
              Enrollment Details
            </p>
            <h1 className="mb-4 break-words font-heading text-[clamp(22px,2.8vw,36px)] font-black uppercase leading-[0.95] text-white">
              {course.title}
            </h1>
            <p className="mb-5 text-[13px] leading-relaxed text-gray-300">
              {course.description}
            </p>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <div className="border border-white/10 bg-[#050505] p-3">
                <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-gray-500">Duration</p>
                <p className="text-[14px] text-white">{course.duration}</p>
              </div>
              <div className="border border-white/10 bg-[#050505] p-3">
                <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-gray-500">Mode</p>
                <p className="text-[14px] text-white">{course.mode}</p>
              </div>
            </div>

            <div>
              <h2 className="mb-3 font-heading text-[13px] uppercase tracking-wider text-white">
                Syllabus
              </h2>
              <ul className="space-y-2">
                {(course.details ?? []).slice(0, 5).map((item) => (
                  <li key={item} className="flex gap-2 text-[12px] leading-relaxed text-gray-300">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="min-w-0 bg-[#111111] p-[36px_40px] max-md:p-6 md:sticky md:top-0 md:overflow-y-auto">
            <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.32em] text-gray-500">
              Registration Form
            </p>
            <h2 className="mb-5 whitespace-nowrap font-heading text-[clamp(26px,3.5vw,44px)] font-black uppercase leading-none text-white">
              Enroll Now
            </h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-[14px]">
              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  className="h-[38px] w-full border border-white/15 bg-[#050505] px-3 text-[13px] text-white outline-none transition-colors focus:border-white"
                />
                {errors.fullName && <p className="mt-2 text-sm text-red-400">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="h-[38px] w-full border border-white/15 bg-[#050505] px-3 text-[13px] text-white outline-none transition-colors focus:border-white"
                />
                {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                  required
                  className="h-[38px] w-full border border-white/15 bg-[#050505] px-3 text-[13px] text-white outline-none transition-colors focus:border-white"
                />
                {errors.phone && <p className="mt-2 text-sm text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="course" className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  Course
                </label>
                <input
                  id="course"
                  type="text"
                  value={course.title}
                  readOnly
                  className="h-[38px] w-full cursor-not-allowed border border-white/15 bg-[#050505] px-3 text-[13px] text-gray-400 outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  Message/Query
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  className="h-[72px] w-full resize-none border border-white/15 bg-[#050505] px-3 py-2 text-[13px] text-white outline-none transition-colors focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="h-[46px] w-full border border-white bg-white px-6 text-[13px] font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-transparent hover:text-white"
              >
                Enroll Now
              </button>

              {successMessage && (
                <p className="border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm text-green-300">
                  {successMessage}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
