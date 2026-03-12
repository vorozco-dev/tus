"use client";

import { ChartPanel } from "@/components/ui/ChartPanel";
import { MetricTile } from "@/components/ui/MetricTile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, TrendingUp, AlertTriangle, Server } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const utilizationData = [
  { time: "00:00", core: 45, agg: 30, access: 20 },
  { time: "04:00", core: 35, agg: 25, access: 15 },
  { time: "08:00", core: 75, agg: 60, access: 45 },
  { time: "12:00", core: 85, agg: 70, access: 55 },
  { time: "16:00", core: 92, agg: 80, access: 65 },
  { time: "20:00", core: 88, agg: 75, access: 60 },
  { time: "24:00", core: 50, agg: 35, access: 25 },
];

const heatmapData = [
  { link: "CORE-01 ↔ CORE-02", util: 92 },
  { link: "CORE-01 ↔ AGG-N1", util: 85 },
  { link: "CORE-02 ↔ AGG-C1", util: 78 },
  { link: "AGG-N1 ↔ DIST-W1", util: 65 },
  { link: "AGG-C1 ↔ DIST-C1", util: 45 },
  { link: "AGG-S1 ↔ DIST-S1", util: 30 },
];

export default function CapacityAnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Capacity Analytics
        </h1>
        <div className="flex items-center gap-3">
          <Select defaultValue="24h">
            <SelectTrigger className="w-[150px] bg-panel border-border text-textPrimary">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-panel border-border text-textPrimary">
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricTile
          title="Avg Core Utilization"
          value="78%"
          icon={Activity}
          trend={{ value: "5% vs last week", isPositive: false }}
        />
        <MetricTile
          title="Peak Traffic"
          value="112 Tbps"
          icon={TrendingUp}
          trend={{ value: "New peak", isPositive: true }}
        />
        <MetricTile
          title="Congested Links (>80%)"
          value="14"
          icon={AlertTriangle}
          trend={{ value: "2 new", isPositive: false }}
          className="border-warning/50 bg-warning/5"
        />
        <MetricTile
          title="Total Capacity"
          value="250 Tbps"
          icon={Server}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartPanel title="Network Utilization Trends" className="lg:col-span-2 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={utilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#e2e8f0' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Line type="monotone" dataKey="core" name="Core" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="agg" name="Aggregation" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="access" name="Access" stroke="#38bdf8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Link Utilization Heatmap" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={heatmapData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="link" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={100} />
              <Tooltip
                cursor={{ fill: '#243041' }}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#e2e8f0' }}
                formatter={(value: any) => [`${value}%`, 'Utilization']}
              />
              <Bar dataKey="util" radius={[0, 4, 4, 0]} barSize={20}>
                {heatmapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.util > 80 ? '#ef4444' : entry.util > 60 ? '#f59e0b' : '#22c55e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
    </div>
  );
}