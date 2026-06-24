import React from "react";
import { Sliders, ToggleLeft, ToggleRight, Sparkles, Code2, HeartHandshake } from "lucide-react";

export interface ProfileSettings {
  isAvailable: boolean;
  mood: "technical" | "creative" | "product";
  themeColor: "emerald" | "violet" | "sky";
  focusTagline: string;
}

interface ProfileEditorProps {
  settings: ProfileSettings;
  onChange: (val: ProfileSettings) => void;
}

export default function InteractiveProfileEditor({ settings, onChange }: ProfileEditorProps) {
  const moods = [
    {
      id: "technical" as const,
      label: "Technical",
      icon: Code2,
      desc: "Deep core TypeScript, cloud compilers, & high scalability.",
    },
    {
      id: "creative" as const,
      label: "Creative",
      icon: Sparkles,
      desc: "Immersive micro-interactions, spring animations, & visual design.",
    },
    {
      id: "product" as const,
      label: "Product",
      icon: HeartHandshake,
      desc: "User workflows, performance metrics, & seamless UI blueprints.",
    },
  ];

  return (
    <div className="bg-[#121214] rounded-3xl border border-white/10 p-5 flex flex-col h-full justify-between hover:border-white/20 hover:scale-[1.01] transition-all duration-300">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sliders size={18} className="text-emerald-400" />
          <h3 className="font-sans font-bold text-sm tracking-tight text-white">Live Config Console</h3>
        </div>

        <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
          Manipulate variables below to dynamically hot-reload Prashant's core framework status, focus bio, and accent themes across this dashboard.
        </p>

        {/* Setting 1: Availability Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-black/30 p-3 rounded-2xl border border-white/10">
            <div>
              <p className="text-xs font-bold text-zinc-200">Availability Tag</p>
              <p className="text-[10px] text-zinc-500">Toggles live status indicators</p>
            </div>
            <button
              onClick={() => onChange({ ...settings, isAvailable: !settings.isAvailable })}
              className="text-zinc-400 hover:text-white transition-colors"
              id="btn-toggle-availability"
            >
              {settings.isAvailable ? (
                <ToggleRight size={28} className="text-emerald-400" />
              ) : (
                <ToggleLeft size={28} className="text-zinc-650" />
              )}
            </button>
          </div>

          {/* Setting 2: Mood / Persona Preset */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase block">Persona Architect</label>
            <div className="grid grid-cols-1 gap-2">
              {moods.map((m) => {
                const Icon = m.icon;
                const isSelected = settings.mood === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => onChange({ ...settings, mood: m.id })}
                    id={`btn-mood-${m.id}`}
                    className={`flex items-start gap-3 p-2.5 rounded-2xl text-left border transition-all text-xs ${
                      isSelected
                        ? "bg-zinc-800/40 border-emerald-500/50 text-white"
                        : "bg-black/20 border-white/10 text-zinc-450 hover:border-white/20 hover:bg-black/40"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "bg-emerald-500/15 text-emerald-400" : "bg-white/5 text-zinc-500"}`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <header className="font-bold">{m.label}</header>
                      <p className="text-[10px] text-zinc-400 leading-snug mt-0.5">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Setting 3: Live Focus Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase block">Custom Focus Tag</label>
            <input
              type="text"
              value={settings.focusTagline}
              onChange={(e) => onChange({ ...settings, focusTagline: e.target.value })}
              placeholder="e.g. Building Next.js Apps..."
              className="w-full bg-black/40 border border-white/10 text-xs text-zinc-250 placeholder-zinc-700 px-3 py-2 rounded-2xl focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 mt-5 flex items-center justify-between text-[10px] text-zinc-500">
        <span>Framework: React 19</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> HMR: Active emulation
        </span>
      </div>
    </div>
  );
}
