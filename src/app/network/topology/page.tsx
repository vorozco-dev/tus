"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "@/components/network/CustomNode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Maximize2, Layers } from "lucide-react";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "core-1",
    type: "custom",
    position: { x: 400, y: 50 },
    data: { label: "CORE-01", sublabel: "CDMX", type: "core", status: "normal" },
  },
  {
    id: "core-2",
    type: "custom",
    position: { x: 800, y: 50 },
    data: { label: "CORE-02", sublabel: "Monterrey", type: "core", status: "normal" },
  },
  {
    id: "agg-1",
    type: "custom",
    position: { x: 200, y: 200 },
    data: { label: "AGG-N1", sublabel: "Norte", type: "aggregation", status: "warning" },
  },
  {
    id: "agg-2",
    type: "custom",
    position: { x: 600, y: 200 },
    data: { label: "AGG-C1", sublabel: "Centro", type: "aggregation", status: "normal" },
  },
  {
    id: "agg-3",
    type: "custom",
    position: { x: 1000, y: 200 },
    data: { label: "AGG-S1", sublabel: "Sur", type: "aggregation", status: "normal" },
  },
  {
    id: "dist-1",
    type: "custom",
    position: { x: 100, y: 350 },
    data: { label: "DIST-W1", sublabel: "Polanco", type: "access", status: "critical" },
  },
  {
    id: "dist-2",
    type: "custom",
    position: { x: 300, y: 350 },
    data: { label: "DIST-E1", sublabel: "Santa Fe", type: "access", status: "normal" },
  },
  {
    id: "dist-3",
    type: "custom",
    position: { x: 500, y: 350 },
    data: { label: "DIST-C1", sublabel: "Condesa", type: "access", status: "normal" },
  },
  {
    id: "dist-4",
    type: "custom",
    position: { x: 700, y: 350 },
    data: { label: "DIST-S1", sublabel: "Coyoacán", type: "access", status: "normal" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "core-1", target: "core-2", animated: true, style: { stroke: "#38bdf8", strokeWidth: 2 } },
  { id: "e1-3", source: "core-1", target: "agg-1", style: { stroke: "#94a3b8", strokeWidth: 2 } },
  { id: "e1-4", source: "core-1", target: "agg-2", style: { stroke: "#94a3b8", strokeWidth: 2 } },
  { id: "e2-4", source: "core-2", target: "agg-2", style: { stroke: "#94a3b8", strokeWidth: 2 } },
  { id: "e2-5", source: "core-2", target: "agg-3", style: { stroke: "#94a3b8", strokeWidth: 2 } },
  { id: "e3-6", source: "agg-1", target: "dist-1", animated: true, style: { stroke: "#ef4444", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' } },
  { id: "e3-7", source: "agg-1", target: "dist-2", style: { stroke: "#94a3b8", strokeWidth: 1 } },
  { id: "e4-8", source: "agg-2", target: "dist-3", style: { stroke: "#94a3b8", strokeWidth: 1 } },
  { id: "e4-9", source: "agg-2", target: "dist-4", style: { stroke: "#94a3b8", strokeWidth: 1 } },
];

export default function TopologyPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Transport Topology
        </h1>
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-panel border-border text-textPrimary">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent className="bg-panel border-border text-textPrimary">
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="norte">Norte</SelectItem>
              <SelectItem value="centro">Centro</SelectItem>
              <SelectItem value="sur">Sur</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-panel border-border text-textPrimary">
              <SelectValue placeholder="Vendor" />
            </SelectTrigger>
            <SelectContent className="bg-panel border-border text-textPrimary">
              <SelectItem value="all">All Vendors</SelectItem>
              <SelectItem value="cisco">Cisco</SelectItem>
              <SelectItem value="nokia">Nokia</SelectItem>
              <SelectItem value="huawei">Huawei</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-panel border-border text-textPrimary hover:bg-panelSoft">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <Card className="flex-1 bg-panel border-border overflow-hidden relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button variant="secondary" size="sm" className="bg-panelSoft text-textPrimary hover:bg-border">
              <Layers className="w-4 h-4 mr-2" />
              Layers
            </Button>
            <Button variant="secondary" size="sm" className="bg-panelSoft text-textPrimary hover:bg-border">
              <Maximize2 className="w-4 h-4 mr-2" />
              Fit View
            </Button>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
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

        {selectedNode && (
          <Card className="w-80 bg-panel border-border shrink-0 overflow-y-auto animate-in slide-in-from-right-4 duration-300">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-textPrimary">
                  {selectedNode.data.label}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={cn(
                    "uppercase text-[10px] font-bold tracking-wider",
                    selectedNode.data.status === "critical" ? "border-danger text-danger" :
                    selectedNode.data.status === "warning" ? "border-warning text-warning" :
                    "border-success text-success"
                  )}
                >
                  {selectedNode.data.status}
                </Badge>
              </div>
              <p className="text-sm text-textSecondary">{selectedNode.data.sublabel}</p>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-textSecondary">Type:</div>
                  <div className="text-textPrimary capitalize">{selectedNode.data.type}</div>
                  <div className="text-textSecondary">Vendor:</div>
                  <div className="text-textPrimary">Cisco</div>
                  <div className="text-textSecondary">Model:</div>
                  <div className="text-textPrimary">NCS 5500</div>
                  <div className="text-textSecondary">IP:</div>
                  <div className="text-textPrimary font-mono text-xs">10.24.1.55</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Performance</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-textSecondary">CPU</span>
                      <span className="text-textPrimary">45%</span>
                    </div>
                    <div className="h-1.5 w-full bg-panelSoft rounded-full overflow-hidden">
                      <div className="h-full bg-accentBlue rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-textSecondary">Memory</span>
                      <span className="text-textPrimary">78%</span>
                    </div>
                    <div className="h-1.5 w-full bg-panelSoft rounded-full overflow-hidden">
                      <div className="h-full bg-warning rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Active Alarms</h4>
                {selectedNode.data.status === "critical" ? (
                  <div className="p-3 bg-danger/10 border border-danger/20 rounded-md">
                    <p className="text-sm font-medium text-danger">Link Down (Gi0/0/1)</p>
                    <p className="text-xs text-danger/70 mt-1">15 mins ago</p>
                  </div>
                ) : selectedNode.data.status === "warning" ? (
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
                    <p className="text-sm font-medium text-warning">High Utilization</p>
                    <p className="text-xs text-warning/70 mt-1">2 hours ago</p>
                  </div>
                ) : (
                  <p className="text-sm text-textSecondary italic">No active alarms</p>
                )}
              </div>

              <Button className="w-full bg-accentBlue text-background hover:bg-accentBlue/90">
                View Full Details
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}