"use client";

import { MetricTile } from "@/components/ui/MetricTile";
import { ChartPanel } from "@/components/ui/ChartPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Server, Activity, AlertTriangle, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const trafficData = [
  { time: "00:00", traffic: 45, affected: 0 },
  { time: "02:00", traffic: 30, affected: 0 },
  { time: "04:00", traffic: 25, affected: 0 },
  { time: "06:00", traffic: 50, affected: 0 },
  { time: "08:00", traffic: 80, affected: 0 },
  { time: "10:00", traffic: 95, affected: 15 },
  { time: "12:00", traffic: 85, affected: 20 },
];

const availabilityData = [
  { name: "Core", value: 99.99 },
  { name: "Aggregation", value: 99.95 },
  { name: "Access", value: 99.8 },
  { name: "Microwave", value: 99.5 },
];

const recentAlarms = [
  { id: 1, node: "CORE-01", type: "Link Down", severity: "critical", time: "10 mins ago" },
  { id: 2, node: "AGG-N1", type: "High Utilization", severity: "major", time: "25 mins ago" },
  { id: 3, node: "DIST-W1", type: "Power Loss", severity: "critical", time: "1 hour ago" },
  { id: 4, node: "CORE-02", type: "BGP Flap", severity: "minor", time: "2 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Network Overview
        </h1>
        <div className="flex items-center gap-4">
          <StatusBadge status="normal" showLabel={true} />
          <span className="text-sm text-textSecondary">Last updated: Just now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricTile
          title="Total Nodes"
          value="1,248"
          icon={Server}
          trend={{ value: "12 new", isPositive: true }}
        />
        <MetricTile
          title="Active Links"
          value="3,842"
          icon={Network}
          trend={{ value: "5 down", isPositive: false }}
        />
        <MetricTile
          title="Network Throughput"
          value="84.2 Tbps"
          icon={Activity}
          trend={{ value: "12% vs yesterday", isPositive: true }}
        />
        <MetricTile
          title="Active Failures"
          value="7"
          icon={AlertTriangle}
          trend={{ value: "3 critical", isPositive: false }}
          className="border-danger/50 bg-danger/5"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartPanel title="Traffic Last 12h" className="lg:col-span-2 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAffected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}T`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#e2e8f0' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="traffic" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" />
              <Area type="monotone" dataKey="affected" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAffected)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Network Availability" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={availabilityData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" domain={[99, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: '#243041' }}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#e2e8f0' }}
              />
              <Bar dataKey="value" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-panel border border-border rounded-lg p-4">
          <h3 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-4">Recent Alarms</h3>
          <div className="space-y-3">
            {recentAlarms.map((alarm) => (
              <div key={alarm.id} className="flex items-center justify-between p-3 bg-panelSoft rounded-md border border-border/50 hover:border-border transition-colors">
                <div className="flex items-center gap-3">
                  <StatusBadge status={alarm.severity as any} showLabel={false} />
                  <div>
                    <p className="text-sm font-medium text-textPrimary">{alarm.node}</p>
                    <p className="text-xs text-textSecondary">{alarm.type}</p>
                  </div>
                </div>
                <span className="text-xs text-textSecondary">{alarm.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-panel border border-border rounded-lg p-4">
          <h3 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-4">Top Congested Links</h3>
          <div className="space-y-4">
            {[
              { link: "CORE-01 ↔ AGG-N1", util: 94, capacity: "100G" },
              { link: "AGG-S2 ↔ DIST-S4", util: 88, capacity: "10G" },
              { link: "CORE-02 ↔ CORE-03", util: 82, capacity: "400G" },
            ].map((link, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-textPrimary font-medium">{link.link}</span>
                  <span className="text-textSecondary">{link.util}% of {link.capacity}</span>
                </div>
                <div className="h-2 w-full bg-panelSoft rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      link.util > 90 ? "bg-danger" : link.util > 80 ? "bg-warning" : "bg-success"
                    )}
                    style={{ width: `${link.util}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}