"use client";

import { useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
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
import { Play, RotateCcw, Activity, Server, Router, Network, ArrowRight, ArrowDown, ArrowUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

// --- Types ---
type SimulationPhase = "idle" | "failure-detected" | "traffic-impact" | "rerouting" | "stabilized";

// --- Custom Node Component ---
const CustomNode = ({ data }: NodeProps) => {
  const isCritical = data.status === "critical";
  const isWarning = data.status === "warning";

  return (
    <div className="relative group">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      {/* Impact Radius Animation */}
      {isCritical && (
        <motion.div
          className="absolute inset-0 rounded-full bg-danger/20 -z-10"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      {isWarning && (
        <motion.div
          className="absolute inset-0 rounded-full bg-warning/20 -z-10"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}

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
  
  // Speed based on state
  const particleDuration = isRerouted ? "1s" : "3s";

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
          <animateMotion dur={particleDuration} repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
      {!isFailed && (
        <circle r="3" fill={isRerouted ? "#38bdf8" : "#22d3ee"} className="filter drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
          <animateMotion dur={particleDuration} begin="0.8s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
      {!isFailed && (
        <circle r="2" fill={isRerouted ? "#38bdf8" : "#22d3ee"} className="filter drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
          <animateMotion dur={particleDuration} begin="1.6s" repeatCount="indefinite" path={edgePath} />
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

const trafficDataStabilized = [
  { time: '00h', normal: 45, affected: 0 },
  { time: '02h', normal: 38, affected: 0 },
  { time: '04h', normal: 30, affected: 0 },
  { time: '06h', normal: 55, affected: 0 },
  { time: '08h', normal: 75, affected: 0 },
  { time: '10h', normal: 60, affected: 25 },
  { time: '12h', normal: 85, affected: 5 }, // Rerouted, mostly recovered
];

export default function DigitalTwinPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [phase, setPhase] = useState<SimulationPhase>("idle");
  const [timeRange, setTimeRange] = useState("12h");

  const runSimulation = () => {
    // Reset first
    setNodes(initialNodes);
    setEdges(initialEdges);
    setPhase("idle");

    // Step 1: Failure Detected
    setTimeout(() => {
      setPhase("failure-detected");
      setEdges(eds => eds.map(e => {
        if (e.id === "e-agg-centro-dist-qro") {
          return { ...e, data: { status: "failed" } };
        }
        return e;
      }));
    }, 500);

    // Step 2: Traffic Impact (Node goes critical)
    setTimeout(() => {
      setPhase("traffic-impact");
      setNodes(nds => nds.map(n => {
        if (n.id === "dist-qro") return { ...n, data: { ...n.data, status: "critical", traffic: "0.0T" } };
        if (n.id === "agg-centro") return { ...n, data: { ...n.data, status: "warning" } };
        return n;
      }));
    }, 2500);

    // Step 3: Rerouting Activated
    setTimeout(() => {
      setPhase("rerouting");
      setEdges(eds => eds.map(e => {
        // Alternative path lights up
        if (e.id === "e-core-mex-agg-occidente" || e.id === "e-agg-occidente-dist-slp") {
          return { ...e, data: { status: "rerouted" } };
        }
        return e;
      }));
      // Add a temporary edge to simulate the reroute reaching QRO from SLP
      setEdges(eds => [
        ...eds,
        { id: "e-dist-slp-dist-qro", source: "dist-slp", target: "dist-qro", type: "animated", data: { status: "rerouted" }, style: { strokeDasharray: "5,5" } }
      ]);
    }, 4500);

    // Step 4: Stabilized
    setTimeout(() => {
      setPhase("stabilized");
      setNodes(nds => nds.map(n => {
        if (n.id === "dist-qro") return { ...n, data: { ...n.data, status: "warning", traffic: "5.8T" } }; // Partially recovered
        if (n.id === "agg-occidente" || n.id === "dist-slp") return { ...n, data: { ...n.data, status: "warning" } }; // Stressed by new traffic
        return n;
      }));
    }, 6500);
  };

  const resetSimulation = () => {
    setPhase("idle");
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  const getTrafficData = () => {
    if (phase === "idle" || phase === "failure-detected") return trafficData;
    if (phase === "traffic-impact" || phase === "rerouting") return trafficDataFailed;
    return trafficDataStabilized;
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      {/* Header & Controls */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-textPrimary tracking-tight uppercase">
            Transport Network Digital Twin
          </h1>
          {phase === "idle" ? (
            <Badge variant="outline" className="bg-success/10 border-success/30 text-success animate-pulse">
              <div className="w-2 h-2 rounded-full bg-success mr-2" />
              LIVE NETWORK
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-warning/10 border-warning/30 text-warning animate-pulse">
              <Activity className="w-3 h-3 mr-2" />
              SIMULATION MODE
            </Badge>
          )}
        </div>
        
        {/* Simulation Timeline */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-panelSoft -z-10" />
            <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-accentBlue transition-all duration-500 -z-10", 
              phase === "idle" ? "w-0" :
              phase === "failure-detected" ? "w-[25%]" :
              phase === "traffic-impact" ? "w-[50%]" :
              phase === "rerouting" ? "w-[75%]" : "w-full"
            )} />
            
            {[
              { id: "failure-detected", label: "Failure Detected" },
              { id: "traffic-impact", label: "Traffic Impact" },
              { id: "rerouting", label: "Rerouting Activated" },
              { id: "stabilized", label: "Network Stabilized" }
            ].map((step, idx) => {
              const isPast = 
                (phase === "stabilized") ||
                (phase === "rerouting" && idx <= 2) ||
                (phase === "traffic-impact" && idx <= 1) ||
                (phase === "failure-detected" && idx === 0);
              const isCurrent = phase === step.id;

              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 transition-colors duration-300",
                    isCurrent ? "bg-accentBlue border-accentBlue shadow-[0_0_10px_#38bdf8]" :
                    isPast ? "bg-accentBlue border-accentBlue" : "bg-panel border-panelSoft"
                  )} />
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider absolute top-6 whitespace-nowrap",
                    isCurrent ? "text-accentBlue" : isPast ? "text-textPrimary" : "text-textSecondary"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {phase === "idle" ? (
            <Button 
              className="bg-accentBlue text-background hover:bg-accentBlue/90"
              onClick={runSimulation}
            >
              <Play className="w-4 h-4 mr-2" /> Run Simulation
            </Button>
          ) : (
            <>
              <Button 
                variant="outline"
                className="bg-panelSoft border-border text-textPrimary hover:bg-panelSoft/80"
                onClick={runSimulation}
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Replay
              </Button>
              <Button 
                variant="outline"
                className="bg-panelSoft border-border text-textPrimary hover:bg-panelSoft/80"
                onClick={resetSimulation}
              >
                Reset
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0 mt-4">
        {/* Main Topology Area */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <Card className="flex-1 bg-panel border-border overflow-hidden relative flex flex-col">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
              <h2 className="text-sm font-bold text-textSecondary uppercase tracking-wider">Network Topology — Region Centro/Norte</h2>
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
                <BarChart data={getTrafficData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
        </div>

        {/* Right Panel */}
        <div className="w-80 flex flex-col gap-4 shrink-0 overflow-y-auto pr-1">
          
          {/* Simulation Explanation Panel */}
          <AnimatePresence mode="wait">
            {phase !== "idle" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="bg-panel border-accentBlue/50 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                  <CardHeader className="py-3 px-4 border-b border-border bg-accentBlue/5">
                    <CardTitle className="text-sm font-bold text-accentBlue uppercase tracking-wider flex items-center gap-2">
                      <Info className="w-4 h-4" /> Simulation Explanation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4 text-sm">
                    <p className="text-textPrimary">
                      Fiber failure detected between <span className="font-bold text-danger">AGG-CENTRO</span> and <span className="font-bold text-danger">DIST-QRO</span>.
                    </p>
                    
                    {(phase === "traffic-impact" || phase === "rerouting" || phase === "stabilized") && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <p className="text-textSecondary font-bold uppercase text-xs mb-2">Impact:</p>
                        <ul className="list-disc list-inside text-textPrimary space-y-1 ml-1">
                          <li>48 sites affected</li>
                          <li>6.4 Tbps traffic loss</li>
                          <li>32 5G cells degraded</li>
                        </ul>
                      </motion.div>
                    )}

                    {(phase === "rerouting" || phase === "stabilized") && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 pt-2 border-t border-border">
                        <p className="text-textSecondary font-bold uppercase text-xs mb-2">Network Response:</p>
                        <p className="text-textPrimary">
                          Traffic automatically rerouted via <span className="font-bold text-accentBlue">AGG-OCCIDENTE</span> and <span className="font-bold text-accentBlue">DIST-SLP</span>.
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Path Comparison Panel */}
          <AnimatePresence>
            {(phase === "rerouting" || phase === "stabilized") && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-panel border-border">
                  <CardHeader className="py-3 px-4 border-b border-border">
                    <CardTitle className="text-sm font-bold text-textSecondary uppercase tracking-wider">Path Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 flex gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="text-[10px] font-bold text-textSecondary uppercase">Original Path</div>
                      <div className="flex flex-col items-center text-xs text-textSecondary opacity-50">
                        <span>CORE-MEX</span>
                        <ArrowDown className="w-3 h-3 my-1" />
                        <span>AGG-CENTRO</span>
                        <ArrowDown className="w-3 h-3 my-1 text-danger" />
                        <span className="line-through">DIST-QRO</span>
                      </div>
                      <div className="text-center text-[10px] font-bold text-danger mt-2 bg-danger/10 py-1 rounded">FAILED</div>
                    </div>
                    <div className="w-px bg-border" />
                    <div className="flex-1 space-y-2">
                      <div className="text-[10px] font-bold text-accentBlue uppercase">Alternative Path</div>
                      <div className="flex flex-col items-center text-xs text-textPrimary">
                        <span>CORE-MEX</span>
                        <ArrowDown className="w-3 h-3 my-1 text-accentBlue" />
                        <span>AGG-OCCIDENTE</span>
                        <ArrowDown className="w-3 h-3 my-1 text-accentBlue" />
                        <span>DIST-SLP</span>
                        <ArrowDown className="w-3 h-3 my-1 text-accentBlue border-dashed" />
                        <span>DIST-QRO</span>
                      </div>
                      <div className="text-center text-[10px] font-bold text-success mt-2 bg-success/10 py-1 rounded">ACTIVATED</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SLA Impact Panel */}
          <Card className="bg-panel border-border">
            <CardHeader className="py-3 px-4 border-b border-border">
              <CardTitle className="text-sm font-bold text-textSecondary uppercase tracking-wider">SLA Impact</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs text-textSecondary mb-1">
                  <span>Availability</span>
                  <span className={cn("font-bold", phase !== "idle" ? "text-danger" : "text-success")}>
                    {phase !== "idle" ? "99.21%" : "99.73%"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-textPrimary">99.73</span>
                  <ArrowRight className="w-3 h-3 text-textSecondary" />
                  <span className={cn(phase !== "idle" ? "text-danger" : "text-textPrimary")}>
                    {phase !== "idle" ? "99.21" : "99.73"}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-textSecondary mb-1">
                  <span>Latency</span>
                  <span className={cn("font-bold", phase === "stabilized" ? "text-warning" : phase !== "idle" ? "text-danger" : "text-success")}>
                    {phase === "stabilized" ? "8.6ms" : phase !== "idle" ? "ERR" : "4.2ms"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-textPrimary">4.2ms</span>
                  <ArrowRight className="w-3 h-3 text-textSecondary" />
                  <span className={cn(phase === "stabilized" ? "text-warning" : phase !== "idle" ? "text-danger" : "text-textPrimary")}>
                    {phase === "stabilized" ? "8.6ms" : phase !== "idle" ? "---" : "4.2ms"}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-textSecondary mb-1">
                  <span>Packet Loss</span>
                  <span className={cn("font-bold", phase === "traffic-impact" ? "text-danger" : phase === "stabilized" ? "text-warning" : "text-success")}>
                    {phase === "traffic-impact" ? "12.4%" : phase === "stabilized" ? "0.08%" : "0.01%"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-textPrimary">0.01</span>
                  <ArrowRight className="w-3 h-3 text-textSecondary" />
                  <span className={cn(phase === "traffic-impact" ? "text-danger" : phase === "stabilized" ? "text-warning" : "text-textPrimary")}>
                    {phase === "traffic-impact" ? "12.4" : phase === "stabilized" ? "0.08" : "0.01"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
