import GlassPanel from "../atoms/GlassPanel";
import type { LucideIcon } from "lucide-react";

interface InfoModuleProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

const InfoModule = ({ icon: Icon, title, description, iconColor = "blue" }: InfoModuleProps) => {
  const bgColor = iconColor === "purple" ? "bg-purple-500/10" : "bg-blue-500/10";
  const textColor = iconColor === "purple" ? "text-purple-400" : "text-blue-400";

  return (
    <GlassPanel className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 ${bgColor} rounded-full`}>
          <Icon className={`w-6 h-6 ${textColor}`} />
        </div>
        <div>
          <h3 className="font-orbitron text-lg text-white">{title}</h3>
          <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
      </div>
    </GlassPanel>
  );
};

export default InfoModule;