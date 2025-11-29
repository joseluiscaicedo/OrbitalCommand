import React from "react";

interface Props { value: number; max?: number; color?: "cyan" | "red"; }

const ProgressBar: React.FC<Props> = ({ value, max = 100, color = "cyan" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const bg = color === "red" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" : "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]";
  return (
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
      <div className={`h-full transition-all duration-500 ease-out ${bg}`} style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;
