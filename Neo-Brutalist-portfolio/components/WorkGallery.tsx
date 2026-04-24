import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  cat: string;
  year: string;
  description: string;
  details?: string[];
  img: string;
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "Java Full Stack", 
    cat: "Course", 
    year: "01", 
    description: "Learn Java, Spring Boot, SQL, and frontend integration with live projects.",
    details: [
      "Core Java + OOP concepts & design patterns",
      "Spring Boot, Hibernate & REST APIs",
      "MySQL database design & optimization",
      "Frontend integration with HTML/CSS/JavaScript",
      "Live project with code reviews"
    ],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    title: "MERN Full Stack", 
    cat: "Course", 
    year: "02", 
    description: "Build end-to-end apps using MongoDB, Express, React, and Node.js.",
    details: [
      "React fundamentals, hooks & state management",
      "Node.js, Express server & REST APIs",
      "MongoDB database design & queries",
      "Authentication & real-time features",
      "Deploy to production with CI/CD"
    ],
    img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    title: "Python Full Stack", 
    cat: "Course", 
    year: "03", 
    description: "Master Python, APIs, databases, and modern frontend workflows.",
    details: [
      "Python fundamentals & OOP programming",
      "Django/FastAPI for backend development",
      "PostgreSQL & database optimization",
      "Frontend with React or Vue integration",
      "Web scraping & automation projects"
    ],
    img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    title: "Web Development", 
    cat: "Course", 
    year: "04", 
    description: "Start from fundamentals and build responsive, production-ready websites.",
    details: [
      "HTML5, CSS3 & responsive design",
      "JavaScript ES6+ & DOM manipulation",
      "Bootstrap & Tailwind CSS frameworks",
      "Git version control & deployment",
      "Portfolio-ready projects from day one"
    ],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    title: "Freelancing Guidance", 
    cat: "Career", 
    year: "05", 
    description: "Learn client communication, portfolio building, and proposal strategy.",
    details: [
      "Build a standout freelance portfolio",
      "Master client communication & negotiation",
      "Write winning proposals & contracts",
      "Pricing strategies & project scoping",
      "Landing high-value clients"
    ],
    img: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 6, 
    title: "Job Placement", 
    cat: "Career", 
    year: "06", 
    description: "Get resume review, interview prep, and placement mentoring support.",
    details: [
      "Professional resume & LinkedIn optimization",
      "Mock interviews with industry experts",
      "Technical problem-solving practice",
      "Interview question preparation",
      "Direct job referrals & networking"
    ],
    img: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1200&auto=format&fit=crop" 
  },
  {
    id: 7,
    title: "Internship Program",
    cat: "Career",
    year: "07",
    description: "8-week internship with live team tasks, mentor reviews, certification, and interview-ready project experience.",
    details: [
      "Live project participation with real workflow",
      "Weekly mentor code review and feedback",
      "Agile methodology & team collaboration",
      "Completion certificate & portfolio piece",
      "Interview preparation & job readiness"
    ],
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
  }
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group cursor-pointer">
      <div className="work-card-inner relative overflow-hidden aspect-video md:aspect-video mb-4">
        <img 
          src={project.img} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity duration-500"></div>
      </div>
      <div className="border-b border-white/20 pb-4">
        <div className="w-full">
          <h3 className="text-xl md:text-2xl font-heading mb-2 break-words">{project.title}</h3>
          <p className="text-xs md:text-sm font-mono text-gray-400 max-w-full leading-relaxed mb-3">{project.description}</p>
          <div className="flex items-center justify-between mt-3 mb-3">
            <span className="text-xs font-mono min-w-8">{project.year}</span>
            <a
              href="#choose-path"
              className="inline-block px-3 py-1 border border-white/30 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
            >
              Join Now
            </a>
          </div>
          {project.details && (
            <ul className="space-y-1 text-xs text-gray-300">
              {project.details.map((detail) => (
                <li key={detail} className="leading-relaxed">• {detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default function WorkGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = React.useState(window.innerWidth >= 1024);

  const leftColumnIds = isLargeScreen ? [1, 3, 5] : [1, 2, 3, 4, 5, 6, 7];
  const rightColumnIds = isLargeScreen ? [2, 4, 6, 7] : [];

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect: Left column moves slower, Right column moves faster
      if (window.innerWidth >= 1024) {
        gsap.to(leftColRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        gsap.to(rightColRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      } else {
        gsap.set([leftColRef.current, rightColRef.current], { clearProps: "transform" });
      }

      // Card reveals
      gsap.utils.toArray('.work-card-inner').forEach((card: any) => {
        gsap.fromTo(card, 
          { scale: 0.9, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 50%",
              scrub: 1
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="courses" className="relative z-20 bg-[#050505] text-white py-12 md:py-16 overflow-hidden">
      <div className="container">
        <div className="mb-16 flex flex-col items-center text-center">
           <h2 className="text-[12vw] leading-[0.8] font-heading font-black mix-blend-exclusion z-10">
             OUR
           </h2>
           <h2 className="text-[12vw] leading-[0.8] font-heading font-black text-transparent stroke-text z-10 -mt-4 md:-mt-10">
             COURSES
           </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 px-4 md:px-8 lg:px-12">
          
          {/* Left Column - Starts normal, moves down slowly */}
          <div ref={leftColRef} className="flex flex-col gap-10 md:gap-12 lg:gap-16 pt-0 lg:pt-24">
            {projects.filter((project) => leftColumnIds.includes(project.id)).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Right Column - Starts lower, moves up faster */}
          <div ref={rightColRef} className="flex flex-col gap-10 md:gap-12 lg:gap-16">
            {projects.filter((project) => rightColumnIds.includes(project.id)).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}