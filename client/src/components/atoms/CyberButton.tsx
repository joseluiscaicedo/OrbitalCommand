import { Activity } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

interface CyberButtonProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  icon?: ComponentType<LucideProps>;
  loading?: boolean;
}

const CyberButton = ({ onClick, label, disabled, icon: Icon, loading }: CyberButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`
      group relative px-4 py-2 w-full flex items-center justify-center gap-2
      font-orbitron text-sm font-bold tracking-widest uppercase transition-all duration-200
      border rounded
      ${
        disabled
          ? "bg-slate-800/50 border-slate-700 text-slate-500 cursor-not-allowed"
          : "bg-blue-900/20 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] active:scale-[0.98]"
      }
    `}
  >
    {loading ? <Activity className="w-4 h-4 animate-spin" /> : Icon && <Icon className="w-4 h-4" />}
    {label}
    {!disabled && (
      <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    )}
  </button>
);

export default CyberButton;
