import { useState, useEffect, useRef } from "react";
import "./App.css";
const COLORS = {
  bg: "#0A0A0C",
  bgCard: "#121318",
  bgHover: "#181A22",
  border: "rgba(212, 175, 55, 0.12)",
  borderHover: "rgba(212, 175, 55, 0.25)",
  accent: "#D4AF37",
  accentDim: "rgba(212, 175, 55, 0.08)",
  accentBorder: "rgba(212, 175, 55, 0.3)",
  teal: "#7EA8BE",
  tealDim: "rgba(126, 168, 190, 0.1)",
  text: "#F2EFE9",
  muted: "#6E6A62",
  mutedMid: "#A39E93",
};
const data = {
  name: "Anant Dhoundiyal",
  titleLine1: "Software",
  titleLine2: "Engineer",
  subtitle: "B.Tech CSE · Computer Science & Engineering",
  summary:
    "Diligent and innovative software engineer specialising in scalable and efficient solutions. Combining a strong academic foundation with practical experience in modern web development, programming, and software design.",
  skills: {
    Languages: ["Python", "C++", "JavaScript", "HTML", "CSS"],
    "Frameworks & Libraries": ["React"],
    "Tools & Platforms": ["AppSheet", "Scratch", "Git / GitHub"],
  },
  projects: [
    {
      title: "Personal Finance & Goal Tracker",
      stack: "React",
      description:
        "Comprehensive dashboard to manage budgets, track debt repayment, and monitor long-term savings goals for international travel and retirement. Features complex state management and real-time data visualisations.",
      icon: "💰",
      color: COLORS.accent,
    },
    {
      title: "Cinematic Database & Review Platform",
      stack: "React",
      description:
        "Dynamic web application for browsing, searching, and reviewing prestige television and movies. Utilises React hooks and custom components for external REST API fetching with seamless UI rendering.",
      icon: "🎬",
      color: COLORS.teal,
    },
    {
      title: "Anime Quiz Portal",
      stack: "JavaScript",
      description:
        "Interactive quiz application testing knowledge across various anime universes. Advanced JavaScript handles core game logic, state, and dynamic DOM manipulation for instant feedback without page reloads.",
      icon: "⚔️",
      color: "#C084FC",
    },
    {
      title: "Global Travel Website",
      stack: "HTML · CSS",
      description:
        "Visually appealing multi-page static website showcasing international destinations and itinerary packages. Mobile-first responsive design using CSS Flexbox and Grid with full cross-browser compatibility.",
      icon: "🌍",
      color: "#60A5FA",
    },
    {
      title: "Interior Design Client Tracker",
      stack: "AppSheet",
      description:
        "Specialised client management application built on Google AppSheet to track client preferences, project timelines, and communications for an interior design workflow.",
      icon: "🏠",
      color: "#F87171",
    },
    {
      title: "Text Summariser",
      stack: "Python",
      description:
        "Tool to process and condense large bodies of text into concise summaries. Focused on algorithmic efficiency and clean code structure.",
      icon: "📝",
      color: "#4ADE80",
    },
    {
      title: "Personal Portfolio Website",
      stack: "React · HTML · CSS · JS",
      description:
        "Responsive portfolio website showcasing projects, technical skills, and professional contact information — designed and developed from scratch.",
      icon: "🌐",
      color: COLORS.accent,
    },
  ],
  education: [
    {
      school: "ITM Skills University",
      degree: "B.Tech in Computer Science & Engineering",
      type: "University",
    },
    {
      school: "DAV Public School",
      degree: "12th Grade — PCM Stream",
      type: "Senior Secondary",
    },
    {
      school: "Presentation Convent School",
      degree: "10th Grade — Science",
      type: "Secondary",
    },
  ],
  achievements: [
    {
      icon: "🏆",
      title: "State-Level Abacus",
      desc: "Multiple trophies at state-level competitions — rapid calculation and analytical acuity.",
    },
    {
      icon: "✍️",
      title: "Creative Competitions",
      desc: "Awarded at school-level essay writing and drawing competitions.",
    },
    {
      icon: "🧩",
      title: "Speed Cubing",
      desc: "Solves the 3×3 Rubik's Cube using the advanced F2L (First Two Layers) method.",
    },
    {
      icon: "🏏",
      title: "Athletics",
      desc: "Active in cricket and badminton; avid football enthusiast.",
    },
  ],
};
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}
function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
function Tag({ children, color }) {
  return (
    <span
      className="got-tag"
      style={{
        borderColor: color || undefined,
        color: color || undefined,
        background: color ? `${color}14` : undefined,
      }}
    >
      {children}
    </span>
  );
}
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["about", "skills", "projects", "education", "achievements"];
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActive(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const links = ["About", "Skills", "Projects", "Education", "Achievements"];
  return (
    <nav className={`got-navbar ${scrolled ? "scrolled" : ""}`}>
      <span className="got-logo">
        AD<span className="got-logo-dot">.</span>
      </span>
      <div className="got-nav-links">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className={`got-nav-link ${active === l.toLowerCase() ? "active" : ""}`}
          >
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);
  return (
    <section id="hero" className="hero-section">
      <div className="ambient-glow-orange" />
      <div className="ambient-glow-teal" />
      <div style={{ maxWidth: "900px" }}>
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(16px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          <span className="hero-code-tag">&#47;&#47; Portfolio — 2025</span>
        </div>
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(24px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          <h1 className="hero-title">
            {data.name.split(" ")[0]}
            <br />
            <span className="hero-title-bold">
              {data.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>
        </div>
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "all 0.7s ease 0.38s",
          }}
          className="hero-subtitle-container"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="hero-subtitle-bar" />
            <span className="hero-subtitle-text">
              {data.titleLine1} {data.titleLine2}
            </span>
          </div>
          <Tag color={COLORS.accent}>{data.subtitle}</Tag>
        </div>
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease 0.55s",
          }}
          className="hero-summary"
        >
          <p style={{ margin: 0 }}>{data.summary}</p>
        </div>
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease 0.7s",
          }}
          className="hero-buttons"
        >
          {["LinkedIn", "GitHub", "Email"].map((label) => (
            <button
              key={label}
              className={`hero-btn ${label === "Email" ? "hero-btn-primary" : "hero-btn-secondary"}`}
              onClick={() => {
                if (label === "LinkedIn") window.open("https://www.linkedin.com/in/anant-dhoundiyal-70a42437a/", "_blank");
                else if (label === "GitHub") window.open("https://github.com/anantd16", "_blank");
                else if (label === "Email") window.location.href = "mailto:anantdhoundiiyal1126pcsnerul.in@gmail.com";
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div
        className="hero-scroll-hint"
        style={{
          opacity: mounted ? 0.4 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
      >
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-bar" />
      </div>
    </section>
  );
}
function SectionLabel({ children }) {
  return (
    <div className="section-label-container">
      <span className="section-label-text">{children}</span>
      <div className="section-label-line" />
    </div>
  );
}
function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <FadeIn>
        <SectionLabel>02 · Skills</SectionLabel>
      </FadeIn>
      <div className="skills-grid">
        {Object.entries(data.skills).map(([category, items], i) => (
          <FadeIn key={category} delay={i * 0.1}>
            <div className="skills-card">
              <p className="skills-cat-title">{category}</p>
              <div className="skills-tag-container">
                {items.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
function ProjectCard({ project, index }) {
  return (
    <FadeIn delay={index * 0.07}>
      <div className="project-card">
        <div
          className="project-accent-line"
          style={{ background: project.color }}
        />
        <div className="project-header">
          <span className="project-icon">{project.icon}</span>
          <Tag color={project.color}>{project.stack}</Tag>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
    </FadeIn>
  );
}
function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <FadeIn>
        <SectionLabel>03 · Projects</SectionLabel>
      </FadeIn>
      <div className="projects-grid">
        {data.projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
function EducationSection() {
  return (
    <section id="education" className="education-section">
      <FadeIn>
        <SectionLabel>04 · Education</SectionLabel>
      </FadeIn>
      <div className="education-container">
        {data.education.map((edu, i) => (
          <FadeIn key={edu.school} delay={i * 0.12}>
            <div className="education-item">
              {i < data.education.length - 1 && <div className="education-line" />}
              <div className="education-dot-outer">
                <div className="education-dot-inner" />
              </div>
              <div className="education-details">
                <span className="education-meta">{edu.type}</span>
                <h3 className="education-school">{edu.school}</h3>
                <p className="education-degree">{edu.degree}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
function AchievementsSection() {
  return (
    <section id="achievements" className="achievements-section">
      <FadeIn>
        <SectionLabel>05 · Achievements</SectionLabel>
      </FadeIn>
      <div className="achievements-grid">
        {data.achievements.map((a, i) => (
          <FadeIn key={a.title} delay={i * 0.09}>
            <div className="achievement-card">
              <div className="achievement-icon">{a.icon}</div>
              <h4 className="achievement-title">{a.title}</h4>
              <p className="achievement-desc">{a.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="got-footer">
      <span className="footer-credit">
        ANANT DHOUNDIYAL · {new Date().getFullYear()}
      </span>
      <span className="footer-badge">
        Built with React
        <span className="footer-badge-symbol">♦</span>
      </span>
    </footer>
  );
}
export default function Portfolio() {
  useEffect(() => {
    document.title = "Anant Dhoundiyal — Portfolio";
  }, []);
  return (
    <div className="portfolio-container">
      <Nav />
      <HeroSection />
      <section id="about" className="about-section">
        <FadeIn>
          <SectionLabel>01 · About</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="about-quote-container">
            <p className="about-text">{data.summary}</p>
          </div>
        </FadeIn>
      </section>
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <AchievementsSection />
      <Footer />
    </div>
  );
}