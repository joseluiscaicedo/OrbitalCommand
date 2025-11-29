import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Header from "../organisms/Header";
import ControlGrid from "../organisms/ControlGrid";
import ServerLog from "../organisms/ServerLog";
import InfoModule from "../molecules/InfoModule";
import { Activity, Radio, ShieldCheck } from "lucide-react";
import type { ResourcesMap, LogEntry, ResourceKey } from "../../types";
import { io, Socket } from "socket.io-client";
import SpaceBackdrop from "../atoms/SpaceBackdrop";
import "../../App.css";

const Dashboard = () => {
  const [connectionStatus, setConnectionStatus] = useState<"CONNECTING" | "CONNECTED" | "OFFLINE">("CONNECTING");
  const [resources, setResources] = useState<ResourcesMap | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const logIdCounter = useRef(0);

  const generateLogId = () => {
    logIdCounter.current += 1;
    return `${Date.now()}-${logIdCounter.current}`;
  };

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    socketRef.current = newSocket;

    newSocket.on("connect", () => {
      setConnectionStatus("CONNECTED");
      setLogs((p) => [
        ...p,
        {
          id: generateLogId(),
          timestamp: new Date().toLocaleTimeString(),
          message: "Secure Uplink Established.",
          type: "SUCCESS",
        },
      ]);
    });

    newSocket.on("disconnect", () => {
      setConnectionStatus("OFFLINE");
      setLogs((p) => [
        ...p,
        {
          id: generateLogId(),
          timestamp: new Date().toLocaleTimeString(),
          message: "Connection lost. Attempting to reconnect...",
          type: "ALERT",
        },
      ]);
    });

    newSocket.on("connect_error", () => {
      setConnectionStatus("OFFLINE");
      setLogs((p) => [
        ...p,
        {
          id: generateLogId(),
          timestamp: new Date().toLocaleTimeString(),
          message: "ERROR: Unable to establish connection to server.",
          type: "ALERT",
        },
      ]);
    });

    newSocket.on("resource_update", (data: ResourcesMap) => setResources({ ...data }));
    newSocket.on("log_update", (log: LogEntry) => setLogs((p) => [...p.slice(-49), log]));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleResupply = useCallback((type: ResourceKey) => {
    socketRef.current?.emit("resupply_request", { type });
  }, []);

  const stars = useMemo(
    () => [
      { className: "w-2 h-2 bg-white rounded-full animate-pulse blur-[1px]", style: { top: "25%", left: "25%" } },
      { className: "w-1 h-1 bg-cyan-400 rounded-full animate-pulse", style: { top: "33%", left: "66%", animationDelay: "700ms" } },
      { className: "w-1 h-1 bg-purple-400 rounded-full animate-pulse", style: { top: "75%", left: "16%", animationDelay: "150ms" } },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      <SpaceBackdrop stars={stars} />
      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto text-slate-200">
        <Header connectionStatus={connectionStatus} />
        <main className="space-y-8">
          {/* Top Section: Hero / Status */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="text-cyan-400" />
                  <h2 className="text-xl font-orbitron tracking-widest text-white">CARGO CONTROL CONSOLE</h2>
                </div>
                <div className="text-xs font-mono text-cyan-400/50 border border-cyan-400/20 px-2 py-1 rounded">SECTOR: ALPHA-9</div>
              </div>

              <p className="text-slate-400 max-w-2xl text-sm mb-6 leading-relaxed">
                A cutting-edge UI for base operators to view resources (oxygen, water, spare parts, food), monitor critical stock, and trigger urgent resupply requests with one click.
              </p>

              {resources && <ControlGrid resources={resources} onResupply={handleResupply} />}
            </div>

            {/* Side Panel: Logs */}
            <div className="h-full min-h-[400px]">
              <ServerLog logs={logs} />
            </div>
          </section>

          {/* Bottom Section: Info Modules */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/5">
            <InfoModule
              icon={Radio}
              title="Live Orbital Monitoring"
              description="Real-time WebSocket telemetry. Updates are pushed instantly from the Infrastructure Server. Values degrade over time to simulate consumption."
            />
            <InfoModule
              icon={ShieldCheck}
              title="Secure Uplink"
              description="End-to-end encrypted connection to Earth Control Center. All resupply requests are logged for audit compliance."
              iconColor="purple"
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
