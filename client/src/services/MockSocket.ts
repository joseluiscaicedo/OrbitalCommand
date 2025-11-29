import type { ResourcesMap, LogEntry, ResourceKey } from "../types";

type EventHandler = (payload: unknown) => void;

export default class MockSocket {
  private interval?: number;
  private listeners: Record<string, EventHandler> = {};

  public resources: ResourcesMap = {
    OXYGEN: { value: 85, criticalThreshold: 20, isResupplying: false, depletionRate: 0.8 },
    WATER: { value: 65, criticalThreshold: 25, isResupplying: false, depletionRate: 0.5 },
    FOOD: { value: 42, criticalThreshold: 20, isResupplying: false, depletionRate: 0.2 },
    PARTS: { value: 90, criticalThreshold: 15, isResupplying: false, depletionRate: 0.1 },
  };

  connect() {
    this.interval = setInterval(() => this.serverTick(), 1000);
    this.trigger("connect", {});
  }

  disconnect() {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    this.trigger("disconnect", {});
  }

  on(event: string, cb: EventHandler) {
    this.listeners[event] = cb;
  }

  emit(event: string, payload: unknown) {
    if (event === "resupply_request") {
      const { type } = payload as { type: ResourceKey };
      const res = this.resources[type];
      if (!res || res.isResupplying) return;

      res.isResupplying = true;
      this.broadcastState();

      this.trigger("log_update", {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date().toLocaleTimeString(),
        message: `Resupply pod requested for ${type} Sector.`,
        type: "INFO",
      } as LogEntry);

      setTimeout(() => {
        res.value = 100;
        res.isResupplying = false;
        this.broadcastState();
        this.trigger("log_update", {
          id: `${Date.now()}-${Math.random()}`,
          timestamp: new Date().toLocaleTimeString(),
          message: `${type} levels restored to 100%.`,
          type: "SUCCESS",
        } as LogEntry);
      }, 3000);
    }
  }

  private serverTick() {
    let updated = false;
    for (const k of Object.keys(this.resources) as ResourceKey[]) {
      const r = this.resources[k];
      if (!r.isResupplying && r.value > 0) {
        const drain = r.depletionRate + Math.random() * 0.5;
        r.value = Math.max(0, r.value - drain);
        updated = true;
        if (r.value < r.criticalThreshold && Math.random() > 0.9) {
          this.trigger("log_update", {
            id: `${Date.now()}-${Math.random()}`,
            timestamp: new Date().toLocaleTimeString(),
            message: `CRITICAL ALERT: ${k} at ${Math.round(r.value)}%`,
            type: "ALERT",
          } as LogEntry);
        }
      }
    }
    if (updated) this.broadcastState();
  }

  private broadcastState() {
    this.trigger("resource_update", { ...this.resources });
  }

  private trigger(event: string, data: unknown) {
    const cb = this.listeners[event];
    if (cb) cb(data);
  }
}
