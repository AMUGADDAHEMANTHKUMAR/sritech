# SRITECH Website

A modern, animated tech education platform built with React, TypeScript, and GSAP animations. Features a dynamic course selection experience, enrollment system with WhatsApp integration, smooth scrolling, and custom cursor interactions.

## About SRITECH

SRITECH is a tech education platform offering quality programming courses tailored to two learning paths:
- **Beginner Path** — For freshers and students starting their tech career
- **Professional Path** — For working professionals upskilling or repositioning their career

## Features

- Dynamic course selection (Beginner / Professional learning paths)
- Course enrollment page with two-column layout (details + registration form)
- WhatsApp-integrated enrollment — form submission redirects to WhatsApp group
- Smooth scrolling with Lenis
- GSAP animations with ScrollTrigger
- Scroll-lock on course selection for guided user experience
- Custom cursor interactions
- Responsive design (mobile, tablet, desktop)
- Testimonials section with student reviews
- Modern typography with Syne and Manrope fonts

## Courses Offered

### Beginner Path (Students / Freshers)
- Java Full Stack
- MERN Full Stack
- Python Full Stack
- Web Development
- Job Placement Support
- Internship Program
- Freelancing Guidance

### Professional Path (Working Experience)
- RAP ABAP
- Java AI
- SFD
- IT GRC
- CPI
- UI Session
- Snowflake

## Tech Stack

- React 19
- TypeScript
- Vite
- GSAP (GreenSock Animation Platform)
- Lenis (Smooth Scrolling)
- React Router v6
- Tailwind CSS
- Lucide React (Icons)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
├── components/
│   ├── CustomCursor.tsx     # Custom cursor interaction
│   ├── Footer.tsx           # Footer with sitemap and contact info
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Landing hero section
│   ├── Intro.tsx            # Intro/about section
│   ├── Manifesto.tsx        # Brand manifesto section
│   ├── Marquee.tsx          # Scrolling marquee component
│   ├── Process.tsx          # How it works / process section
│   ├── Services.tsx         # Services offered section
│   ├── Team.tsx             # Team / testimonials section
│   ├── WorkGallery.tsx      # Our Courses section (Beginner + Professional paths)
│   └── EnrollPage.tsx       # Course enrollment page with registration form
├── public/                  # Static assets
├── App.tsx                  # Main application with React Router setup
├── index.tsx                # Application entry point
├── styles.css               # Global styles
└── vite.config.ts           # Vite configuration
```

## Enrollment Flow

1. User lands on the **Our Courses** section
2. Scroll is locked — user must select a learning path
3. User selects **I AM BEGINNER** or **I AM PROFESSIONAL**
4. Courses display in a responsive grid layout
5. User clicks **ENROLL** on any course
6. Enrollment page opens with course details (left) and registration form (right)
7. User fills in: Full Name, Email, Phone Number, Message
8. Course name is pre-filled and locked (read-only)
9. On valid submission → redirects to WhatsApp with pre-filled enrollment message

## Contact

- **Email:** support@sritechsoftwareservices.com
- **Phone:** +91 96426 24484
- **WhatsApp:** Available via enrollment form

## License

Private project — SRITECH Software Services
