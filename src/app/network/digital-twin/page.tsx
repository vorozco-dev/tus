"use client";

import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  EdgeProps,
  getBezierPath,
  BaseEdge,
  NodeProps,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, AlertTriangle, Activity, Zap, Server, Router, Network, ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

// --- Custom Node Component ---
const CustomNode = ({ data }: NodeProps) => {
  const isCritical = data.status === "critical";
  const isWarning = data.status === "warning";

  return (
    <div className="relative group">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <motion.div
        className={cn(
          "px-4 py-2 shadow-lg rounded-md border-2 bg-panel flex flex-col items-center justify-center min-w-[120px] transition-colors duration-300",
          isCritical ? "border-danger shadow-danger/50" : 
          isWarning ? "border-warning shadow-warning/50" : 
          "border-accentBlue/50 shadow-accentBlue/20"
        )}
        animate={
          isCritical ? { boxShadow: ["0px 0px 10px #ef4444", "0px 0px 25px #ef4444", "0px 0px 10px #ef4444"] } :
          isWarning ? { boxShadow: ["0px 0px 10px #f59e0b", "0px 0px 20px #f59e0b", "0px 0px 10px #f59e0b"] } :
          {}
        }
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex items-center gap-2 mb-1">
          {data.type === "core" && <Server className={cn("w-4 h-4", isCritical ? "text-danger" : isWarning ? "text-warning" : "text-accentBlue")} />}
          {data.type === "aggregation" && <Router className={cn("w-4 h-4", isCritical ? "text-danger" : isWarning ? "text-warning" : "text-accentCyan")} />}
          {data.type === "access" && <Network className={cn("w-4 h-4", isCritical ? "text-danger" : isWarning ? "text-warning" : "text-textSecondary")} />}
          <span className="font-bold text-xs text-textPrimary">{data.label}</span>
        </div>
        <span className="text-[10px] text-textSecondary">{data.sublabel}</span>
        {data.traffic && (
          <span className="text-[10px] font-mono text-accentCyan mt-1">{data.traffic}</span>
        )}
      </motion.div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-panel border border-border rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="text-xs font-bold text-textPrimary mb-1">{data.label}</div>
        <div className="text-[10px] text-textSecondary mb-2">{data.sublabel} · {data.type === 'core' ? 'Core Router' : data.type === 'aggregation' ? 'Aggregation' : 'Distribution'}</div>
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-textSecondary">Traffic:</span>
          <span className="text-accentCyan font-mono">{data.traffic || 'N/A'}</span>
        </div>
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-textSecondary">Interfaces:</span>
          <span className="text-textPrimary">4/4 Up</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-textSecondary">Status:</span>
          <span className={cn("font-bold", isCritical ? "text-danger" : isWarning ? "text-warning" : "text-success")}>
            {isCritical ? "DOWN" : isWarning ? "DEGRADED" : "OK"}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Custom Animated Edge Component ---
const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isFailed = data?.status === "failed";
  const isRerouted = data?.status === "rerouted";

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{
          ...style,
          stroke: isFailed ? "#ef4444" : isRerouted ? "#38bdf8" : style.stroke || "#334155",
          strokeWidth: isFailed || isRerouted ? 3 : 2,
          strokeDasharray: isFailed ? "5,5" : "none",
        }} 
      />
      
      {/* Glowing Particles for Traffic */}
      {!isFailed && (
        <circle r="4" fill={isRerouted ? "#38bdf8" : "#22d3ee"} className="filter drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
          <animateMotion dur={isRerouted ? "1.5s" : "3s"} repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
      {!isFailed && (
        <circle r="3" fill={isRerouted ? "#38bdf8" : "#22d3ee"} className="filter drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
          <animateMotion dur={isRerouted ? "1.5s" : "3s"} begin="1s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
      {!isFailed && (
        <circle r="2" fill={isRerouted ? "#38bdf8" : "#22d3ee"} className="filter drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
          <animateMotion dur={isRerouted ? "1.5s" : "3s"} begin="2s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}

      {/* Failure Pulse Animation */}
      {isFailed && (
        <motion.path
          d={edgePath}
          fill="none"
          stroke="#ef4444"
          strokeWidth="6"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
};

// --- Mock Data (Mexico Locations) ---
const initialNodes = [
  { id: "core-mex", type: "custom", position: { x: 400, y: 50 }, data: { label: "CORE-MEX", sublabel: "Mexico City", type: "core", status: "normal", traffic: "42.1T" } },
  { id: "core-gdl", type: "custom", position: { x: 800, y: 50 }, data: { label: "CORE-GDL", sublabel: "Guadalajara", type: "core", status: "normal", traffic: "38.5T" } },
  { id: "core-mty", type: "custom", position: { x: 1200, y: 50 }, data: { label: "CORE-MTY", sublabel: "Monterrey", type: "core", status: "normal", traffic: "35.2T" } },
  
  { id: "agg-centro", type: "custom", position: { x: 200, y: 200 }, data: { label: "AGG-CENTRO", sublabel: "Mexico City", type: "aggregation", status: "normal", traffic: "18.4T" } },
  { id: "agg-occidente", type: "custom", position: { x: 600, y: 200 }, data: { label: "AGG-OCCIDENTE", sublabel: "Guadalajara", type: "aggregation", status: "normal", traffic: "15.2T" } },
  { id: "agg-norte", type: "custom", position: { x: 1000, y: 200 }, data: { label: "AGG-NORTE", sublabel: "Monterrey", type: "aggregation", status: "normal", traffic: "16.8T" } },
  
  { id: "dist-pue", type: "custom", position: { x: 100, y: 350 }, data: { label: "DIST-PUE", sublabel: "Puebla", type: "access", status: "normal", traffic: "8.2T" } },
  { id: "dist-qro", type: "custom", position: { x: 300, y: 350 }, data: { label: "DIST-QRO", sublabel: "Querétaro", type: "access", status: "normal", traffic: "6.4T" } },
  { id: "dist-tol", type: "custom", position: { x: 500, y: 350 }, data: { label: "DIST-TOL", sublabel: "Toluca", type: "access", status: "normal", traffic: "5.1T" } },
  { id: "dist-slp", type: "custom", position: { x: 700, y: 350 }, data: { label: "DIST-SLP", sublabel: "San Luis Potosí", type: "access", status: "normal", traffic: "4.8T" } },
];

const initialEdges = [
  { id: "e-core-mex-gdl", source: "core-mex", target: "core-gdl", type: "animated", data: { status: "normal" } },
  { id: "e-core-gdl-mty", source: "core-gdl", target: "core-mty", type: "animated", data: { status: "normal" } },
  
  { id: "e-core-mex-agg-centro", source: "core-mex", target: "agg-centro", type: "animated", data: { status: "normal" } },
  { id: "e-core-mex-agg-occidente", source: "core-mex", target: "agg-occidente", type: "animated", data: { status: "normal" } },
  { id: "e-core-gdl-agg-occidente", source: "core-gdl", target: "agg-occidente", type: "animated", data: { status: "normal" } },
  { id: "e-core-mty-agg-norte", source: "core-mty", target: "agg-norte", type: "animated", data: { status: "normal" } },
  
  { id: "e-agg-centro-dist-pue", source: "agg-centro", target: "dist-pue", type: "animated", data: { status: "normal" } },
  { id: "e-agg-centro-dist-qro", source: "agg-centro", target: "dist-qro", type: "animated", data: { status: "normal" } },
  { id: "e-agg-occidente-dist-tol", source: "agg-occidente", target: "dist-tol", type: "animated", data: { status: "normal" } },
  { id: "e-agg-occidente-dist-slp", source: "agg-occidente", target: "dist-slp", type: "animated", data: { status: "normal" } },
];

const trafficData = [
  { time: '00h', normal: 45, affected: 0 },
  { time: '02h', normal: 38, affected: 0 },
  { time: '04h', normal: 30, affected: 0 },
  { time: '06h', normal: 55, affected: 0 },
  { time: '08h', normal: 75, affected: 0 },
  { time: '10h', normal: 85, affected: 0 },
  { time: '12h', normal: 90, affected: 0 },
];

const trafficDataFailed = [
  { time: '00h', normal: 45, affected: 0 },
  { time: '02h', normal: 38, affected: 0 },
  { time: '04h', normal: 30, affected: 0 },
  { time: '06h', normal: 55, affected: 0 },
  { time: '08h', normal: 75, affected: 0 },
  { time: '10h', normal: 60, affected: 25 },
  { time: '12h', normal: 50, affected: 40 },
];

export default function DigitalTwinPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [simulationState, setSimulationState] = useState<"idle" | "running" | "completed">("idle");
  const [scenario, setScenario] = useState<string>("fiber-cut");
  const [timeRange, setTimeRange] = useState("12h");

  const runSimulation = () => {
    setSimulationState("running");
    
    // Reset first
    setNodes(initialNodes);
    setEdges(initialEdges);

    setTimeout(() => {
      if (scenario === "fiber-cut") {
        // Simulate Fiber Cut between AGG-CENTRO and DIST-QRO
        setEdges(eds => eds.map(e => {
          if (e.id === "e-agg-centro-dist-qro") {
            return { ...e, data: { status: "failed" } };
          }
          // Reroute traffic via alternative path (simulated visual)
          if (e.id === "e-core-mex-agg-centro" || e.id === "e-agg-centro-dist-pue") {
            return { ...e, data: { status: "rerouted" } };
          }
          return e;
        }));

        setNodes(nds => nds.map(n => {
          if (n.id === "dist-qro") return { ...n, data: { ...n.data, status: "critical", traffic: "0.0T" } };
          if (n.id === "agg-centro") return { ...n, data: { ...n.data, status: "warning" } };
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
      {/* Header & Controls */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-textPrimary tracking-tight uppercase">
            Transport Network Digital Twin
          </h1>
          <Badge variant="outline" className="bg-success/10 border-success/30 text-success animate-pulse">
            <div className="w-2 h-2 rounded-full bg-success mr-2" />
            LIVE
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-panelSoft px-4 py-2 rounded-md border border-border">
            <span className="text-sm text-textSecondary">Nodes</span>
            <span className="text-lg font-bold text-textPrimary">128</span>
          </div>
          <div className="flex items-center gap-2 bg-panelSoft px-4 py-2 rounded-md border border-border">
            <span className="text-sm text-textSecondary">Links</span>
            <span className="text-lg font-bold text-textPrimary">247</span>
          </div>
          <div className="flex items-center gap-2 bg-panelSoft px-4 py-2 rounded-md border border-border">
            <span className="text-sm text-textSecondary">Throughput</span>
            <span className="text-lg font-bold text-textPrimary">84.2 <span className="text-sm">Tbps</span></span>
          </div>
          {simulationState === "completed" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-danger/10 px-4 py-2 rounded-md border border-danger/50 text-danger"
            >
              <AlertTriangle className="w-4 h-4 animate-pulse" />
              <span className="font-bold">1 Active Failure</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Main Topology Area */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <Card className="flex-1 bg-panel border-border overflow-hidden relative flex flex-col">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
              <h2 className="text-sm font-bold text-textSecondary uppercase tracking-wider">Network Topology — Region Norte</h2>
            </div>
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button variant="outline" size="sm" className="bg-panelSoft border-border text-textPrimary hover:bg-panelSoft/80">Fit</Button>
              <Button variant="outline" size="sm" className="bg-panelSoft border-border text-textPrimary hover:bg-panelSoft/80">Layers</Button>
              <Button 
                size="sm" 
                className={cn(
                  "transition-all duration-300",
                  simulationState === "completed" ? "bg-danger/20 text-danger border border-danger/50 hover:bg-danger/30" : "bg-panelSoft border-border text-textPrimary hover:bg-panelSoft/80"
                )}
                onClick={simulationState === "completed" ? resetSimulation : runSimulation}
              >
                <Zap className={cn("w-4 h-4 mr-2", simulationState === "completed" && "animate-pulse")} />
                {simulationState === "completed" ? "Reset Simulation" : "Simulate Failure"}
              </Button>
              <Button size="sm" className="bg-accentBlue text-background hover:bg-accentBlue/90">Reroute</Button>
            </div>
            
            <div className="flex-1 relative">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                className="bg-[#0f172a]"
                minZoom={0.5}
                maxZoom={2}
              >
                <Background color="#1e293b" gap={24} size={2} />
                <Controls className="bg-panel border-border fill-textPrimary" showInteractive={false} />
              </ReactFlow>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-panel/80 backdrop-blur-sm p-3 rounded-md border border-border text-xs space-y-2">
                <div className="flex items-center gap-2"><Server className="w-3 h-3 text-accentBlue" /> <span className="text-textSecondary">Core / Aggregation</span></div>
                <div className="flex items-center gap-2"><Network className="w-3 h-3 text-textSecondary" /> <span className="text-textSecondary">Distribution</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success" /> <span className="text-textSecondary">Access</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-[#334155]" /> <span className="text-textSecondary">Fiber Link</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-0.5 border-t border-dashed border-[#334155]" /> <span className="text-textSecondary">Microwave</span></div>
              </div>
            </div>
          </Card>

          {/* Traffic Chart */}
          <Card className="h-64 bg-panel border-border shrink-0 flex flex-col">
            <CardHeader className="py-3 px-4 border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-textSecondary uppercase tracking-wider">Traffic — Last 12H</CardTitle>
              <div className="flex gap-1">
                {['1h', '12h', '24h'].map(t => (
                  <Button 
                    key={t} 
                    variant="outline" 
                    size="sm" 
                    className={cn("h-7 px-2 text-xs", timeRange === t ? "bg-accentBlue/20 text-accentBlue border-accentBlue/50" : "bg-transparent border-border text-textSecondary")}
                    onClick={() => setTimeRange(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4 pb-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={simulationState === "completed" ? trafficDataFailed : trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '6px' }}
                    itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', color: '#94a3b8' }} />
                  <Bar dataKey="normal" name="Normal Traffic" stackId="a" fill="#38bdf8" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="affected" name="Affected Traffic" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bottom Metrics */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            <Card className="bg-panel border-border p-4">
              <div className="text-xs text-textSecondary uppercase tracking-wider mb-1">Network Availability</div>
              <div className="text-2xl font-bold text-success">99.73<span className="text-sm">%</span></div>
              <div className="text-xs text-danger mt-1 flex items-center"><ArrowDown className="w-3 h-3 mr-1" /> -0.24% vs yesterday</div>
            </Card>
            <Card className="bg-panel border-border p-4">
              <div className="text-xs text-textSecondary uppercase tracking-wider mb-1">Active Alarms</div>
              <div className={cn("text-2xl font-bold", simulationState === "completed" ? "text-danger" : "text-textPrimary")}>
                {simulationState === "completed" ? "7" : "6"}
              </div>
              <div className="text-xs text-danger mt-1 flex items-center"><ArrowUp className="w-3 h-3 mr-1" /> +3 last hour</div>
            </Card>
            <Card className="bg-panel border-border p-4">
              <div className="text-xs text-textSecondary uppercase tracking-wider mb-1">Avg Latency</div>
              <div className="text-2xl font-bold text-accentBlue">4.2<span className="text-sm">ms</span></div>
              <div className="text-xs text-textSecondary mt-1 flex items-center"><ArrowRight className="w-3 h-3 mr-1" /> Stable</div>
            </Card>
            <Card className="bg-panel border-border p-4">
              <div className="text-xs text-textSecondary uppercase tracking-wider mb-1">Packet Loss</div>
              <div className={cn("text-2xl font-bold", simulationState === "completed" ? "text-warning" : "text-success")}>
                {simulationState === "completed" ? "0.08" : "0.01"}<span className="text-sm">%</span>
              </div>
              <div className={cn("text-xs mt-1 flex items-center", simulationState === "completed" ? "text-warning" : "text-textSecondary")}>
                {simulationState === "completed" ? <><ArrowUp className="w-3 h-3 mr-1" /> +0.03% DIST-QRO</> : <><ArrowRight className="w-3 h-3 mr-1" /> Stable</>}
              </div>
            </Card>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 flex flex-col gap-4 shrink-0 overflow-y-auto pr-1">
          {/* Node Status */}
          <Card className="bg-panel border-border">
            <CardHeader className="py-3 px-4 border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-textSecondary uppercase tracking-wider">Node Status</CardTitle>
              <span className="text-xs text-textSecondary">128 total</span>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between p-3 bg-panelSoft rounded-md border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <div>
                    <div className="text-sm font-bold text-textPrimary">CORE-MEX</div>
                    <div className="text-xs text-textSecondary">Mexico City · Core Router</div>
                  </div>
                </div>
                <div className="text-sm font-mono text-accentBlue font-bold">42.1T</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-panelSoft rounded-md border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <div>
                    <div className="text-sm font-bold text-textPrimary">AGG-NORTE</div>
                    <div className="text-xs text-textSecondary">Monterrey · Aggregation</div>
                  </div>
                </div>
                <div className="text-sm font-mono text-accentBlue font-bold">18.4T</div>
              </div>
              <div className={cn("flex items-center justify-between p-3 rounded-md border transition-colors", simulationState === "completed" ? "bg-danger/10 border-danger/30" : "bg-panelSoft border-border")}>
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", simulationState === "completed" ? "bg-danger animate-pulse" : "bg-success")} />
                  <div>
                    <div className="text-sm font-bold text-textPrimary">DIST-QRO</div>
                    <div className="text-xs text-textSecondary">Querétaro · Distribution</div>
                  </div>
                </div>
                <div className={cn("text-sm font-mono font-bold", simulationState === "completed" ? "text-danger" : "text-accentBlue")}>
                  {simulationState === "completed" ? "0.0T" : "8.2T"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Failure Simulation Panel */}
          <Card className="bg-panel border-border">
            <CardHeader className="py-3 px-4 border-b border-border">
              <CardTitle className="text-sm font-bold text-textSecondary uppercase tracking-wider">Failure Simulation</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {simulationState === "idle" ? (
                <div className="text-center py-8 text-textSecondary text-sm">
                  <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Select a scenario and run simulation to view impact analysis.</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-danger/10 border border-danger/30 rounded-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-danger" />
                    <div className="flex items-center gap-2 text-danger font-bold text-sm mb-3 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 animate-pulse" />
                      Fiber Link AGG-CENTRO → DIST-QRO
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b border-danger/10 pb-1">
                        <span className="text-textSecondary">Status</span>
                        <span className="text-danger font-bold">DOWN</span>
                      </div>
                      <div className="flex justify-between border-b border-danger/10 pb-1">
                        <span className="text-textSecondary">Affected Sites</span>
                        <span className="text-textPrimary font-bold">48</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-textSecondary">Affected Traffic</span>
                        <span className="text-textPrimary font-bold">6.4 Tbps</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Service Impact Panel */}
          {simulationState === "completed" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="bg-panel border-border">
                <CardHeader className="py-3 px-4 border-b border-border">
                  <CardTitle className="text-sm font-bold text-textSecondary uppercase tracking-wider">Service Impact</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="p-3 bg-panelSoft border border-border rounded-md flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-danger animate-pulse shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-textPrimary">5G NR — Banda 78</div>
                      <div className="text-xs text-textSecondary">32 celdas afectadas</div>
                    </div>
                  </div>
                  <div className="p-3 bg-panelSoft border border-border rounded-md flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-warning shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-textPrimary">LTE — Banda 28</div>
                      <div className="text-xs text-textSecondary">16 sectores degradados</div>
                    </div>
                  </div>
                  <div className="p-3 bg-panelSoft border border-border rounded-md flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-warning shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-textPrimary">Enterprise DIA</div>
                      <div className="text-xs text-textSecondary">12 clientes corporativos en backup</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
