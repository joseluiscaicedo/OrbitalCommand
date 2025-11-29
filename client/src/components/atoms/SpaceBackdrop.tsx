// src/components/atoms/SpaceBackdrop.tsx
import type { CSSProperties } from "react";

interface StarSpec {
  className: string;
  style: CSSProperties;
}

const SpaceBackdrop = ({ stars = [] }: { stars?: StarSpec[] }) => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black" />
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    {stars.map((s, i) => (
      <div key={i} className={`absolute ${s.className}`} style={s.style} />
    ))}
  </div>
);

export default SpaceBackdrop;