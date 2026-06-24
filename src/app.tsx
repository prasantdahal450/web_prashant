import React, { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowUpRight,
  Code2,
  Sparkles,
  HeartHandshake,
  Cpu,
  Layers,
  Check,
  Zap,
  Globe,
  Terminal,
  Server
} from "lucide-react";
import { motion } from "motion/react";
import { Project, Experience, Skill } from "./types";
import TerminalWidget from "./components/TerminalWidget";
import InteractiveProfileEditor, { ProfileSettings } from "./components/InteractiveProfileEditor";
import ProjectDetailsModal from "./components/ProjectDetailsModal";
import ContactCard from "./components/ContactCard";

export default function App() {
  // Live Config settings linked to Interactive profile editor
  const [settings, setSettings] = useState<ProfileSettings>({
    isAvailable: true,
    mood: "technical",
    themeColor: "emerald",
    focusTagline: "Engineered for pure speed, fluid micro-interactions, and visual precision.",
  });

  // Local Nepali / Kathmandu time clock
  const [kathmanduTime, setKathmanduTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setKathmanduTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamic status bio text calculated based on selected Persona mood
  const getPersonaBio = () => {
    switch (settings.mood) {
      case "technical":
        return {
          header: "System Architect Persona",
          text: "Focused on core microservice pipelines, reliable backend systems, and automated build chains. Prashant leverages deep TypeScript, Node schemas, and Postgres instances to construct resilient architectures capable of managing tens of thousands of requests effortlessly.",
          badge: "Full Scale Backend",
        };
      case "creative":
        return {
          header: "Interactive Visualist Persona",
          text: "Driven by pixel-perfect animation transitions, elegant bento dashboards, and dark-mode designs. Prashant uses modern Tailwind, hardware-accelerated spring animations, and vector iconography to make custom browser systems feel highly physical.",
          badge: "Aesthetic Engineer",
        };
      case "product":
        return {
          header: "User Workflow Strategist Persona",
          text: "Focused on high-performance human experiences, visual cues, and lightweight user patterns. Prashant designs tools that minimize administrative bloat to double developer throughput, optimizing application workflows based on metrics, not assumptions.",
          badge: "Interface Architect",
        };
    }
  };

  const persona = getPersonaBio();

  // Selected work database
  const projects: Project[] = [
    {
      id: "nexus-ai",
      title: "Nexus AI",
      tagline: "Automated Intelligence & Workflow Orchestrator",
      description: "Next-generation workflow automation systems with modern node interfaces and modular pipeline triggers.",
      fullDetails: "An intelligent workspace dashboard consolidating server webhooks, LLM agents, and custom notification systems. This project features high-efficiency state coordination, fully styled using custom dark components to optimize administrative workloads. Visitors can trigger simulated actions inside the detail view.",
      image: "/src/assets/images/project_nexus_ai_1782186625325.jpg",
      tags: ["React", "Next.js", "TailwindCSS", "Node.js"],
      metrics: [
        { label: "Active Pipelines", value: "3.5k / mo" },
        { label: "Sync Latency", value: "12ms" },
      ],
      demoType: "nexus",
    },
    {
      id: "hyperspace",
      title: "HyperSpace",
      tagline: "High-Performance Cloud Edge Load balancer",
      description: "Ultra-fast requests routing layer and performance compiler handling massive request demands.",
      fullDetails: "HyperSpace operates directly at the network edge, monitoring global cluster performance metrics to optimize workload balancing. Includes multi-node scaling scripts, Redis cache syncing, and robust security validators. Use the interactive load sliders in the details workspace to watch performance analytics compute dynamically.",
      image: "/src/assets/images/project_hyperspace_1782186640891.jpg",
      tags: ["TypeScript", "Node.js", "GraphQL", "Redis"],
      metrics: [
        { label: "Network Bandwidth", value: "12 GB/s" },
        { label: "Response latency", value: "8ms" },
      ],
      demoType: "hyperspace",
    },
  ];

  // Journey experience timeline database
  const experience: Experience[] = [
    {
      id: "exp1",
      role: "Innovative Full-Stack Architect",
      company: "NexusLabs",
      period: "2025 — Present",
      description: "Coordinating high-scalability web engineering, microservice structures, and interactive data hubs.",
      bullets: [
        "Cut operational server costs by 35% through custom lazy loaders & caching layers.",
        "Created polished frontend design standards, empowering 6 designers to prototype in production.",
      ],
      badge: "Lead Position",
    },
    {
      id: "exp2",
      role: "Lead Platform Engineer",
      company: "HyperGroup",
      period: "2024 — 2025",
      description: "Designed core library component utilities, automation flows, and responsive layouts.",
      bullets: [
        "Migrated 14 critical enterprise portals to React 19 frameworks, boosting PageSpeed metrics to 98%.",
        "Engineered real-time server diagnostics dashboard displaying sub-second websocket status.",
      ],
    },
    {
      id: "exp3",
      role: "Systems Developer & Innovator",
      company: "Nepal OpenSource Hub",
      period: "2023 — 2024",
      description: "Coordinated custom API servers, server-rendered widgets, and terminal emulation tools.",
      bullets: [
        "Won 1st prize in national Hackathon for executing high-performance workspace software.",
        "Launched 4 developer-focused NPM libraries focused on rapid TypeScript typing schemas.",
      ],
    },
  ];

  // Technical stack list grouped
  const skills: Skill[] = [
    { name: "TypeScript", category: "frontend", level: 5, color: "from-blue-500/20 to-blue-400/20" },
    { name: "Next.js", category: "frontend", level: 5, color: "from-zinc-500/20 to-zinc-400/20" },
    { name: "React", category: "frontend", level: 5, color: "from-cyan-500/20 to-cyan-400/20" },
    { name: "Tailwind CSS", category: "frontend", level: 5, color: "from-teal-500/20 to-sky-400/20" },
    { name: "Node.js", category: "backend", level: 5, color: "from-green-500/20 to-emerald-400/20" },
    { name: "PostgreSQL", category: "backend", level: 4, color: "from-indigo-500/20 to-blue-400/20" },
    { name: "FastAPI", category: "backend", level: 4, color: "from-teal-500/20 to-emerald-400/20" },
    { name: "Python", category: "backend", level: 4, color: "from-yellow-500/20 to-blue-400/20" },
    { name: "GraphQL", category: "backend", level: 4, color: "from-pink-500/20 to-rose-400/20" },
    { name: "Git", category: "tools", level: 5, color: "from-orange-500/20 to-red-400/20" },
    { name: "Docker", category: "tools", level: 4, color: "from-sky-500/20 to-blue-400/20" },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black font-sans antialiased pb-20 overflow-y-auto">
      {/* Visual background ambient aura lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none glow-animation" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[125px] pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 space-y-4">
        
        {/* Navigation / Header Status Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6 gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono tracking-wider text-[11px] font-bold uppercase">Personal Dashboard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <span className="text-zinc-500 font-mono text-[11px] uppercase">PrashantDahal-Core-OS</span>
            </div>
            <h1 className="text-2xl font-bold font-sans tracking-tight text-white mt-1">Prashant Dahal</h1>
          </div>

          {/* Quick status bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#121214] border border-white/10 py-2.5 px-4 rounded-3xl w-full md:w-auto">
            {/* Pulsing indicator */}
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                {settings.isAvailable ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </>
                ) : (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </>
                )}
              </span>
              <span className="text-xs font-sans text-zinc-300 font-medium whitespace-nowrap">
                {settings.isAvailable
                  ? "Available for opportunities & collaborations"
                  : "Deep Focus Mode: Building active project channels"}
              </span>
            </div>

            <div className="hidden sm:block border-l border-white/10 h-4" />

            {/* Nepal Time indicator */}
            <div className="flex items-center gap-2 text-zinc-500">
              <Clock size={13} className="text-emerald-400" />
              <span className="font-mono text-xs font-bold text-zinc-400 whitespace-nowrap">Kathmandu {kathmanduTime || "00:00:00"}</span>
            </div>
          </div>
        </div>

        {/* BENTO GRID WORKSPACE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[minmax(190px,_auto)]">
          
          {/* Bento Card 1: HERO CONTAINER (Large/Double Width) - Spans 8 cols */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 bg-[#121214] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between group overflow-hidden relative hover:border-white/20 transition-all duration-300"
          >
            {/* Geometric visual overlay */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:from-emerald-500/15 transition-all duration-700" />

            <div className="space-y-4 text-left md:flex-1">
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-emerald-400 font-bold uppercase leading-none">
                  Developer & Innovator
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-sans text-white tracking-tight leading-none mb-2">
                Prashant Dahal
              </h2>
              <p className="text-base text-white/55 font-normal leading-relaxed font-sans max-w-xl">
                Turning sophisticated backend challenges and gorgeous user experiences into reusable, resilient, and highly premium web applications. Passionate about Next.js, performance optimization, and AI platform engineering.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2.5 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-zinc-650" /> Kathmandu, Nepal
                </span>
                <span className="text-zinc-700">•</span>
                <span className="flex items-center gap-1">
                  <Briefcase size={13} className="text-zinc-650" /> Lead Architect @ NexusLabs
                </span>
              </div>
            </div>

            {/* Profile Avatar Container with premium border glows */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-white/10 relative shrink-0 group-hover:border-emerald-500/40 transition-colors duration-500 shadow-xl bg-zinc-950">
              <img
                src="/src/assets/images/prashant_avatar_1782186605038.jpg"
                alt="Prashant Dahal profile avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-95 opacity-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-emerald-400">Ver. Online</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: ABOUT / PHILOSOPHY CARD (Spans 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-4 bg-[#121214] border border-white/10 rounded-3xl p-6 flex flex-col justify-between text-left group overflow-hidden hover:border-white/20 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-emerald-400" />
                <h3 className="font-sans font-bold text-sm tracking-tight text-white uppercase tracking-wider text-[11px]">Philosophy</h3>
              </div>
              
              <h4 className="font-bold text-base text-zinc-100 tracking-tight leading-snug">
                "Thriving on curiosity, optimization, and structural cleanliness."
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                I believe that code elegance comes from deliberate architectural planning. I aim to write systems that are self-healing, simple to scale, and deeply delightful to interact with.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Clean Architecture</span>
              <span className="text-emerald-400 font-bold">100% Focused</span>
            </div>
          </motion.div>

          {/* Bento Card 3: INTERACTIVE TERMINAL EMULATOR (Spans 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col"
          >
            <TerminalWidget />
          </motion.div>

          {/* Bento Card 4: LIVE CONFIG CONSOLE EDITOR CARD (Spans 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col"
          >
            <InteractiveProfileEditor settings={settings} onChange={setSettings} />
          </motion.div>

          {/* Bento Card 5: ACTIVE PERSONA BIO CARD (Spans 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="lg:col-span-4 bg-[#121214] border border-white/10 rounded-3xl p-6 flex flex-col justify-between text-left group overflow-hidden hover:border-white/20 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-400" />
                  <h3 className="font-sans font-bold text-zinc-300 font-mono tracking-wider uppercase text-[11px]">Active Persona</h3>
                </div>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                  {persona?.badge}
                </span>
              </div>

              <h4 className="font-bold text-base text-zinc-100 tracking-tight leading-snug">
                {persona?.header}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {persona?.text}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-sans text-zinc-500 font-bold leading-relaxed">
              <span>Active Focus: </span>
              <span className="text-white bg-white/5 px-2 py-1 rounded-md font-mono select-all ml-1 border border-white/10">
                {settings.focusTagline || "No tag specified"}
              </span>
            </div>
          </motion.div>

          {/* SECOND CONTAINER SPANS FOR SELECTED PROJECTS */}
          {/* Bento Card 6 & 7: SELECTED WORK FEATURE CARDS (Each spans 4 columns) */}
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className="lg:col-span-4 bg-[#121214] border border-white/10 rounded-3xl p-5 flex flex-col justify-between text-left group cursor-pointer hover:border-white/20 hover:bg-[#161619] transition-all duration-300 relative overflow-hidden"
            >
              {/* Card visual elements */}
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/5 text-zinc-500 group-hover:text-white group-hover:bg-white/10 transition-colors">
                <ArrowUpRight size={14} />
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Selected Project</p>
                
                {/* Thumbnail */}
                <div className="aspect-video bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-90 opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-zinc-100 font-sans tracking-tight leading-snug group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-snug font-sans">{project.description}</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-zinc-400 font-bold bg-[#09090b] px-2 py-0.5 rounded-md border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-zinc-400 font-bold">Inspect sandbox &rarr;</span>
              </div>
            </motion.div>
          ))}

          {/* Bento Card 8: EXPERIENCES / JOURNEY TIMELINE (Spans 8 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="lg:col-span-8 bg-[#121214] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between text-left group overflow-hidden hover:border-white/20 transition-all duration-300"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-emerald-400" />
                <h3 className="font-sans font-bold text-zinc-300 font-mono tracking-wider uppercase text-[11px]">Journey Timeline</h3>
              </div>

              {/* Minimalist vertical timeline */}
              <div className="relative border-l border-white/10 ml-3 pl-6 space-y-6 md:space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative group/timeline text-left">
                    {/* Pulsing checkpoint sphere */}
                    <span className="absolute -left-[31px] top-1.5 flex h-3.5 w-3.5 rounded-full bg-white border-[3px] border-black transition-colors" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-zinc-200 font-sans tracking-tight">{exp.role}</h4>
                        {exp.badge && (
                          <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-md">
                            {exp.badge}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-emerald-400 font-bold">{exp.period}</span>
                    </div>

                    <p className="text-xs text-emerald-400/90 font-medium font-sans mt-0.5">{exp.company}</p>
                    <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">{exp.description}</p>
                    
                    <ul className="mt-2 space-y-1 list-none pl-0">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-[11px] text-zinc-500 font-sans leading-relaxed flex items-start gap-1.5">
                          <Check size={11} className="text-emerald-500 mt-1 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Card 9: ARSENAL STACK STACK & TOOLS (Spans 4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="lg:col-span-4 bg-[#121214] border border-white/10 rounded-3xl p-6 flex flex-col justify-between text-left group overflow-hidden hover:border-white/20 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-emerald-400" />
                <h3 className="font-sans font-bold text-zinc-300 font-mono tracking-wider uppercase text-[11px]">Stack & Arsenal</h3>
              </div>

              <p className="text-xs text-zinc-450 leading-relaxed font-sans">
                A selection of modern web protocols and architectures engineered into everyday development flows.
              </p>

              {/* Grid database of stack indicators */}
              <div className="grid grid-cols-2 gap-2 pt-3">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-black/35 border border-white/10 rounded-2xl p-2.5 flex flex-col justify-between hover:border-emerald-500/20 hover:bg-black/40 transition-all cursor-default"
                  >
                    <span className="text-xs text-zinc-200 font-semibold leading-tight">{skill.name}</span>
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex-1 bg-zinc-900 h-1 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-mono font-bold text-zinc-500 shrink-0">
                        {skill.level}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-6 text-[10px] text-zinc-500 font-mono flex items-center justify-between">
              <span>TypeScript Driven</span>
              <span>Compiled Edge CSS</span>
            </div>
          </motion.div>

        </div>

        {/* CONNECT & CONTACT PIPELINE VECTOR SECTION (Takes full row) */}
        <section className="pt-8 text-left space-y-1">
          <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Let's Connect</p>
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white mb-6">Dispatch System Signals</h2>
          <ContactCard />
        </section>

        {/* Subtle developer telemetry credentials footer */}
        <footer className="border-t border-white/10 pt-10 mt-16 text-center text-xs text-zinc-600 select-none font-mono">
          <p>© {new Date().getFullYear()} Prashant Dahal. Build complete. Sandbox instances active.</p>
          <p className="text-[10px] text-zinc-500 mt-1">
            Engineered via Tailwind CSS + Spring Motion elements. Kathmandu UTC+5:45 Node synchrony.
          </p>
        </footer>

      </div>

      {/* Project details workspace simulation modal */}
      <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
