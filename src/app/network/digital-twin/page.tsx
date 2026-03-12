"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "@/components/network/CustomNode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, AlertTriangle, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  { id: "core-1", type: "custom", position: { x: 400, y: 50 }, data: { label: "CORE-01", sublabel: "Bogotá", type: "core", status: "normal" } },
  { id: "core-2", type: "custom", position: { x: 800, y: 50 }, data: { label: "CORE-02", sublabel: "Medellín", type: "core", status: "normal" } },
  { id: "agg-1", type: "custom", position: { x: 200, y: 200 }, data: { label: "AGG-N1", sublabel: "Norte", type: "aggregation", status: "normal" } },
  { id: "agg-2", type: "custom", position: { x: 600, y: 200 }, data: { label: "AGG-C1", sublabel: "Centro", type: "aggregation", status: "normal" } },
  { id: "agg-3", type: "custom", position: { x: 1000, y: 200 }, data: { label: "AGG-S1", sublabel: "Sur", type: "aggregation", status: "normal" } },
  { id: "dist-1", type: "custom", position: { x: 100, y: 350 }, data: { label: "DIST-W1", sublabel: "Suba", type: "access", status: "normal" } },
  { id: "dist-2", type: "custom", position: { x: 300, y: 350 }, data: { label: "DIST-E1", sublabel: "Usaquén", type: "access", status: "normal" } },
  { id: "dist-3", type: "custom", position: { x: 500, y: 350 }, data: { label: "DIST-C1", sublabel: "Chapinero", type: "access", status: "normal" } },
  { id: "dist-4", type: "custom", position: { x: 700, y: 350 }, data: { label: "DIST-S1", sublabel: "Kennedy", type: "access", status: "normal" } },
];

const initialEdges = [
  { id: "e1-2", source: "core-1", target: "core-2", animated: true, style: { stroke: "#38bdf8", strokeWidth: 2 } },
  { id: "e1-3", source: "core-1", target: "agg-1", style: { stroke: "#94a3b8", strokeWidth: 2 } },
  { id: "e1-4", source: "core-1", target: "agg-2", style: { stroke: "#94a3b8", strokeWidth: 2 } },
  { id: "e2-4", source: "core-2", target: "agg-2", style: { stroke: "#94a3b8", strokeWidth: 2 } },
  { id: "e2-5", source: "core-2", target: "agg-3", style: { stroke: "#94a3b8", strokeWidth: 2 } },
  { id: "e3-6", source: "agg-1", target: "dist-1", style: { stroke: "#94a3b8", strokeWidth: 1 } },
  { id: "e3-7", source: "agg-1", target: "dist-2", style: { stroke: "#94a3b8", strokeWidth: 1 } },
  { id: "e4-8", source: "agg-2", target: "dist-3", style: { stroke: "#94a3b8", strokeWidth: 1 } },
  { id: "e4-9", source: "agg-2", target: "dist-4", style: { stroke: "#94a3b8", strokeWidth: 1 } },
];

export default function DigitalTwinPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [simulationState, setSimulationState] = useState<"idle" | "running" | "completed">("idle");
  const [scenario, setScenario] = useState<string>("fiber-cut");

  const runSimulation = () => {
    setSimulationState("running");
    
    // Reset first
    setNodes(initialNodes);
    setEdges(initialEdges);

    setTimeout(() => {
      if (scenario === "fiber-cut") {
        // Simulate Fiber Cut between AGG-N1 and DIST-C1 (which doesn't exist directly, let's cut AGG-N1 to DIST-W1)
        setEdges(eds => eds.map(e => {
          if (e.id === "e3-6") {
            return { ...e, style: { stroke: "#ef4444", strokeWidth: 3, strokeDasharray: "5,5" }, animated: false, label: "CUT" };
          }
          // Reroute traffic
          if (e.id === "e1-3" || e.id === "e3-7") {
            return { ...e, style: { stroke: "#f59e0b", strokeWidth: 3 }, animated: true };
          }
          return e;
        }));

        setNodes(nds => nds.map(n => {
          if (n.id === "dist-1") return { ...n, data: { ...n.data, status: "critical" } };
          if (n.id === "agg-1") return { ...n, data: { ...n.data, status: "warning" } };
          return n;
        }));
      } else if (scenario === "traffic-growth") {
        // Simulate Traffic Growth
        setEdges(eds => eds.map(e => {
          if (e.id === "e1-2" || e.id === "e1-4" || e.id === "e2-4") {
            return { ...e, style: { stroke: "#f59e0b", strokeWidth: 4 }, animated: true };
          }
          return e;
        }));
        setNodes(nds => nds.map(n => {
          if (n.id === "core-1" || n.id === "core-2" || n.id === "agg-2") return { ...n, data: { ...n.data, status: "warning" } };
          return n;
        }));
      }
      setSimulationState("completed");
    }, 1500);
  };

  const resetSimulation = () => {
    setSimulationState("idle");
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Digital Twin Simulation
        </h1>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-panelSoft border-border text-textSecondary">
            <Activity className="w-3 h-3 mr-1" />
            Simulation Mode
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <Card className="w-80 bg-panel border-border shrink-0 overflow-y-auto flex flex-col">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg font-bold text-textPrimary flex items-center gap-2">
              <Zap className="w-5 h-5 text-accentBlue" />
              Scenario Control
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-6 flex-1 flex flex-col">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-textSecondary">Select Scenario</label>
                <Select value={scenario} onValueChange={setScenario} disabled={simulationState === "running"}>
                  <SelectTrigger className="w-full bg-panelSoft border-border text-textPrimary">
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent className="bg-panel border-border text-textPrimary">
                    <SelectItem value="fiber-cut">Fiber Cut (AGG-N1 ↔ DIST-W1)</SelectItem>
                    <SelectItem value="traffic-growth">Traffic Growth (+50% Core)</SelectItem>
                    <SelectItem value="node-failure">Node Failure (CORE-02)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-accentBlue text-background hover:bg-accentBlue/90"
                  onClick={runSimulation}
                  disabled={simulationState === "running"}
                >
                  {simulationState === "running" ? (
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 animate-spin" /> Running...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Play className="w-4 h-4" /> Run Simulation
                    </span>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-panel border-border text-textPrimary hover:bg-panelSoft"
                  onClick={resetSimulation}
                  disabled={simulationState === "running"}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {simulationState === "completed" && (
              <div className="mt-6 space-y-4 animate-in slide-in-from-bottom-4 duration-300 flex-1">
                <h4 className="text-sm font-bold text-textPrimary border-b border-border pb-2">Simulation Results</h4>
                
                {scenario === "fiber-cut" && (
                  <div className="space-y-3">
                    <div className="p-3 bg-danger/10 border border-danger/20 rounded-md">
                      <div className="flex items-center gap-2 text-danger font-bold text-sm mb-1">
                        <AlertTriangle className="w-4 h-4" /> Critical Impact
                      </div>
                      <p className="text-xs text-textSecondary">
                        DIST-W1 isolated. 450 services affected.
                      </p>
                    </div>
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
                      <div className="flex items-center gap-2 text-warning font-bold text-sm mb-1">
                        <Activity className="w-4 h-4" /> Rerouting Active
                      </div>
                      <p className="text-xs text-textSecondary">
                        Traffic from DIST-E1 rerouted via AGG-N1 → CORE-01. Link utilization at 85%.
                      </p>
                    </div>
                  </div>
                )}

                {scenario === "traffic-growth" && (
                  <div className="space-y-3">
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
                      <div className="flex items-center gap-2 text-warning font-bold text-sm mb-1">
                        <AlertTriangle className="w-4 h-4" /> Capacity Warning
                      </div>
                      <p className="text-xs text-textSecondary">
                        Core links exceeding 80% utilization threshold.
                      </p>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-textSecondary">CORE-01 ↔ CORE-02</span>
                        <span className="text-warning font-bold">88%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-textSecondary">CORE-01 ↔ AGG-C1</span>
                        <span className="text-warning font-bold">82%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="flex-1 bg-panel border-border overflow-hidden relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            className="bg-[#0f172a]"
          >
            <Background color="#334155" gap={16} />
            <Controls className="bg-panel border-border fill-textPrimary" />
            <MiniMap
              nodeColor={(node) => {
                switch (node.data?.status) {
                  case 'critical': return '#ef4444';
                  case 'warning': return '#f59e0b';
                  default: return '#38bdf8';
                }
              }}
              maskColor="rgba(15, 23, 42, 0.8)"
              className="bg-panel border-border"
            />
          </ReactFlow>
        </Card>
      </div>
    </div>
  );
}