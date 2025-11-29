import React from "react";
import { Atom, Cpu } from "lucide-react";

const Header: React.FC<{ connectionStatus: string }> = ({ connectionStatus }) => (
  <header className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6 gap-4">
    <div className="flex items-center gap-4">
      <div className="relative">
        <Atom className="w-12 h-12 text-cyan-400 animate-spin-slow" />
        <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-40 animate-pulse" />
      </div>
      <div>
        <h1 className="text-xl md:text-4xl font-black text-white tracking-widest uppercase font-orbitron">
          Orbital<span className="text-cyan-400">Command</span>
        </h1>
        <p className="text-cyan-400/60 text-xs tracking-[0.3em] uppercase">Tactical Logistics Interface v4.2</p>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="flex flex-col items-end">
        <span className="text-[10px] text-slate-400">System Status</span>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${connectionStatus === "CONNECTED" ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
          <span className={`font-mono text-sm ${connectionStatus === "CONNECTED" ? "text-green-400" : "text-red-400"}`}>{connectionStatus}</span>
        </div>
      </div>

      <Cpu className="text-slate-500 w-6 h-6 hidden md:block" />
    </div>
  </header>
);

export default Header;
