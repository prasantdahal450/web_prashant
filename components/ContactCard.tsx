import React, { useState, useEffect } from "react";
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, MessageSquare, Trash2 } from "lucide-react";

interface SavedMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function ContactCard() {
  const [copied, setCopied] = useState(false);
  const emailVal = "pc.prasantdahal450@gmail.com";

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  // Local state for transmitted signals
  const [sentSignals, setSentSignals] = useState<SavedMessage[]>([]);

  useEffect(() => {
    // Load sent messages from localStorage
    const saved = localStorage.getItem("prashant_portfolio_messages");
    if (saved) {
      try {
        setSentSignals(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("sending");

    setTimeout(() => {
      const newMessage: SavedMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        message,
        date: new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
      };

      const updatedSignals = [newMessage, ...sentSignals];
      setSentSignals(updatedSignals);
      localStorage.setItem("prashant_portfolio_messages", JSON.stringify(updatedSignals));

      setName("");
      setEmail("");
      setMessage("");
      setStatus("sent");

      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  const deleteSignal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sentSignals.filter((sig) => sig.id !== id);
    setSentSignals(updated);
    localStorage.setItem("prashant_portfolio_messages", JSON.stringify(updated));
  };

  return (
    <div className="space-y-4">
      {/* Dynamic contact details / Copy block */}
      <div className="bg-[#121214] border border-white/10 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-white/20 hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
            <Mail size={18} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Primary Channel</p>
            <p className="text-sm font-bold text-zinc-100 mt-1.5 break-all">{emailVal}</p>
          </div>
        </div>
        <button
          onClick={handleCopyEmail}
          id="btn-copy-email"
          className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 outline-none rounded-2xl bg-black border border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors shrink-0"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold font-sans">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy Email</span>
            </>
          )}
        </button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Form panel */}
        <div className="lg:col-span-3 bg-[#121214] border border-white/10 rounded-3xl p-5 hover:border-white/20 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={16} className="text-emerald-400" />
            <h4 className="font-sans font-bold text-sm tracking-tight text-white">Secure Contact Vector</h4>
          </div>

          <form onSubmit={transmitMessage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Your Persona</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-xs text-zinc-200 placeholder-zinc-750 px-3 py-2.5 rounded-2xl focus:border-emerald-500/50 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Email Node</label>
                <input
                  type="email"
                  required
                  placeholder="john@work.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-xs text-zinc-200 placeholder-zinc-755 px-3 py-2.5 rounded-2xl focus:border-emerald-500/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Message Payload</label>
              <textarea
                required
                rows={3}
                placeholder="Let's build a Next.js full-stack system together..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/40 border border-white/10 text-xs text-zinc-200 placeholder-zinc-760 px-3 py-2.5 rounded-2xl focus:border-emerald-500/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-zinc-500 font-mono">
                {status === "idle" && "SSL Secured Channels Established"}
                {status === "sending" && "Encoding data streams..."}
                {status === "sent" && "Transmission completely successful."}
              </span>

              <button
                type="submit"
                id="btn-send-message"
                disabled={status !== "idle" || !name || !email || !message}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-30 disabled:hover:bg-emerald-500 disabled:cursor-not-allowed font-sans text-xs font-bold transition-all animate-pulse"
              >
                <Send size={12} />
                <span>{status === "sending" ? "Transmitting..." : status === "sent" ? "Dispatched!" : "Transmit Signal"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Local database logs / sent messages simulator */}
        <div className="lg:col-span-2 bg-[#121214] border border-white/10 rounded-3xl p-5 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <h4 className="font-sans font-bold text-sm tracking-tight text-white leading-none">Inbound Pipelines</h4>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">{sentSignals.length} Active Outbound</span>
            </div>

            <p className="text-[11px] text-zinc-500 leading-relaxed text-left">
              These are the mock messaging pipelines simulated directly inside your browser database (localStorage cache). Try writing one!
            </p>

            <div className="space-y-2 mt-2 h-44 overflow-y-auto scrollbar-none pr-1">
              {sentSignals.length === 0 ? (
                <div className="h-full border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-xs font-mono text-zinc-600">No outbound signals found.</p>
                  <p className="text-[10px] text-zinc-500 mt-1 font-sans">Submit the contact payload to inspect terminal events here.</p>
                </div>
              ) : (
                sentSignals.map((sig) => (
                  <div key={sig.id} className="bg-black/40 border border-white/10 rounded-2xl p-3 text-left relative group">
                    <button
                      onClick={(e) => deleteSignal(sig.id, e)}
                      id={`btn-delete-${sig.id}`}
                      className="absolute top-2 right-2 p-1 rounded-md text-zinc-600 hover:text-red-400 hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={12} />
                    </button>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-emerald-400 font-bold font-mono">{sig.name}</span>
                      <span className="text-[9px] text-zinc-600 font-mono">• {sig.date}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-normal mt-1 line-clamp-2">{sig.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex gap-2.5 justify-center border-t border-white/10 pt-4 mt-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-2xl bg-black border border-white/10 text-zinc-400 hover:text-white hover:border-emerald-500/30 transition-all text-xs"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-2xl bg-black border border-white/10 text-zinc-400 hover:text-white hover:border-emerald-500/30 transition-all text-xs"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-2xl bg-black border border-white/10 text-zinc-400 hover:text-white hover:border-emerald-500/30 transition-all text-xs"
            >
              <Twitter size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
