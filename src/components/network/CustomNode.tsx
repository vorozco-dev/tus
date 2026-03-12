"use client";

import { Handle, Position } from "reactflow";
import { cn } from "@/lib/utils";
import { Server, RadioTower, Router } from "lucide-react";

const iconMap = {
  core: Router,
  aggregation: Server,
  access: RadioTower,
};

export function CustomNode({ data, selected }: any) {
  const Icon = iconMap[data.type as keyof typeof iconMap] || Server;

  return (
    <div
      className={cn(
        "px-4 py-2 shadow-md rounded-md bg-panel border-2 min-w-[150px]",
        selected ? "border-accentBlue shadow-accentBlue/20" : "border-border",
        data.status === "critical" && "border-danger shadow-danger/20 animate-pulse",
        data.status === "warning" && "border-warning shadow-warning/20"
      )}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-textSecondary" />
      <div className="flex items-center">
        <div
          className={cn(
            "rounded-full w-8 h-8 flex items-center justify-center mr-2",
            data.status === "critical" ? "bg-danger/20 text-danger" :
            data.status === "warning" ? "bg-warning/20 text-warning" :
            "bg-accentBlue/20 text-accentBlue"
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-bold text-textPrimary">{data.label}</div>
          <div className="text-xs text-textSecondary">{data.sublabel}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-textSecondary" />
    </div>
  );
}