import React, { useState } from "react";
import { Project } from "../types";
import { X, Play, RefreshCw, Zap, Server, Activity, ShieldCheck, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  if (!project) return null;

  // Simulator State for Nexus AI
  const [nexusStatus, setNexusStatus] = useState<"idle" | "running" | "successful" | "error">("idle");
  const [nexusLogs, setNexusLogs] = useState<string[]>(["[System Ready] Ready for automation..."]);
  const [nexusStep, setNexusStep] = useState(0);

  const triggerNexusAutomation = () => {
    if (nexusStatus === "running") return;
    setNexusStatus("running");
    setNexusLogs((prev) => [...prev, "[0ms] Bootstrapping pipeline trigger...", "[50ms] Initializing AI parsing engine..."]);
    setNexusStep(1);

    setTimeout(() => {
      setNexusLogs((prev) => [...prev, "[450ms] AI model successfully processed raw instructions.", "[500ms] Packaging API variables..."]);
      setNexusStep(2);
    }, 700);

    setTimeout(() => {
      setNexusLogs((prev) => [...prev, "[900ms] Transmitting state to integrated workspace hubs...", "[1100ms] Active verification succeeded."]);
      setNexusStatus("successful");
      setNexusStep(3);
    }, 1500);
  };

  const resetNexusSimulator = () => {
    setNexusStatus("idle");
    setNexusStep(0);
    setNexusLogs(["[System Reset] Ready for pipeline instructions."]);
  };

  // Simulator State for HyperSpace
  const [clusters, setClusters] = useState(4);
  const [systemLoad, setSystemLoad] = useState(65);

  const calculateLatency = () => {
    const calculated = Math.max(8, Math.round((systemLoad * 1.5) / (clusters * 0.8)));
    return calculated;
  };

  const calculateThroughput = () => {
    return Math.round(clusters * 3.4 * (120 - systemLoad));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop filter overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#09090b] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto flex flex-col relative z-10 shadow-2xl scrollbar-thin scrollbar-thumb-white/5"
        >
          {/* Header Panel */}
          <div className="sticky top-0 bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 p-4 md:p-6 flex items-center justify-between z-20">
            <div>
              <p className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase font-bold">Project Details</p>
              <h2 className="text-xl md:text-2xl font-bold font-sans text-white tracking-tight mt-0.5">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              id="btn-close-modal"
              className="p-1.5 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6 flex-1">
            {/* Split Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left Column: Visual Artwork & Tags */}
              <div className="lg:col-span-2 space-y-6">
                <div className="aspect-video lg:aspect-square bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Key Metrics Bento Widget */}
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map((met, idx) => (
                    <div key={idx} className="bg-[#121214] border border-white/10 rounded-2xl p-3 text-center hover:border-white/20 transition-all">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{met.label}</p>
                      <p className="text-lg font-bold font-sans text-white mt-1">{met.value}</p>
                    </div>
                  ))}
                </div>

                {/* System Technologies used */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Stack Architect</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-zinc-900 border border-white/10 text-zinc-300 font-sans px-3 py-1 rounded-full text-center"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Bio & Interactive Sandbox Simulator */}
              <div className="lg:col-span-3 space-y-6">
                <section className="space-y-3 text-left">
                  <h3 className="font-bold font-sans text-sm tracking-wider uppercase text-zinc-400">Project Mission</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">{project.description}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">{project.fullDetails}</p>
                </section>

                {/* INTERACTIVE PLAYGROUND SANDBOX */}
                <section className="border border-white/10 bg-[#121214] rounded-3xl p-4 md:p-5 space-y-4 hover:border-white/20 transition-all">
                  <header className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Cpu size={15} className="text-emerald-400" />
                      <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-emerald-400">Interactive Simulation Sandbox</h4>
                    </div>
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                      SANDBOX_ONLINE
                    </span>
                  </header>

                  {/* SIMULATOR 1 - NEXUS AI */}
                  {project.demoType === "nexus" && (
                    <div className="space-y-4 text-left">
                      <p className="text-xs text-zinc-400">
                        See how the AI pipeline automation coordinates. Click the trigger block below to run simulated agents.
                      </p>

                      {/* Visual Pipeline layout */}
                      <div className="grid grid-cols-3 gap-2 py-3 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-zinc-800 -translate-y-1/2 -z-10" />

                        {/* Node 1 */}
                        <div
                          className={`border rounded-2xl p-2 text-center transition-colors ${
                            nexusStep >= 1
                              ? "bg-emerald-500/10 border-emerald-500 text-white"
                              : "bg-zinc-900/40 border-white/10 text-zinc-500"
                          }`}
                        >
                          <Zap size={15} className="mx-auto mb-1 animate-pulse" />
                          <p className="text-[10px] font-bold">1. Capture Trigger</p>
                        </div>

                        {/* Node 2 */}
                        <div
                          className={`border rounded-2xl p-2 text-center transition-colors ${
                            nexusStep >= 2
                              ? "bg-emerald-500/10 border-emerald-500 text-white"
                              : "bg-zinc-900/40 border-white/10 text-zinc-500"
                          }`}
                        >
                          <Activity size={15} className="mx-auto mb-1" />
                          <p className="text-[10px] font-bold">2. NLP Model Analysis</p>
                        </div>

                        {/* Node 3 */}
                        <div
                          className={`border rounded-2xl p-2 text-center transition-colors ${
                            nexusStep >= 3
                              ? "bg-emerald-500/10 border-emerald-500 text-white"
                              : "bg-zinc-900/40 border-white/10 text-zinc-500"
                          }`}
                        >
                          <Server size={15} className="mx-auto mb-1" />
                          <p className="text-[10px] font-bold">3. Dispatch Hooks</p>
                        </div>
                      </div>

                      {/* Interactive Console logs */}
                      <div className="bg-black border border-white/10 rounded-2xl p-3 h-28 overflow-y-auto font-mono text-[10px] text-zinc-400 space-y-1 scrollbar-none">
                        {nexusLogs.map((log, lIdx) => (
                          <p key={lIdx} className={log.includes("verification") || log.includes("processed") ? "text-emerald-400" : ""}>
                            {log}
                          </p>
                        ))}
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={resetNexusSimulator}
                          id="btn-reset-nexus"
                          className="px-3 py-1.5 outline-none rounded-xl bg-[#09090b] border border-white/10 text-xs text-zinc-400 hover:text-white transition-all hover:border-white/20"
                        >
                          <RefreshCw size={12} className="inline mr-1" /> Reset
                        </button>
                        <button
                          onClick={triggerNexusAutomation}
                          id="btn-run-nexus"
                          disabled={nexusStatus === "running"}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold font-sans transition-all flex items-center gap-1 ${
                            nexusStatus === "running"
                              ? "bg-emerald-500/20 text-emerald-500 cursor-not-allowed"
                              : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg animate-pulse"
                          }`}
                        >
                          <Play size={12} fill="currentColor" /> {nexusStatus === "running" ? "Running AI Pipeline..." : "Execute Automation"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SIMULATOR 2 - HYPERSPACE */}
                  {project.demoType === "hyperspace" && (
                    <div className="space-y-4 text-left">
                      <p className="text-xs text-zinc-400">
                        Synthesize Cloud architecture efficiency. Tweak simulated cluster assets and load stress levels to calculate output bandwidth metrics.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                        {/* Clusters Count Input */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-zinc-500">Node Cluster Count</span>
                            <span className="text-indigo-400 font-bold">{clusters} units</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="12"
                            value={clusters}
                            onChange={(e) => setClusters(Number(e.target.value))}
                            className="w-full h-1.5 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                          />
                        </div>

                        {/* CPU core Load Load */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-zinc-500">Live Stress Load</span>
                            <span className="text-indigo-400 font-bold">{systemLoad}%</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="99"
                            value={systemLoad}
                            onChange={(e) => setSystemLoad(Number(e.target.value))}
                            className="w-full h-1.5 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Dynamic Outputs bento visual */}
                      <div className="grid grid-cols-3 gap-3 bg-black/40 border border-white/10 p-3 rounded-2xl text-center">
                        <div>
                          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Simulated Latency</p>
                          <p className="text-base font-bold font-mono text-emerald-400 mt-1">{calculateLatency()} ms</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Total Bandwidth</p>
                          <p className="text-base font-bold font-mono text-white mt-1">{calculateThroughput()} MB/s</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Cloud Health Status</p>
                          <div className="flex items-center justify-center gap-1.5 mt-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${systemLoad > 85 ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
                            <span className="text-[10px] font-mono text-zinc-300 font-bold">
                              {systemLoad > 85 ? "STRESSED" : "HEALTHY"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-indigo-500/5 border border-indigo-500/15 p-2.5 flex items-start gap-2.5">
                        <ShieldCheck size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-zinc-500 leading-snug">
                          Live server edge balancing algorithms active. High workloads scale out seamlessly to prevent cold starts of the Next.js clusters.
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
