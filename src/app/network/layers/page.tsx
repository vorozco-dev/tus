"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, Server, Network, Activity, RadioTower } from "lucide-react";
import { cn } from "@/lib/utils";

const layers = [
  { id: "service", name: "Service Layer", icon: Activity, color: "text-accentBlue", border: "border-accentBlue" },
  { id: "logical", name: "Logical Layer (IP/MPLS)", icon: Network, color: "text-success", border: "border-success" },
  { id: "transport", name: "Transport Layer (DWDM/OTN)", icon: Server, color: "text-warning", border: "border-warning" },
  { id: "physical", name: "Physical Layer (Fiber/MW)", icon: RadioTower, color: "text-textSecondary", border: "border-textSecondary" },
];

export default function MultiLayerPage() {
  const [activeLayers, setActiveLayers] = useState<string[]>(["service", "logical", "transport", "physical"]);

  const toggleLayer = (id: string) => {
    setActiveLayers(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Multi-Layer Network View
        </h1>
        <div className="flex items-center gap-2">
          {layers.map(layer => (
            <Button
              key={layer.id}
              variant="outline"
              size="sm"
              onClick={() => toggleLayer(layer.id)}
              className={cn(
                "bg-panel border-border transition-colors",
                activeLayers.includes(layer.id) ? "bg-panelSoft text-textPrimary" : "text-textSecondary opacity-50"
              )}
            >
              <layer.icon className={cn("w-4 h-4 mr-2", layer.color)} />
              {layer.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <Card className="flex-1 bg-panel border-border overflow-hidden relative flex items-center justify-center perspective-1000">
          <div className="relative w-full max-w-3xl h-[600px] transform-style-3d rotate-x-60 rotate-z-[-15deg] scale-90">
            
            {/* Service Layer */}
            <div className={cn(
              "absolute inset-0 border-2 bg-panel/40 backdrop-blur-sm rounded-xl transition-all duration-500 transform translate-z-[150px]",
              layers[0].border,
              activeLayers.includes("service") ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
              <div className="absolute -top-8 left-0 text-accentBlue font-bold flex items-center gap-2">
                <Activity className="w-5 h-5" /> Service Layer (L3VPN, L2VPN)
              </div>
              {/* Mock Service Nodes */}
              <div className="absolute top-1/4 left-1/4 w-16 h-8 bg-accentBlue/20 border border-accentBlue rounded flex items-center justify-center text-xs text-accentBlue font-bold">VPN-A</div>
              <div className="absolute bottom-1/4 right-1/4 w-16 h-8 bg-accentBlue/20 border border-accentBlue rounded flex items-center justify-center text-xs text-accentBlue font-bold">VPN-B</div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
              </svg>
            </div>

            {/* Logical Layer */}
            <div className={cn(
              "absolute inset-0 border-2 bg-panel/40 backdrop-blur-sm rounded-xl transition-all duration-500 transform translate-z-[50px]",
              layers[1].border,
              activeLayers.includes("logical") ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
              <div className="absolute -top-8 left-0 text-success font-bold flex items-center gap-2">
                <Network className="w-5 h-5" /> Logical Layer (IP/MPLS)
              </div>
              {/* Mock Logical Nodes */}
              <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-success/20 border border-success rounded-full flex items-center justify-center text-xs text-success font-bold">PE1</div>
              <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-success/20 border border-success rounded-full flex items-center justify-center text-xs text-success font-bold">P1</div>
              <div className="absolute bottom-1/4 right-1/4 w-10 h-10 bg-success/20 border border-success rounded-full flex items-center justify-center text-xs text-success font-bold">PE2</div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#22c55e" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#22c55e" strokeWidth="2" />
              </svg>
            </div>

            {/* Transport Layer */}
            <div className={cn(
              "absolute inset-0 border-2 bg-panel/40 backdrop-blur-sm rounded-xl transition-all duration-500 transform translate-z-[-50px]",
              layers[2].border,
              activeLayers.includes("transport") ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
              <div className="absolute -top-8 left-0 text-warning font-bold flex items-center gap-2">
                <Server className="w-5 h-5" /> Transport Layer (DWDM/OTN)
              </div>
              {/* Mock Transport Nodes */}
              <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-warning/20 border border-warning rounded flex items-center justify-center text-xs text-warning font-bold">ROADM1</div>
              <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-warning/20 border border-warning rounded flex items-center justify-center text-xs text-warning font-bold">ROADM2</div>
              <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-warning/20 border border-warning rounded flex items-center justify-center text-xs text-warning font-bold">ROADM3</div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="#f59e0b" strokeWidth="3" />
                <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="#f59e0b" strokeWidth="3" />
              </svg>
            </div>

            {/* Physical Layer */}
            <div className={cn(
              "absolute inset-0 border-2 bg-panel/40 backdrop-blur-sm rounded-xl transition-all duration-500 transform translate-z-[-150px]",
              layers[3].border,
              activeLayers.includes("physical") ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
              <div className="absolute -top-8 left-0 text-textSecondary font-bold flex items-center gap-2">
                <RadioTower className="w-5 h-5" /> Physical Layer (Fiber/MW)
              </div>
              {/* Mock Physical Nodes */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-textSecondary rounded-full shadow-[0_0_10px_rgba(148,163,184,0.5)]"></div>
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-textSecondary rounded-full shadow-[0_0_10px_rgba(148,163,184,0.5)]"></div>
              <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-textSecondary rounded-full shadow-[0_0_10px_rgba(148,163,184,0.5)]"></div>
              <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-textSecondary rounded-full shadow-[0_0_10px_rgba(148,163,184,0.5)]"></div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="#94a3b8" strokeWidth="4" strokeOpacity="0.5" />
                <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="#94a3b8" strokeWidth="4" strokeOpacity="0.5" />
                <line x1="75%" y1="75%" x2="25%" y2="75%" stroke="#94a3b8" strokeWidth="4" strokeOpacity="0.5" />
                <line x1="25%" y1="75%" x2="25%" y2="25%" stroke="#94a3b8" strokeWidth="4" strokeOpacity="0.5" />
              </svg>
            </div>

            {/* Inter-layer connections (Vertical lines) */}
            {activeLayers.length > 1 && (
              <div className="absolute inset-0 pointer-events-none transform-style-3d">
                {/* Example vertical connection from Service to Logical */}
                <div className="absolute top-1/4 left-1/4 w-0.5 h-[100px] bg-accentBlue/50 transform translate-z-[50px] rotate-x-90 origin-top"></div>
                <div className="absolute bottom-1/4 right-1/4 w-0.5 h-[100px] bg-accentBlue/50 transform translate-z-[50px] rotate-x-90 origin-top"></div>
                
                {/* Example vertical connection from Logical to Transport */}
                <div className="absolute top-1/4 left-1/4 w-0.5 h-[100px] bg-success/50 transform translate-z-[-50px] rotate-x-90 origin-top"></div>
                <div className="absolute bottom-1/4 right-1/4 w-0.5 h-[100px] bg-success/50 transform translate-z-[-50px] rotate-x-90 origin-top"></div>
              </div>
            )}

          </div>
        </Card>

        <Card className="w-80 bg-panel border-border shrink-0 overflow-y-auto">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg font-bold text-textPrimary flex items-center gap-2">
              <Layers className="w-5 h-5 text-accentBlue" />
              Cross-Layer Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            <div className="space-y-4">
              <div className="p-3 bg-panelSoft border border-border rounded-md">
                <h4 className="text-sm font-bold text-textPrimary mb-2">Service Impact</h4>
                <p className="text-xs text-textSecondary mb-3">
                  Analyzing impact of Transport Layer failure on upper layers.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-warning flex items-center gap-1"><Server className="w-3 h-3"/> ROADM1</span>
                    <span className="text-textSecondary">→</span>
                    <span className="text-success flex items-center gap-1"><Network className="w-3 h-3"/> PE1</span>
                    <span className="text-textSecondary">→</span>
                    <span className="text-accentBlue flex items-center gap-1"><Activity className="w-3 h-3"/> VPN-A</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-warning flex items-center gap-1"><Server className="w-3 h-3"/> ROADM3</span>
                    <span className="text-textSecondary">→</span>
                    <span className="text-success flex items-center gap-1"><Network className="w-3 h-3"/> PE2</span>
                    <span className="text-textSecondary">→</span>
                    <span className="text-accentBlue flex items-center gap-1"><Activity className="w-3 h-3"/> VPN-B</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-panelSoft border border-border rounded-md">
                <h4 className="text-sm font-bold text-textPrimary mb-2">Path Diversity</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-textSecondary">Logical Diversity (IP)</span>
                      <span className="text-success">100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-textSecondary">Physical Diversity (Fiber)</span>
                      <span className="text-danger font-bold">0% (Shared Risk)</span>
                    </div>
                    <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-danger rounded-full" style={{ width: '10%' }} />
                    </div>
                    <p className="text-[10px] text-textSecondary mt-1">
                      Warning: IP paths P1 and P2 share the same physical fiber trench.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}