"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Activity, Server, RadioTower, Users } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ServiceImpactPage() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Service Impact Analysis
        </h1>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <Card className="w-96 bg-panel border-border shrink-0 overflow-y-auto flex flex-col">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg font-bold text-textPrimary flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Failure Simulation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-6 flex-1 flex flex-col">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-textSecondary">Failure Type</label>
                <Select defaultValue="link">
                  <SelectTrigger className="w-full bg-panelSoft border-border text-textPrimary">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-panel border-border text-textPrimary">
                    <SelectItem value="link">Link Failure</SelectItem>
                    <SelectItem value="node">Node Failure</SelectItem>
                    <SelectItem value="card">Line Card Failure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-textSecondary">Target Element</label>
                <Select defaultValue="agg-dist">
                  <SelectTrigger className="w-full bg-panelSoft border-border text-textPrimary">
                    <SelectValue placeholder="Select element" />
                  </SelectTrigger>
                  <SelectContent className="bg-panel border-border text-textPrimary">
                    <SelectItem value="agg-dist">Link: AGG-N1 ↔ DIST-W1</SelectItem>
                    <SelectItem value="core-agg">Link: CORE-01 ↔ AGG-N1</SelectItem>
                    <SelectItem value="core-core">Link: CORE-01 ↔ CORE-02</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full bg-warning text-background hover:bg-warning/90 mt-4"
                onClick={handleSimulate}
                disabled={isSimulating}
              >
                {isSimulating ? (
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-spin" /> Analyzing Impact...
                  </span>
                ) : (
                  "Simulate Failure"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1 flex flex-col gap-4">
          {showResults ? (
            <>
              <div className="grid grid-cols-3 gap-4 shrink-0">
                <Card className="bg-panel border-danger/50 bg-danger/5">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-danger/20 flex items-center justify-center text-danger">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-textSecondary uppercase tracking-wider">Affected Services</p>
                      <p className="text-lg font-bold text-danger">1,248</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-panel border-warning/50 bg-warning/5">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning">
                      <RadioTower className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-textSecondary uppercase tracking-wider">Isolated Sites</p>
                      <p className="text-lg font-bold text-warning">48</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-panel border-border">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accentBlue/20 flex items-center justify-center text-accentBlue">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-textSecondary uppercase tracking-wider">Est. Users Impacted</p>
                      <p className="text-lg font-bold text-textPrimary">~45,000</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="flex-1 bg-panel border-border overflow-hidden flex flex-col">
                <CardHeader className="border-b border-border pb-4 shrink-0">
                  <CardTitle className="text-lg font-bold text-textPrimary">
                    Impact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-y-auto space-y-6">
                  
                  <div>
                    <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-4">Critical Services (SLA Impact)</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-panelSoft border border-danger/30 rounded-md">
                        <div className="flex items-center gap-3">
                          <StatusBadge status="critical" showLabel={false} />
                          <div>
                            <p className="text-sm font-bold text-textPrimary">Hospital General - Main Link</p>
                            <p className="text-xs text-textSecondary">L2VPN • 1G • SLA: 99.99%</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-danger text-danger bg-danger/10">Down</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-panelSoft border border-danger/30 rounded-md">
                        <div className="flex items-center gap-3">
                          <StatusBadge status="critical" showLabel={false} />
                          <div>
                            <p className="text-sm font-bold text-textPrimary">Bank HQ - Backup Link</p>
                            <p className="text-xs text-textSecondary">L3VPN • 10G • SLA: 99.999%</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-danger text-danger bg-danger/10">Down</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-4">Mobile Network Impact (RAN)</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-panelSoft border border-warning/30 rounded-md">
                        <div className="flex items-center gap-3">
                          <StatusBadge status="warning" showLabel={false} />
                          <div>
                            <p className="text-sm font-bold text-textPrimary">5G NR - Polanco Sector</p>
                            <p className="text-xs text-textSecondary">32 Cells Affected • Rerouted via MW</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-warning text-warning bg-warning/10">Degraded</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-panelSoft border border-warning/30 rounded-md">
                        <div className="flex items-center gap-3">
                          <StatusBadge status="warning" showLabel={false} />
                          <div>
                            <p className="text-sm font-bold text-textPrimary">LTE - Santa Fe Sector</p>
                            <p className="text-xs text-textSecondary">16 Cells Affected • High Latency</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-warning text-warning bg-warning/10">Degraded</Badge>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="flex-1 bg-panel border-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-panelSoft flex items-center justify-center mx-auto text-textSecondary">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-textPrimary">No Simulation Running</h3>
                <p className="text-sm text-textSecondary max-w-sm mx-auto">
                  Select a failure scenario and click simulate to analyze the impact on services and sites.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}