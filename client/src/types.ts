export type ResourceKey = "OXYGEN" | "WATER" | "FOOD" | "PARTS";

export interface ResourceState {
  value: number;
  criticalThreshold: number;
  isResupplying: boolean;
  depletionRate: number;
}

export type ResourcesMap = Record<ResourceKey, ResourceState>;

export type LogType = "ALERT" | "SUCCESS" | "INFO";
export interface LogEntry {
  id: string | number;
  timestamp: string;
  message: string;
  type: LogType;
}
