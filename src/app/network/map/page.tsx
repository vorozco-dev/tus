"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Activity, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NetworkMapPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Geographic Network Map
        </h1>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-panelSoft border-border text-textSecondary">
            <MapPin className="w-3 h-3 mr-1" />
            Bogotá Region
          </Badge>
          <Badge variant="outline" className="bg-panelSoft border-border text-textSecondary">
            <Activity className="w-3 h-3 mr-1" />
            Live Traffic
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <Card className="flex-1 bg-panel border-border overflow-hidden relative">
          {/* Placeholder for actual map component (e.g., Mapbox, Leaflet) */}
          <div className="absolute inset-0 bg-[#0f172a] flex items-center justify-center overflow-hidden">
            {/* Grid background to simulate map tiles */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>
            
            {/* Simulated Map Content */}
            <div className="relative w-full h-full">
              {/* Nodes */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accentBlue rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)] z-10">
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-textPrimary whitespace-nowrap">CORE-01</div>
              </div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-accentBlue rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)] z-10">
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-textPrimary whitespace-nowrap">CORE-02</div>
              </div>
              <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-warning rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] z-10">
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-textPrimary whitespace-nowrap">AGG-N1</div>
              </div>
              <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-danger rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse z-10">
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-danger whitespace-nowrap">DIST-W1</div>
              </div>

              {/* Links */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="25%" y1="25%" x2="66%" y2="33%" stroke="#38bdf8" strokeWidth="3" strokeOpacity="0.6" />
                <line x1="25%" y1="25%" x2="33%" y2="66%" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.8" strokeDasharray="5,5" />
                <line x1="33%" y1="66%" x2="75%" y2="75%" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.8" />
                <line x1="66%" y1="33%" x2="75%" y2="75%" stroke="#334155" strokeWidth="2" strokeOpacity="0.5" />
              </svg>

              {/* Map Controls Overlay */}
              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <Button variant="secondary" size="icon" className="bg-panel border border-border text-textPrimary hover:bg-panelSoft">
                  +
                </Button>
                <Button variant="secondary" size="icon" className="bg-panel border border-border text-textPrimary hover:bg-panelSoft">
                  -
                </Button>
                <Button variant="secondary" size="icon" className="bg-panel border border-border text-textPrimary hover:bg-panelSoft mt-2">
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="w-80 bg-panel border-border shrink-0 overflow-y-auto">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg font-bold text-textPrimary flex items-center gap-2">
              <Activity className="w-5 h-5 text-accentBlue" />
              Link Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            <div className="space-y-4">
              <div className="p-3 bg-panelSoft border border-border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-bold text-textPrimary">CORE-01 ↔ CORE-02</div>
                    <div className="text-xs text-textSecondary">Fiber • 400G</div>
                  </div>
                  <Badge variant="outline" className="border-success text-success bg-success/10 text-[10px]">
                    Optimal
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-textSecondary">Utilization</span>
                    <span className="text-textPrimary">42%</span>
                  </div>
                  <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-panelSoft border border-warning/50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-bold text-textPrimary">CORE-01 ↔ AGG-N1</div>
                    <div className="text-xs text-textSecondary">Fiber • 100G</div>
                  </div>
                  <Badge variant="outline" className="border-warning text-warning bg-warning/10 text-[10px]">
                    Degraded
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-textSecondary">Utilization</span>
                    <span className="text-warning font-bold">88%</span>
                  </div>
                  <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-warning rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-danger/5 border border-danger/50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-bold text-textPrimary">AGG-N1 ↔ DIST-W1</div>
                    <div className="text-xs text-textSecondary">Microwave • 10G</div>
                  </div>
                  <Badge variant="outline" className="border-danger text-danger bg-danger/10 text-[10px] animate-pulse">
                    Down
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-danger">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Loss of Signal (LOS)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}