import http from "http";
import express from "express";
import { Server as IOServer } from "socket.io";
import type { ResourcesMap, ResourceKey, LogEntry } from "../client/src/types.js";

const app = express();
const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: "*" } });

const resources: ResourcesMap = {
  OXYGEN: { value: 85, criticalThreshold: 20, isResupplying: false, depletionRate: 0.8 },
  WATER: { value: 65, criticalThreshold: 25, isResupplying: false, depletionRate: 0.5 },
  FOOD: { value: 42, criticalThreshold: 20, isResupplying: false, depletionRate: 0.2 },
  PARTS: { value: 90, criticalThreshold: 15, isResupplying: false, depletionRate: 0.1 },
};

let logIdCounter = 0;
const generateLogId = () => {
  logIdCounter += 1;
  return `${Date.now()}-${logIdCounter}`;
};

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);
  socket.emit("resource_update", resources);

  socket.on("resupply_request", ({ type }: { type: ResourceKey }) => {
    const r = resources[type];
    console.log("resupply request from client:", r);
    if (!r || r.isResupplying) return;

    r.isResupplying = true;
    io.emit("resource_update", resources);

    const log1: LogEntry = {
      id: generateLogId(),
      timestamp: new Date().toLocaleTimeString(),
      message: `Resupply requested for ${type}`,
      type: "INFO",
    };
    io.emit("log_update", log1);

    setTimeout(() => {
      r.value = 100;
      r.isResupplying = false;
      io.emit("resource_update", resources);
      
      const log2: LogEntry = {
        id: generateLogId(),
        timestamp: new Date().toLocaleTimeString(),
        message: `${type} restored to 100%`,
        type: "SUCCESS",
      };
      io.emit("log_update", log2);
    }, 3000);
  });

  socket.on("disconnect", () => console.log("client disconnected:", socket.id));
});

const TICK = 1000;
setInterval(() => {
  let changed = false;
  
  for (const k of Object.keys(resources) as ResourceKey[]) {
    const r = resources[k];
    if (!r.isResupplying && r.value > 0) {
      r.value = Math.max(0, r.value - r.depletionRate - Math.random() * 0.5);
      changed = true;
      
      if (r.value < r.criticalThreshold && Math.random() > 0.9) {
        const alertLog: LogEntry = {
          id: generateLogId(),
          timestamp: new Date().toLocaleTimeString(),
          message: `CRITICAL ALERT: ${k} ${Math.round(r.value)}%`,
          type: "ALERT",
        };
        io.emit("log_update", alertLog);
      }
    }
  }
  
  if (changed) io.emit("resource_update", resources);
}, TICK);

const PORT = 4000;
server.listen(PORT)
  .on("listening", () => console.log("Socket server listening on", PORT))
  .on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is in use, trying ${PORT + 1}...`);
      server.listen(PORT + 1, () => console.log("Socket server listening on", PORT + 1));
    } else {
      throw err;
    }
  });
