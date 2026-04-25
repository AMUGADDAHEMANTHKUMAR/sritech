import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  topics: string[];
  benefits: string[];
}

export const courses: Course[] = [
  {
    id: 'java-full-stack',
    name: 'Java Full Stack',
    description: 'Master Java, Spring Boot, and modern frontend technologies to become a complete full-stack developer.',
    duration: '6 Months',
    topics: ['Java Core', 'Spring Boot', 'React', 'MySQL', 'REST APIs', 'Microservices'],
    benefits: ['Job Placement Support', 'Real-time Projects', 'Certification', 'Interview Prep']
  },
  {
    id: 'mern-full-stack',
    name: 'MERN Full Stack',
    description: 'Build scalable web applications using MongoDB, Express, React, and Node.js.',
    duration: '5 Months',
    topics: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'GraphQL'],
    benefits: ['Freelancing Skills', 'Portfolio Projects', 'Industry Certification', 'Career Guidance']
  },
  {
    id: 'python-full-stack',
    name: 'Python Full Stack',
    description: 'Learn Python programming with Django/Flask and become a versatile full-stack developer.',
    duration: '6 Months',
    topics: ['Python', 'Django', 'Flask', 'PostgreSQL', 'REST APIs', 'AWS Basics'],
    benefits: ['Data Science Integration', 'Real Projects', 'Job Assistance', 'Certificate']
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Comprehensive web development course covering HTML, CSS, JavaScript, and modern frameworks.',
    duration: '4 Months',
    topics: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Tailwind'],
    benefits: ['Responsive Design', 'UI/UX Basics', 'Portfolio Building', 'Freelance Ready']
  },
  {
    id: 'freelancing',
    name: 'Freelancing Mastery',
    description: 'Learn how to build a successful freelance career in tech with practical strategies.',
    duration: '2 Months',
    topics: ['Client Acquisition', 'Proposal Writing', 'Pricing Strategy', 'Portfolio', 'Upwork/Fiverr'],
    benefits: ['Global Clients', 'Flexible Schedule', 'High Earnings', 'Work-Life Balance']
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Master data analysis, machine learning, and AI with Python and industry tools.',
    duration: '8 Months',
    topics: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'TensorFlow', 'Data Visualization'],
    benefits: ['High Salary', 'AI Skills', 'Certification', 'Research Opportunities']
  }
];

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate(`/course/${course.id}`, { state: { course } });
  };

  return (
    <div className="course-card bg-[#111] border border-gray-800 p-6 rounded-lg hover:border-white/50 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 group">
      <div className="flex flex-col h-full">
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-white transition-colors">
          {course.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4 flex-grow leading-relaxed">
          {course.description}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-mono uppercase tracking-wider text-white/60">
            {course.duration}
          </span>
        </div>
        <button
          onClick={handleEnroll}
          className="w-full py-3 px-4 border border-white/30 uppercase text-xs tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300 rounded cursor-pointer"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
