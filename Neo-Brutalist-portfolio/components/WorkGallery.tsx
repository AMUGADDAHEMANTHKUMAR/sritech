import React, { useEffect, useRef, useState } from 'react';
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

const studentProjects: Project[] = [
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

const workExperienceProjects: Project[] = [
  { 
    id: 101, 
    title: "RAP ABAP", 
    cat: "Course", 
    year: "01", 
    description: "Advanced SAP ABAP development for enterprise resource management and business process optimization.",
    details: [
      "SAP ABAP fundamentals & syntax",
      "Advanced programming concepts",
      "Data dictionary & database design",
      "Module pool & interface development",
      "Live enterprise projects"
    ],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 102, 
    title: "JAVA AI", 
    cat: "Course", 
    year: "02", 
    description: "Build intelligent applications using Java with AI/ML frameworks and algorithms.",
    details: [
      "Java fundamentals for AI/ML applications",
      "TensorFlow & deep learning frameworks",
      "Natural language processing",
      "Computer vision applications",
      "Production-ready AI systems"
    ],
    img: "https://images.unsplash.com/photo-1677442d019cecf482dfecca4dbd6ce1e6ffa5ad?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 103, 
    title: "SFD", 
    cat: "Course", 
    year: "03", 
    description: "Master Salesforce development for enterprise CRM solutions and business automation.",
    details: [
      "Salesforce platform architecture",
      "Apex programming language",
      "Lightning components & flows",
      "Integration & APIs",
      "Enterprise deployment strategies"
    ],
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 104, 
    title: "IT GRC", 
    cat: "Course", 
    year: "04", 
    description: "Governance, Risk & Compliance for modern IT infrastructure and enterprise security.",
    details: [
      "IT governance frameworks & standards",
      "Risk assessment & management",
      "Compliance regulations & protocols",
      "Security policy implementation",
      "Audit & reporting systems"
    ],
    img: "https://images.unsplash.com/photo-1563986768609-322da13cf712?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 105, 
    title: "CPI", 
    cat: "Course", 
    year: "05", 
    description: "SAP Cloud Platform Integration for seamless data and process connectivity.",
    details: [
      "CPI architecture & concepts",
      "Integration flows & adapters",
      "Message mapping & transformation",
      "Cloud connectivity",
      "Real-world integration scenarios"
    ],
    img: "https://images.unsplash.com/photo-1551078519-398cabd32ca0?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 106, 
    title: "UI SESSION", 
    cat: "Course", 
    year: "06", 
    description: "Advanced UI/UX development with modern frameworks and professional design patterns.",
    details: [
      "Modern UI frameworks & libraries",
      "User experience design principles",
      "Responsive & adaptive design",
      "Performance optimization",
      "Accessibility standards & implementation"
    ],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 107, 
    title: "SNOWFLAKE", 
    cat: "Course", 
    year: "07", 
    description: "Cloud data warehouse management with Snowflake for enterprise analytics and big data.",
    details: [
      "Snowflake architecture & setup",
      "Data loading & transformation",
      "Query optimization & performance",
      "Advanced analytics & reporting",
      "Data governance & security"
    ],
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
  }
];

const ChoiceCard: React.FC<{ 
  title: string; 
  icon: string; 
  selected: boolean; 
  onClick: () => void;
  subtitle: string;
}> = ({ title, icon, selected, onClick, subtitle }) => {
  return (
    <button
      onClick={onClick}
      className={`
        choice-card flex flex-col items-center justify-center p-12 md:p-16 lg:p-20
        rounded-lg transition-all duration-500 ease-expo
        border-2 relative group cursor-pointer
        ${selected 
          ? 'border-white bg-white/5 scale-105' 
          : 'border-white/20 hover:border-white/50 bg-transparent hover:bg-white/2.5'
        }
      `}
    >
      <div className="text-6xl md:text-7xl mb-6 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-3xl md:text-4xl font-heading uppercase mb-3 text-center tracking-tight">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-400 text-center max-w-xs">
        {subtitle}
      </p>
      {selected && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
      )}
    </button>
  );
};

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
            <button
              className="inline-block px-3 py-1 border border-white/30 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
            >
              Know More
            </button>
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
  const choiceContainerRef = useRef<HTMLDivElement>(null);
  const coursesContainerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  
  const [isLargeScreen, setIsLargeScreen] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024;
  });
  const [selection, setSelection] = useState<'student' | 'workexperience' | null>(null);
  const [scrollToUnlock, setScrollToUnlock] = useState(false);

  // Student course columns
  const studentLeftColumnIds = isLargeScreen ? [1, 3, 5] : [1, 2, 3, 4, 5, 6, 7];
  const studentRightColumnIds = isLargeScreen ? [2, 4, 6, 7] : [];

  // Work Experience course columns
  const workLeftColumnIds = isLargeScreen ? [101, 103, 105] : [101, 102, 103, 104, 105, 106, 107];
  const workRightColumnIds = isLargeScreen ? [102, 104, 106, 107] : [];

  // Get projects based on selection
  const projects = selection === 'student' ? studentProjects : workExperienceProjects;
  const leftColumnIds = selection === 'student' ? studentLeftColumnIds : workLeftColumnIds;
  const rightColumnIds = selection === 'student' ? studentRightColumnIds : workRightColumnIds;

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver for scroll lock on entry
  useEffect(() => {
    if (!sectionRef.current || selection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When section enters and no selection made yet, lock scroll
            setScrollToUnlock(true);
            document.body.style.overflow = 'hidden';
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [selection]);

  // Handle selection and unlock scroll
  const handleSelection = (type: 'student' | 'workexperience') => {
    setSelection(type);
    setScrollToUnlock(false);
    document.body.style.overflow = '';
  };

  // Handle reset and re-lock scroll
  const handleReset = () => {
    setSelection(null);
    setScrollToUnlock(true);
    document.body.style.overflow = 'hidden';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Only set up parallax if we have both refs and selection is made
      if (window.innerWidth >= 1024 && selection && leftColRef.current && rightColRef.current && coursesContainerRef.current) {
        gsap.to(leftColRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: coursesContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        gsap.to(rightColRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: coursesContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }

      // Card reveals
      if (selection) {
        gsap.utils.toArray('.work-card-inner').forEach((card: any) => {
          if (card) {
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
          }
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [selection]);

  return (
    <section ref={sectionRef} id="courses" className="relative z-20 bg-[#050505] text-white py-12 md:py-16 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
           <h2 className="text-[12vw] leading-[0.8] font-heading font-black mix-blend-exclusion z-10">
             OUR
           </h2>
           <h2 className="text-[12vw] leading-[0.8] font-heading font-black text-transparent stroke-text z-10 -mt-4 md:-mt-10">
             COURSES
           </h2>
        </div>

        {/* Choice Cards - Show when no selection made */}
        {!selection && (
          <div 
            ref={choiceContainerRef}
            className="choice-container mb-16 md:mb-24 animate-in"
          >
            <h3 className="text-center text-lg md:text-xl text-gray-400 mb-12 font-mono">
              Select your learning path
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
              <ChoiceCard
                title="Student"
                icon="🎓"
                subtitle="Perfect for freshers and beginners looking to start their tech career"
                selected={false}
                onClick={() => handleSelection('student')}
              />
              <ChoiceCard
                title="Work Experience"
                icon="💼"
                subtitle="Advanced courses for professionals and working experts"
                selected={false}
                onClick={() => handleSelection('workexperience')}
              />
            </div>
          </div>
        )}

        {/* Courses Grid - Show after selection */}
        {selection && (
          <>
            {/* Reset Button */}
            <div className="mb-8 px-4 md:px-8 lg:px-12">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-300 font-mono group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                <span>Change Selection</span>
              </button>
            </div>

            {/* Tagline that changes based on selection */}
            <div className="mb-12 px-4 md:px-8 lg:px-12 text-center">
              <p className="text-base md:text-lg text-gray-400 font-mono max-w-2xl mx-auto leading-relaxed">
                {selection === 'student' 
                  ? 'Start your journey with comprehensive courses designed for beginners. Learn from fundamentals to advanced concepts with hands-on projects.'
                  : 'Accelerate your career with specialized courses for professionals. Upskill in emerging technologies and reposition yourself for new opportunities.'
                }
              </p>
            </div>

            {/* Courses Grid */}
            <div ref={coursesContainerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 px-4 md:px-8 lg:px-12">
              
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
          </>
        )}

        {/* Scroll Lock Indicator */}
        {scrollToUnlock && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20 animate-pulse">
              <span className="text-xs md:text-sm text-gray-300">Make a selection to continue</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}