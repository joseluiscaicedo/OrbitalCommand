import { AlertTriangle } from "lucide-react";
import GlassPanel from "../atoms/GlassPanel";
import NeonText from "../atoms/NeonText";
import CyberButton from "../atoms/CyberButton";

export interface CyberButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <GlassPanel className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-24 h-24 text-red-500 animate-pulse" />
          </div>

          <NeonText className="text-6xl md:text-8xl font-bold">
            404
          </NeonText>

          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400">
            SIGNAL LOST
          </h2>

          <p className="text-gray-300 text-lg max-w-md mx-auto">
            La estación espacial que buscas no se encuentra en este sector del espacio.
          </p>
        </div>

        <div className="pt-6">
          <CyberButton onClick={handleGoHome} label="REGRESAR A LA BASE" />
        </div>

        <div className="text-sm text-gray-500 font-mono">
          ERROR CODE: SECTOR_NOT_FOUND_404
        </div>
      </GlassPanel>
    </div>
  );
}
