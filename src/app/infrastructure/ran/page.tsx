"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioTower, Server, Router, ArrowRight, Activity, AlertTriangle } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export default function RANCorrelationPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          RAN Transport Correlation
        </h1>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-panelSoft border-border text-textSecondary">
            <Activity className="w-3 h-3 mr-1" />
            End-to-End View
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 min-h-0 overflow-y-auto">
        
        {/* Correlation Path 1 */}
        <Card className="bg-panel border-border shrink-0">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-textPrimary flex items-center gap-2">
                <RadioTower className="w-5 h-5 text-accentBlue" />
                Site: POL-01 (5G NR)
              </CardTitle>
              <StatusBadge status="critical" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-10 right-10 h-1 bg-border -translate-y-1/2 z-0"></div>
              
              {/* RAN Site */}
              <div className="relative z-10 flex flex-col items-center gap-3 w-48">
                <div className="w-16 h-16 rounded-full bg-panel border-2 border-danger flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <RadioTower className="w-8 h-8 text-danger" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-textPrimary">POL-01</p>
                  <p className="text-xs text-textSecondary">RAN Site</p>
                  <Badge variant="outline" className="mt-2 border-danger text-danger bg-danger/10 text-[10px]">Isolated</Badge>
                </div>
              </div>

              <ArrowRight className="w-6 h-6 text-danger z-10 bg-panel" />

              {/* Access Node */}
              <div className="relative z-10 flex flex-col items-center gap-3 w-48">
                <div className="w-16 h-16 rounded-full bg-panel border-2 border-danger flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse">
                  <Server className="w-8 h-8 text-danger" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-textPrimary">DIST-W1</p>
                  <p className="text-xs text-textSecondary">Access Node</p>
                  <Badge variant="outline" className="mt-2 border-danger text-danger bg-danger/10 text-[10px]">LOS Alarm</Badge>
                </div>
              </div>

              <ArrowRight className="w-6 h-6 text-textSecondary z-10 bg-panel" />

              {/* Aggregation Node */}
              <div className="relative z-10 flex flex-col items-center gap-3 w-48">
                <div className="w-16 h-16 rounded-full bg-panel border-2 border-warning flex items-center justify-center">
                  <Server className="w-8 h-8 text-warning" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-textPrimary">AGG-N1</p>
                  <p className="text-xs text-textSecondary">Aggregation Node</p>
                  <Badge variant="outline" className="mt-2 border-warning text-warning bg-warning/10 text-[10px]">Degraded</Badge>
                </div>
              </div>

              <ArrowRight className="w-6 h-6 text-textSecondary z-10 bg-panel" />

              {/* Core Node */}
              <div className="relative z-10 flex flex-col items-center gap-3 w-48">
                <div className="w-16 h-16 rounded-full bg-panel border-2 border-success flex items-center justify-center">
                  <Router className="w-8 h-8 text-success" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-textPrimary">CORE-01</p>
                  <p className="text-xs text-textSecondary">Core Router</p>
                  <Badge variant="outline" className="mt-2 border-success text-success bg-success/10 text-[10px]">Normal</Badge>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-danger/5 border border-danger/20 rounded-lg">
              <h4 className="text-sm font-bold text-danger mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Correlation Insight
              </h4>
              <p className="text-sm text-textSecondary">
                The isolation of RAN site <span className="font-bold text-textPrimary">POL-01</span> is directly correlated to the Loss of Signal (LOS) alarm on the transport access node <span className="font-bold text-textPrimary">DIST-W1</span>. The issue is in the transport domain, not the radio equipment.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Correlation Path 2 */}
        <Card className="bg-panel border-border shrink-0">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-textPrimary flex items-center gap-2">
                <RadioTower className="w-5 h-5 text-accentBlue" />
                Site: COND-05 (LTE)
              </CardTitle>
              <StatusBadge status="warning" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-10 right-10 h-1 bg-border -translate-y-1/2 z-0"></div>
              
              {/* RAN Site */}
              <div className="relative z-10 flex flex-col items-center gap-3 w-48">
                <div className="w-16 h-16 rounded-full bg-panel border-2 border-warning flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <RadioTower className="w-8 h-8 text-warning" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-textPrimary">COND-05</p>
                  <p className="text-xs text-textSecondary">RAN Site</p>
                  <Badge variant="outline" className="mt-2 border-warning text-warning bg-warning/10 text-[10px]">High Latency</Badge>
                </div>
              </div>

              <ArrowRight className="w-6 h-6 text-warning z-10 bg-panel" />

              {/* Access Node */}
              <div className="relative z-10 flex flex-col items-center gap-3 w-48">
                <div className="w-16 h-16 rounded-full bg-panel border-2 border-success flex items-center justify-center">
                  <Server className="w-8 h-8 text-success" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-textPrimary">DIST-C1</p>
                  <p className="text-xs text-textSecondary">Access Node</p>
                  <Badge variant="outline" className="mt-2 border-success text-success bg-success/10 text-[10px]">Normal</Badge>
                </div>
              </div>

              <ArrowRight className="w-6 h-6 text-warning z-10 bg-panel" />

              {/* Aggregation Node */}
              <div className="relative z-10 flex flex-col items-center gap-3 w-48">
                <div className="w-16 h-16 rounded-full bg-panel border-2 border-warning flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Server className="w-8 h-8 text-warning" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-textPrimary">AGG-C1</p>
                  <p className="text-xs text-textSecondary">Aggregation Node</p>
                  <Badge variant="outline" className="mt-2 border-warning text-warning bg-warning/10 text-[10px]">Congestion</Badge>
                </div>
              </div>

              <ArrowRight className="w-6 h-6 text-textSecondary z-10 bg-panel" />

              {/* Core Node */}
              <div className="relative z-10 flex flex-col items-center gap-3 w-48">
                <div className="w-16 h-16 rounded-full bg-panel border-2 border-success flex items-center justify-center">
                  <Router className="w-8 h-8 text-success" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-textPrimary">CORE-01</p>
                  <p className="text-xs text-textSecondary">Core Router</p>
                  <Badge variant="outline" className="mt-2 border-success text-success bg-success/10 text-[10px]">Normal</Badge>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <h4 className="text-sm font-bold text-warning mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Correlation Insight
              </h4>
              <p className="text-sm text-textSecondary">
                High latency reported at RAN site <span className="font-bold text-textPrimary">COND-05</span> correlates with link congestion (92% utilization) at the aggregation node <span className="font-bold text-textPrimary">AGG-C1</span>. Recommend traffic engineering or capacity upgrade on the AGG-C1 uplink.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}