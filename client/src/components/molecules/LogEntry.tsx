import type { LogType } from "../../types";

interface LogEntryProps {
  timestamp: string;
  message: string;
  type: LogType;
}

const LogEntry = ({ timestamp, message, type }: LogEntryProps) => {
  const colorClass =
    type === "ALERT"
      ? "text-red-400 border-l-2 border-red-500 bg-red-900/10"
      : type === "SUCCESS"
      ? "text-green-400 border-l-2 border-green-500 bg-green-900/10"
      : "text-cyan-200/70 border-l-2 border-cyan-900/50";

  return (
    <div className={`text-xs font-mono py-2 px-3 mb-2 rounded-r flex gap-3 ${colorClass}`}>
      <span className="opacity-50">[{timestamp}]</span>
      <span>{message}</span>
    </div>
  );
};

export default LogEntry;
