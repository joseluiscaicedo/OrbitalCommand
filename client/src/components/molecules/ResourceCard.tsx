import NeonText from "../atoms/NeonText";
import GlassPanel from "../atoms/GlassPanel";
import ProgressBar from "../atoms/ProgressBar";
import CyberButton from "../atoms/CyberButton";
import { Wind, Droplets, Utensils, Wrench, Atom, Send } from "lucide-react";
import type { ResourceState, ResourceKey } from "../../types";

interface ResourceCardProps {
  type: ResourceKey;
  data: ResourceState;
  onResupply: (type: ResourceKey) => void;
}

const ResourceCard = ({ type, data, onResupply }: ResourceCardProps) => {
  const isCritical = data.value <= data.criticalThreshold;
  const getIcon = () => {
    switch (type) {
      case "OXYGEN":
        return <Wind className={isCritical ? "text-red-500 animate-pulse" : "text-cyan-400"} />;
      case "WATER":
        return <Droplets className="text-blue-400" />;
      case "FOOD":
        return <Utensils className="text-green-400" />;
      case "PARTS":
        return <Wrench className="text-orange-400" />;
      default:
        return <Atom />;
    }
  };

  return (
    <GlassPanel
      className={`p-4 flex flex-col gap-4 ${isCritical ? "border-red-500/50 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]" : ""}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3 md:flex-wrap">
          {getIcon()}
          <div>
            <h3 className="text-xs text-slate-400 tracking-widest font-bold">MODULE</h3>
            <NeonText color={isCritical ? "red" : "cyan"} size="text-lg">
              {type}
            </NeonText>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400 font-mono">LEVEL</div>
          <div className={`text-xl font-mono ${isCritical ? "text-red-500" : "text-white"}`}>
            {Math.round(data.value)}%
          </div>
        </div>
      </div>

      <ProgressBar value={data.value} max={100} color={isCritical ? "red" : "cyan"} />

      <div className="mt-auto pt-2">
        <CyberButton
          label={data.isResupplying ? "DOCKING..." : "INITIATE RESUPPLY"}
          icon={Send}
          onClick={() => onResupply(type)}
          disabled={data.isResupplying || data.value > 90}
          loading={data.isResupplying}
        />
      </div>
    </GlassPanel>
  );
};

export default ResourceCard;
