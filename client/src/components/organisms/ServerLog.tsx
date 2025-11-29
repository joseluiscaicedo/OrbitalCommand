import { useEffect, useRef } from "react";
import GlassPanel from "../atoms/GlassPanel";
import LogEntry from "../molecules/LogEntry";
import { Server } from "lucide-react";
import type { LogEntry as LogEntryType } from "../../types";

interface ServerLogProps {
  logs: LogEntryType[];
}

const ServerLog = ({ logs }: ServerLogProps) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <GlassPanel className="h-full flex flex-col">
      <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-widest uppercase">
            Infrastructure Server Log
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[10px] text-cyan-400/70 font-mono">LIVE FEED</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar min-h-[200px] max-h-[300px] font-mono text-sm">
        {logs.length === 0 && (
          <div className="text-slate-600 text-center py-10 italic">
            Waiting for server uplink...
          </div>
        )}
        {logs.map((log) => (
          <LogEntry key={log.id} {...log} />
        ))}
        <div ref={logEndRef} />
      </div>
    </GlassPanel>
  );
};

export default ServerLog;
