import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

const GlassPanel = ({ children, className = "", active = false }: GlassPanelProps) => (
  <div
    className={`
      relative overflow-hidden rounded-xl border transition-all duration-300
      ${active
        ? "bg-blue-900/40 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        : "bg-slate-900/60 border-blue-500/20 hover:border-blue-400/40"}
      backdrop-blur-md ${className}
    `}
  >
    <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
    {children}
  </div>
);

export default GlassPanel;
