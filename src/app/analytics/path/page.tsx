"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Route, ArrowRight, Activity, Clock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PathOptimizationPage() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Path Optimization
        </h1>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <Card className="w-96 bg-panel border-border shrink-0 overflow-y-auto flex flex-col">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg font-bold text-textPrimary flex items-center gap-2">
              <Route className="w-5 h-5 text-accentBlue" />
              Compute Path
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-6 flex-1 flex flex-col">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-textSecondary">Source Node</label>
                <Select defaultValue="dist-w1">
                  <SelectTrigger className="w-full bg-panelSoft border-border text-textPrimary">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent className="bg-panel border-border text-textPrimary">
                    <SelectItem value="dist-w1">DIST-W1 (Suba)</SelectItem>
                    <SelectItem value="dist-e1">DIST-E1 (Usaquén)</SelectItem>
                    <SelectItem value="core-1">CORE-01 (Bogotá)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-textSecondary rotate-90" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-textSecondary">Destination Node</label>
                <Select defaultValue="core-2">
                  <SelectTrigger className="w-full bg-panelSoft border-border text-textPrimary">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent className="bg-panel border-border text-textPrimary">
                    <SelectItem value="core-2">CORE-02 (Medellín)</SelectItem>
                    <SelectItem value="agg-s1">AGG-S1 (Sur)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <h4 className="text-sm font-bold text-textPrimary">Constraints</h4>
                
                <div className="space-y-2">
                  <label className="text-xs text-textSecondary">Max Latency (ms)</label>
                  <Input type="number" defaultValue={15} className="bg-panelSoft border-border text-textPrimary" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-textSecondary">Max Link Utilization (%)</label>
                  <Input type="number" defaultValue={80} className="bg-panelSoft border-border text-textPrimary" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-textSecondary">Optimization Objective</label>
                  <Select defaultValue="latency">
                    <SelectTrigger className="w-full bg-panelSoft border-border text-textPrimary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-panel border-border text-textPrimary">
                      <SelectItem value="latency">Minimize Latency</SelectItem>
                      <SelectItem value="utilization">Balance Utilization</SelectItem>
                      <SelectItem value="hops">Minimize Hops</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full bg-accentBlue text-background hover:bg-accentBlue/90 mt-4"
                onClick={handleCalculate}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-spin" /> Computing...
                  </span>
                ) : (
                  "Calculate Optimal Path"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1 flex flex-col gap-4">
          {showResults ? (
            <>
              <div className="grid grid-cols-3 gap-4 shrink-0">
                <Card className="bg-panel border-border">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-textSecondary uppercase tracking-wider">Status</p>
                      <p className="text-lg font-bold text-success">Path Found</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-panel border-border">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accentBlue/20 flex items-center justify-center text-accentBlue">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-textSecondary uppercase tracking-wider">Est. Latency</p>
                      <p className="text-lg font-bold text-textPrimary">8.4 ms</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-panel border-border">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-textSecondary uppercase tracking-wider">Max Bottleneck</p>
                      <p className="text-lg font-bold text-textPrimary">62% Util</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="flex-1 bg-panel border-border overflow-hidden flex flex-col">
                <CardHeader className="border-b border-border pb-4 shrink-0">
                  <CardTitle className="text-lg font-bold text-textPrimary">
                    Calculated Route
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-y-auto">
                  <div className="relative">
                    {/* Path Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-border"></div>
                    
                    <div className="space-y-8 relative">
                      {/* Node 1 */}
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-panel border-2 border-accentBlue flex items-center justify-center z-10 shrink-0">
                          <div className="w-3 h-3 rounded-full bg-accentBlue"></div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="text-base font-bold text-textPrimary">DIST-W1 (Source)</h4>
                          <p className="text-sm text-textSecondary">Access Node • Suba</p>
                        </div>
                      </div>

                      {/* Link 1 */}
                      <div className="flex gap-6 pl-16">
                        <div className="flex-1 p-3 bg-panelSoft border border-border rounded-md">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-textSecondary">Link: DIST-W1 → AGG-N1</span>
                            <span className="text-success">45% Util</span>
                          </div>
                          <div className="flex justify-between text-xs text-textSecondary">
                            <span>10G Fiber</span>
                            <span>1.2ms</span>
                          </div>
                        </div>
                      </div>

                      {/* Node 2 */}
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-panel border-2 border-border flex items-center justify-center z-10 shrink-0">
                          <div className="w-2 h-2 rounded-full bg-textSecondary"></div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="text-base font-bold text-textPrimary">AGG-N1</h4>
                          <p className="text-sm text-textSecondary">Aggregation Node • Norte</p>
                        </div>
                      </div>

                      {/* Link 2 */}
                      <div className="flex gap-6 pl-16">
                        <div className="flex-1 p-3 bg-panelSoft border border-border rounded-md">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-textSecondary">Link: AGG-N1 → CORE-01</span>
                            <span className="text-warning">62% Util</span>
                          </div>
                          <div className="flex justify-between text-xs text-textSecondary">
                            <span>100G DWDM</span>
                            <span>2.5ms</span>
                          </div>
                        </div>
                      </div>

                      {/* Node 3 */}
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-panel border-2 border-border flex items-center justify-center z-10 shrink-0">
                          <div className="w-2 h-2 rounded-full bg-textSecondary"></div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="text-base font-bold text-textPrimary">CORE-01</h4>
                          <p className="text-sm text-textSecondary">Core Router • Bogotá</p>
                        </div>
                      </div>

                      {/* Link 3 */}
                      <div className="flex gap-6 pl-16">
                        <div className="flex-1 p-3 bg-panelSoft border border-border rounded-md">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-textSecondary">Link: CORE-01 → CORE-02</span>
                            <span className="text-success">38% Util</span>
                          </div>
                          <div className="flex justify-between text-xs text-textSecondary">
                            <span>400G DWDM</span>
                            <span>4.7ms</span>
                          </div>
                        </div>
                      </div>

                      {/* Node 4 */}
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-panel border-2 border-success flex items-center justify-center z-10 shrink-0">
                          <div className="w-3 h-3 rounded-full bg-success"></div>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="text-base font-bold text-textPrimary">CORE-02 (Destination)</h4>
                          <p className="text-sm text-textSecondary">Core Router • Medellín</p>
                        </div>
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
                  <Route className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-textPrimary">No Path Computed</h3>
                <p className="text-sm text-textSecondary max-w-sm mx-auto">
                  Select source and destination nodes, configure constraints, and click calculate to find the optimal path.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}