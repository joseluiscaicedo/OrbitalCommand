import type { ReactNode } from "react";

type NeonColor = "cyan" | "red";

interface NeonTextProps {
  children: ReactNode;
  color?: NeonColor;
  className?: string;
  size?: string;
}

const NeonText = ({
  children,
  color = "cyan",
  className = "",
  size = "text-base",
}: NeonTextProps) => {
  const glow =
    color === "cyan"
      ? "drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
      : "drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]";

  const textColor = color === "cyan" ? "text-cyan-400" : "text-red-500";

  return (
    <span className={`${size} ${textColor} ${glow} font-orbitron tracking-wider ${className}`}>
      {children}
    </span>
  );
};

export default NeonText;
