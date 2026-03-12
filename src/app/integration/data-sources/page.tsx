"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Server, FileText, RefreshCw, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const dataSources = [
  {
    id: "nms-cisco",
    name: "Cisco EPNM",
    type: "NMS API",
    status: "connected",
    lastSync: "2 mins ago",
    records: "1,245 nodes",
    icon: Server,
  },
  {
    id: "nms-nokia",
    name: "Nokia NSP",
    type: "NMS API",
    status: "connected",
    lastSync: "5 mins ago",
    records: "850 nodes",
    icon: Server,
  },
  {
    id: "snmp-legacy",
    name: "Legacy SNMP Poller",
    type: "SNMP v3",
    status: "warning",
    lastSync: "15 mins ago",
    records: "320 nodes",
    icon: Database,
  },
  {
    id: "inventory-db",
    name: "Central Inventory DB",
    type: "PostgreSQL",
    status: "connected",
    lastSync: "1 hour ago",
    records: "15,420 links",
    icon: Database,
  },
  {
    id: "csv-import",
    name: "Manual Fiber Routes",
    type: "CSV Import",
    status: "offline",
    lastSync: "2 days ago",
    records: "45 routes",
    icon: FileText,
  },
];

export default function DataSourcesPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Data Sources Integration
        </h1>
        <div className="flex items-center gap-3">
          <Button className="bg-accentBlue text-background hover:bg-accentBlue/90">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6">
        {dataSources.map((source) => (
          <Card key={source.id} className="bg-panel border-border hover:border-border/80 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    source.status === "connected" ? "bg-success/10 text-success" :
                    source.status === "warning" ? "bg-warning/10 text-warning" :
                    "bg-textSecondary/10 text-textSecondary"
                  )}>
                    <source.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-textPrimary">{source.name}</CardTitle>
                    <p className="text-xs text-textSecondary">{source.type}</p>
                  </div>
                </div>
                {source.status === "connected" ? (
                  <Badge variant="outline" className="border-success text-success bg-success/10">Connected</Badge>
                ) : source.status === "warning" ? (
                  <Badge variant="outline" className="border-warning text-warning bg-warning/10">Degraded</Badge>
                ) : (
                  <Badge variant="outline" className="border-textSecondary text-textSecondary bg-textSecondary/10">Offline</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-textSecondary text-xs mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Last Sync
                    </p>
                    <p className="text-textPrimary font-medium">{source.lastSync}</p>
                  </div>
                  <div>
                    <p className="text-textSecondary text-xs mb-1 flex items-center gap-1">
                      <Database className="w-3 h-3" /> Records
                    </p>
                    <p className="text-textPrimary font-medium">{source.records}</p>
                  </div>
                </div>

                {source.status === "warning" && (
                  <div className="p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <p>High latency detected during last polling cycle. Some nodes may be missing data.</p>
                  </div>
                )}

                <div className="pt-4 border-t border-border flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-panelSoft border-border text-textPrimary hover:bg-border">
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-panelSoft border-border text-textPrimary hover:bg-border">
                    View Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Source Card */}
        <Card className="bg-panel border-border border-dashed hover:border-accentBlue/50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[250px] text-textSecondary hover:text-accentBlue group">
          <div className="w-12 h-12 rounded-full bg-panelSoft group-hover:bg-accentBlue/10 flex items-center justify-center mb-4 transition-colors">
            <span className="text-2xl">+</span>
          </div>
          <p className="font-medium">Add New Data Source</p>
          <p className="text-xs mt-1 opacity-70">Connect NMS, DB, or API</p>
        </Card>
      </div>
    </div>
  );
}