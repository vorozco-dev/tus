"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BellRing, Search, Filter, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const alarms = [
  { id: "ALM-1042", severity: "critical", node: "DIST-W1", type: "Loss of Signal (LOS)", time: "10:42:15", status: "active", rootCause: true },
  { id: "ALM-1043", severity: "major", node: "AGG-N1", type: "BGP Peer Down", time: "10:42:18", status: "active", rootCause: false },
  { id: "ALM-1044", severity: "major", node: "CORE-01", type: "High CPU Utilization", time: "10:45:00", status: "active", rootCause: false },
  { id: "ALM-1045", severity: "minor", node: "DIST-E1", type: "Fan Tray Failure", time: "11:15:22", status: "active", rootCause: false },
  { id: "ALM-1046", severity: "warning", node: "AGG-S1", type: "Link Utilization > 80%", time: "11:30:05", status: "active", rootCause: false },
  { id: "ALM-1047", severity: "critical", node: "CORE-02", type: "Power Supply Failure", time: "12:05:10", status: "cleared", rootCause: true },
  { id: "ALM-1048", severity: "minor", node: "DIST-C1", type: "Temperature High", time: "12:10:00", status: "cleared", rootCause: false },
];

export default function AlarmCorrelationPage() {
  const [selectedAlarm, setSelectedAlarm] = useState<any>(alarms[0]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Alarm Correlation
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-panel border border-border rounded-md px-3 py-1.5">
            <StatusBadge status="critical" showLabel={false} />
            <span className="text-sm font-bold text-textPrimary">2</span>
            <span className="text-xs text-textSecondary mx-2">|</span>
            <StatusBadge status="major" showLabel={false} />
            <span className="text-sm font-bold text-textPrimary">5</span>
            <span className="text-xs text-textSecondary mx-2">|</span>
            <StatusBadge status="minor" showLabel={false} />
            <span className="text-sm font-bold text-textPrimary">12</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <Card className="flex-1 bg-panel border-border overflow-hidden flex flex-col">
          <CardHeader className="border-b border-border pb-4 shrink-0 flex flex-row items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
                <Input
                  type="text"
                  placeholder="Search alarms..."
                  className="w-full bg-panelSoft border-border text-textPrimary pl-10 h-9"
                />
              </div>
              <Button variant="outline" size="sm" className="bg-panelSoft border-border text-textPrimary h-9">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-danger/10 text-danger border-danger/20 cursor-pointer hover:bg-danger/20">Critical</Badge>
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 cursor-pointer hover:bg-warning/20">Major</Badge>
              <Badge variant="outline" className="bg-accentBlue/10 text-accentBlue border-accentBlue/20 cursor-pointer hover:bg-accentBlue/20">Minor</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-auto">
            <Table>
              <TableHeader className="bg-panelSoft sticky top-0 z-10">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-[100px] text-textSecondary">Severity</TableHead>
                  <TableHead className="text-textSecondary">Alarm ID</TableHead>
                  <TableHead className="text-textSecondary">Node</TableHead>
                  <TableHead className="text-textSecondary">Type</TableHead>
                  <TableHead className="text-textSecondary">Time</TableHead>
                  <TableHead className="text-textSecondary">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alarms.map((alarm) => (
                  <TableRow 
                    key={alarm.id} 
                    className={cn(
                      "border-border cursor-pointer transition-colors",
                      selectedAlarm?.id === alarm.id ? "bg-accentBlue/5" : "hover:bg-panelSoft",
                      alarm.status === "cleared" && "opacity-50"
                    )}
                    onClick={() => setSelectedAlarm(alarm)}
                  >
                    <TableCell>
                      <StatusBadge status={alarm.severity as any} showLabel={false} />
                    </TableCell>
                    <TableCell className="font-mono text-xs text-textPrimary">{alarm.id}</TableCell>
                    <TableCell className="font-medium text-textPrimary">{alarm.node}</TableCell>
                    <TableCell className="text-textSecondary">{alarm.type}</TableCell>
                    <TableCell className="text-textSecondary text-xs">{alarm.time}</TableCell>
                    <TableCell>
                      {alarm.status === "active" ? (
                        <Badge variant="outline" className="border-danger text-danger bg-danger/10 text-[10px]">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="border-success text-success bg-success/10 text-[10px]">Cleared</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedAlarm && (
          <Card className="w-96 bg-panel border-border shrink-0 overflow-y-auto flex flex-col animate-in slide-in-from-right-4 duration-300">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-lg font-bold text-textPrimary font-mono">
                  {selectedAlarm.id}
                </CardTitle>
                <StatusBadge status={selectedAlarm.severity as any} />
              </div>
              <p className="text-sm font-medium text-textPrimary">{selectedAlarm.type}</p>
              <p className="text-xs text-textSecondary">{selectedAlarm.node} • {selectedAlarm.time}</p>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              
              {selectedAlarm.rootCause && (
                <div className="p-3 bg-danger/10 border border-danger/30 rounded-md flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-danger">Root Cause Identified</p>
                    <p className="text-xs text-danger/80 mt-1">
                      This alarm is the likely root cause for 3 other correlated alarms in the topology.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Correlated Alarms</h4>
                {selectedAlarm.rootCause ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-panelSoft rounded border border-border text-xs">
                      <span className="text-textPrimary font-mono">ALM-1043</span>
                      <span className="text-textSecondary">BGP Peer Down</span>
                      <StatusBadge status="major" showLabel={false} />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-panelSoft rounded border border-border text-xs">
                      <span className="text-textPrimary font-mono">ALM-1050</span>
                      <span className="text-textSecondary">OSPF Neighbor Loss</span>
                      <StatusBadge status="major" showLabel={false} />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-panelSoft rounded border border-border text-xs">
                      <span className="text-textPrimary font-mono">ALM-1055</span>
                      <span className="text-textSecondary">Service Degradation</span>
                      <StatusBadge status="minor" showLabel={false} />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-textSecondary italic">No correlated alarms found.</p>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Suggested Actions</h4>
                <ul className="list-disc list-inside text-sm text-textPrimary space-y-1">
                  <li>Verify physical fiber connection on port Gi0/0/1.</li>
                  <li>Check optical power levels (Tx/Rx).</li>
                  <li>Dispatch field technician to site if LOS persists.</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border flex gap-2">
                <Button className="flex-1 bg-accentBlue text-background hover:bg-accentBlue/90">
                  Acknowledge
                </Button>
                <Button variant="outline" className="flex-1 bg-panel border-border text-textPrimary hover:bg-panelSoft">
                  Create Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}