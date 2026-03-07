import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  ChevronDown, 
  Trophy, 
  Code2, 
  Cpu, 
  Globe, 
  Terminal,
  Download,
  Briefcase,
  GraduationCap,
  Award,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { portfolioData } from './data';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Splash } from './components/Splash';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import trafficImg from './public/trafic_control_system.png';
import skilloImg from './public/skillo_yuva.png';
import digitalSafeImg from './public/digital_safeIndia.png';
import movieImg from './public/movie_rs.png';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'achievements', 'projects', 'skills'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 selection:bg-emerald-500/30 selection:text-emerald-400",
      theme === 'dark' ? "bg-black text-white" : "bg-pure-white text-slate-900"
    )}>
      <AnimatePresence>
        {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatedBackground theme={theme} />
          
          {/* Navigation */}
          <nav className={cn(
            "fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 md:px-12 py-3 backdrop-blur-xl border rounded-full flex items-center gap-6 md:gap-12 transition-all duration-300",
            theme === 'dark' ? "bg-white/5 border-white/10" : "bg-alice-blue/50 border-black/10"
          )}>
            <div className="hidden md:flex items-center gap-8">
              {['Hero', 'Experience', 'Achievements', 'Projects', 'Skills'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={cn(
                    "text-xs uppercase tracking-widest transition-colors hover:text-emerald-500 cursor-pointer",
                    activeSection === item.toLowerCase() 
                      ? "text-emerald-500 font-bold" 
                      : (theme === 'dark' ? "text-white/50" : "text-slate-500")
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-white/10 hidden md:block" />

            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer",
                theme === 'dark' ? "bg-white/10 text-yellow-400" : "bg-white-smoke text-indigo-600"
              )}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-emerald-500/10 text-emerald-500 cursor-pointer"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                  "fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8 backdrop-blur-2xl",
                  theme === 'dark' ? "bg-black/90" : "bg-pure-white/90"
                )}
              >
                {['Hero', 'Experience', 'Achievements', 'Projects', 'Skills'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollTo(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "text-2xl font-black tracking-tighter transition-colors cursor-pointer",
                      activeSection === item.toLowerCase() ? "text-emerald-500" : (theme === 'dark' ? "text-white" : "text-slate-900")
                    )}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <main className="relative z-10">
            {/* Hero Section */}
            <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={cn(
                  "text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b",
                  theme === 'dark' ? "from-white to-white/100" : "from-slate-900 to-slate-500"
                )}
              >
                {portfolioData.basics.name}
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-emerald-500 font-mono text-sm md:text-lg mb-8 max-w-2xl font-bold"
              >
                {portfolioData.basics.title}
              </motion.p>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={cn(
                  "text-sm md:text-base max-w-4xl mb-12 leading-relaxed",
                  theme === 'dark' ? "text-white/60" : "text-slate-600"
                )}
              >
                {portfolioData.basics.summary}
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => scrollTo('experience')}
                  className={cn(
                    "px-8 py-4 font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/10 cursor-pointer",
                    theme === 'dark' ? "bg-white text-black hover:bg-emerald-500 hover:text-white" : "bg-slate-900 text-white hover:bg-emerald-600"
                  )}
                >
                  View Experience
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
                <a
                  href="https://drive.google.com/file/d/16iEhpjj92pAsYCAqDcPNQcNMuA5iAC96/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "px-8 py-4 border rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                    theme === 'dark' ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white-smoke border-black/10 hover:bg-black/10"
                  )}
                >
                  <ExternalLink className="w-4 h-4" />
                  Review Resume
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 flex gap-6"
              >
                <a href={portfolioData.basics.links.github} target="_blank" className={cn(
                  "transition-colors cursor-pointer",
                  theme === 'dark' ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-slate-900"
                )}>
                  <Github className="w-5 h-5" />
                </a>
                <a href={portfolioData.basics.links.linkedin} target="_blank" className={cn(
                  "transition-colors cursor-pointer",
                  theme === 'dark' ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-slate-900"
                )}>
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${portfolioData.basics.email}`} className={cn(
                  "transition-colors cursor-pointer",
                  theme === 'dark' ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-slate-900"
                )}>
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </section>

            {/* Impact Strip */}
            <div className={cn(
              "py-12 border-y backdrop-blur-sm",
              theme === 'dark' ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-ghost-white"
            )}>
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                {portfolioData.achievements.slice(0, 4).map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-4xl font-black text-emerald-500 mb-1">{stat.value}</div>
                    <div className={cn(
                      "text-[10px] uppercase tracking-widest font-bold",
                      theme === 'dark' ? "text-white/40" : "text-slate-400"
                    )}>{stat.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <section id="experience" className="py-32 px-6 max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-16">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <Briefcase className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Professional Experiences</h2>
                  <p className={cn(
                    "text-sm font-mono uppercase tracking-widest",
                    theme === 'dark' ? "text-white/40" : "text-slate-400"
                  )}>Experience Timeline</p>
                </div>
              </div>

              <div className="space-y-8">
                {portfolioData.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                      "rounded-2xl border p-6 md:p-8 transition-all duration-300 group",
                      theme === 'dark'
                        ? "bg-white/[0.03] border-white/10 hover:border-emerald-500/40"
                        : "bg-white border-black/8 shadow-md hover:border-emerald-500/40"
                    )}
                  >
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-black group-hover:text-emerald-500 transition-colors">{exp.role}</h3>
                        <div className={cn(
                          "text-sm font-semibold flex items-center gap-2 mt-1",
                          theme === 'dark' ? "text-white/60" : "text-slate-500"
                        )}>
                          <Globe className="w-3 h-3 text-emerald-500" />
                          {exp.company}
                          <span className={cn(theme === 'dark' ? "text-white/20" : "text-slate-300")}>•</span>
                          {exp.location}
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                        {exp.dates}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className={cn("w-full h-px mb-5", theme === 'dark' ? "bg-white/5" : "bg-black/5")} />

                    {/* Bullets */}
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className={cn(
                          "text-sm leading-relaxed flex gap-3",
                          theme === 'dark' ? "text-white/60" : "text-slate-600"
                        )}>
                          <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Achievements Section */}
            <section id="achievements" className={cn(
              "py-32 px-6",
              theme === 'dark' ? "bg-white/[0.02]" : "bg-ghost-white"
            )}>
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-16 justify-center text-center">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <Trophy className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">Milestones & Wins</h2>
                    <p className={cn(
                      "text-sm font-mono uppercase tracking-widest",
                      theme === 'dark' ? "text-white/40" : "text-slate-400"
                    )}>Recognition & Impact</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {portfolioData.achievements.map((ach, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10 }}
                      className={cn(
                        "p-8 rounded-3xl border transition-all duration-500 group relative overflow-hidden",
                        theme === 'dark' ? "bg-white/[0.03] border-white/10 hover:border-emerald-500/50" : "bg-white-smoke border-black/5 shadow-xl shadow-black/5 hover:border-emerald-500/50"
                      )}
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Trophy className="w-24 h-24 text-emerald-500" />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="text-4xl font-black text-emerald-500 mb-2">{ach.value}</div>
                        <h3 className="text-lg font-bold mb-4">{ach.title}</h3>
                        <p className={cn(
                          "text-xs leading-relaxed",
                          theme === 'dark' ? "text-white/40" : "text-slate-500"
                        )}>{ach.context}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-16">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <Code2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Featured Works</h2>
                  <p className={cn(
                    "text-sm font-mono uppercase tracking-widest",
                    theme === 'dark' ? "text-white/40" : "text-slate-400"
                  )}>Systems & Web Engineering</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {portfolioData.projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => navigate(`/project/${project.slug}`)}
                    className={cn(
                      "group rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer hover:border-emerald-500/50",
                      theme === 'dark' ? "bg-white/[0.03] border-white/10" : "bg-white-smoke border-black/5 shadow-2xl shadow-black/5"
                    )}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                      src={[trafficImg, skilloImg, digitalSafeImg, movieImg][i]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={cn(
                      "p-6 border-t",
                      theme === 'dark' ? "border-white/5" : "border-black/5"
                    )}>
                      <h3 className="text-lg font-bold group-hover:text-emerald-500 transition-colors flex items-center gap-2">
                        {project.title}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.stack.slice(0, 4).map((tech, j) => (
                          <span key={j} className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className={cn(
              "py-32 px-6",
              theme === 'dark' ? "bg-white/[0.02]" : "bg-ghost-white"
            )}>
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-16 justify-center">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <Cpu className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">Technical Arsenal</h2>
                    <p className={cn(
                      "text-sm font-mono uppercase tracking-widest",
                      theme === 'dark' ? "text-white/40" : "text-slate-400"
                    )}>Skills & Technologies</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(portfolioData.skills).map(([category, skills], i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={cn(
                        "p-8 rounded-3xl border transition-all duration-300",
                        theme === 'dark' ? "bg-white/[0.03] border-white/10" : "bg-white-smoke border-black/5 shadow-xl shadow-black/5"
                      )}
                    >
                      <h3 className="text-emerald-500 font-mono text-xs uppercase tracking-widest mb-6 font-bold">{category}</h3>
                      <div className="flex flex-wrap gap-3">
                        {skills.map((skill, j) => (
                          <span 
                            key={j}
                            className={cn(
                              "px-4 py-2 rounded-xl border text-sm transition-all cursor-pointer",
                              theme === 'dark' ? "bg-white/5 border-white/10 text-white/60 hover:bg-emerald-500/10 hover:border-emerald-500/30" : "bg-mint-cream border-black/5 text-slate-600 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                            )}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className={cn(
              "py-20 px-6 border-t transition-colors duration-500",
              theme === 'dark' ? "bg-black border-white/5" : "bg-pure-white border-black/5"
            )}>
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
                  <div className="text-center md:text-left">
                    <div className="text-4xl font-black mb-4 tracking-tighter">
                      RK<span className="text-emerald-500">Y</span>
                    </div>
                    <p className={cn(
                      "text-sm max-w-xs leading-relaxed",
                      theme === 'dark' ? "text-white/40" : "text-slate-500"
                    )}>
                      Building high-performance digital experiences with precision and purpose.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-8">
                    {[
                      { icon: Github, href: portfolioData.basics.links.github },
                      { icon: Linkedin, href: portfolioData.basics.links.linkedin },
                      { icon: Mail, href: `mailto:${portfolioData.basics.email}` },
                      { icon: Phone, href: `tel:${portfolioData.basics.phone}` }
                    ].map((social, i) => (
                      <a 
                        key={i}
                        href={social.href} 
                        target="_blank" 
                        className={cn(
                          "p-4 rounded-2xl transition-all duration-300 hover:scale-110 cursor-pointer",
                          theme === 'dark' ? "bg-white/5 text-white/40 hover:text-white hover:bg-white/10" : "bg-white-smoke text-slate-400 hover:text-slate-900 hover:bg-black/10"
                        )}
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className={cn(
                  "pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6",
                  theme === 'dark' ? "border-white/5" : "border-black/5"
                )}>
                  <p className={cn(
                    "text-[10px] uppercase tracking-widest font-bold",
                    theme === 'dark' ? "text-white/20" : "text-slate-400"
                  )}>
                    © {new Date().getFullYear()} Rajesh Kumar Yadav. All rights reserved.
                  </p>
                  <div className="flex gap-8">
                    {['Privacy', 'Terms', 'Cookies'].map(item => (
                      <button key={item} className={cn(
                        "text-[10px] uppercase tracking-widest font-bold transition-colors hover:text-emerald-500 cursor-pointer",
                        theme === 'dark' ? "text-white/20" : "text-slate-400"
                      )}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </motion.div>
      )}
    </div>
  );
}
