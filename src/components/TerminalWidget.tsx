import React, { useState, useRef, useEffect } from "react";
import { Terminal, Copy, Check } from "lucide-react";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function TerminalWidget() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "neofetch",
      output: (
        <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs text-zinc-300 mt-1">
          <div className="text-emerald-500 font-bold leading-tight select-none">
            {`   _ __  _ __  _ __ 
  | '_ \\| '__| '_ \\ 
  | |_) | |  | |_) |
  | .__/|_|  |_.__/ 
  |_|               `}
          </div>
          <div>
            <p className="text-emerald-400 font-bold">prashant@dahal-OS</p>
            <p className="text-zinc-500">------------------</p>
            <p><span className="text-emerald-400">OS:</span> DahalCore v2.6.22-hybrid</p>
            <p><span className="text-emerald-400">Host:</span> Innovative-Mind-v2</p>
            <p><span className="text-emerald-400">Shell:</span> custom-react-bash</p>
            <p><span className="text-emerald-400">Focus:</span> High Performance Apps & Clean Architecture</p>
            <p><span className="text-emerald-400">Status:</span> Open to innovative opportunites</p>
            <p className="mt-2 text-zinc-400 font-sans italic">Type 'help' to see other commands.</p>
          </div>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandHandler = (cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    let out: string | React.ReactNode = "";

    if (!cmd) return;

    switch (cmd) {
      case "help":
        out = (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-zinc-400 font-bold">Available Commands:</p>
            <p className="text-zinc-300"><span className="text-emerald-400">about</span>     - Who is Prashant Dahal?</p>
            <p className="text-zinc-300"><span className="text-emerald-400">skills</span>    - List technologies and arsenals</p>
            <p className="text-zinc-300"><span className="text-emerald-400">projects</span>  - Displays active developer projects</p>
            <p className="text-zinc-300"><span className="text-emerald-400">contact</span>   - Prints methods to connect</p>
            <p className="text-zinc-300"><span className="text-emerald-400">neofetch</span>  - Show system spec configuration</p>
            <p className="text-zinc-300"><span className="text-emerald-400">clear</span>     - Wipe current terminal cache</p>
          </div>
        );
        break;
      case "about":
        out = (
          <p className="font-mono text-xs text-zinc-300 leading-relaxed">
            Prashant Dahal is a passionate tech innovator, full stack engineer, and system architect.
            He believes in turning sophisticated backend challenges and gorgeous user experiences into 
            reusable, resilient, and highly high-performance code. Focused on Next.js, Typescript, 
            Cloud infrastructures, & intelligence engineering.
          </p>
        );
        break;
      case "skills":
        out = (
          <div className="font-mono text-xs text-zinc-300 space-y-1">
            <p className="text-emerald-400 font-bold">Main Technical Matrix:</p>
            <p>• Languages: TypeScript, JavaScript, Python, Bash</p>
            <p>• Frameworks: React, Next.js, Express, FastAPI, Tailwind CSS</p>
            <p>• Databases & Cache: PostgreSQL, Firestore, Redis</p>
            <p>• Infrastructure: Docker, Git, RESTful Assemblies, Node.js</p>
          </div>
        );
        break;
      case "projects":
        out = (
          <div className="font-mono text-xs text-zinc-300 space-y-2">
            <div>
              <p className="text-emerald-400 font-bold">★ Nexus AI [Automated Intel Engine]</p>
              <p>  Next-generation workflow automator built upon React & Tailwind flows.</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold">★ HyperSpace [Cloud Edge Compiler]</p>
              <p>  Edge performance coordinator managing cloud compute triggers with 99.9% uptime.</p>
            </div>
          </div>
        );
        break;
      case "contact":
        out = (
          <div className="font-mono text-xs text-zinc-300 space-y-1">
            <p>• Email: pc.prasantdahal450@gmail.com</p>
            <p>• GitHub: github.com/PrashantDahal (Mock)</p>
            <p>• LinkedIn: linkedin.com/in/prashant-dahal (Mock)</p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        out = `bash: command not found: "${cmdRaw}". Direct query input. Try typing "help" for a list of available systems.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmdRaw, output: out }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commandHandler(input);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div 
      className="bg-[#121214] rounded-3xl border border-white/10 p-5 font-mono flex flex-col h-full min-h-[300px] max-h-[400px] cursor-text hover:border-white/20 hover:scale-[1.01] transition-all duration-300"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 select-none">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-emerald-400" />
          <span className="text-[11px] text-zinc-500 font-bold tracking-wider uppercase">Interactive Terminal</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/20"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-500/20"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 border border-emerald-500/20"></span>
        </div>
      </div>

      {/* Output Console area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-3 pr-1 text-left scrollbar-thin scrollbar-thumb-white/5"
      >
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-start text-xs">
              <span className="text-zinc-500 mr-1.5">~</span>
              <span className="text-emerald-400 mr-2">$</span>
              <span className="text-zinc-100 font-bold">{item.command}</span>
            </div>
            <div className="pl-5 text-zinc-300">
              {item.output}
            </div>
          </div>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center text-xs mt-3 border-t border-white/10 pt-2 select-none">
        <span className="text-zinc-500 mr-1.5">~</span>
        <span className="text-emerald-400 mr-2 font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' and press Enter..."
          className="flex-1 bg-transparent border-0 outline-none p-0 text-zinc-100 placeholder-zinc-600 focus:ring-0 focus:outline-none focus:border-0 font-mono text-xs"
        />
        <span className="w-1.5 h-4 bg-emerald-400 animate-pulse ml-1 shrink-0"></span>
      </div>
    </div>
  );
}
