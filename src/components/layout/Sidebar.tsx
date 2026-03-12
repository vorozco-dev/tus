"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Network,
  Map,
  Layers,
  Activity,
  BarChart3,
  Route,
  TrendingUp,
  AlertTriangle,
  BellRing,
  Server,
  RadioTower,
  Database,
  Code2,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Network",
    icon: Network,
    items: [
      { title: "Transport Topology", href: "/network/topology", icon: Network },
      { title: "Network Map", href: "/network/map", icon: Map },
      { title: "Multi-Layer View", href: "/network/layers", icon: Layers },
      { title: "Digital Twin", href: "/network/digital-twin", icon: Activity },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    items: [
      { title: "Capacity Analysis", href: "/analytics/capacity", icon: BarChart3 },
      { title: "Path Optimization", href: "/analytics/path", icon: Route },
      { title: "Capacity Forecast", href: "/analytics/forecast", icon: TrendingUp },
    ],
  },
  {
    title: "Operations",
    icon: AlertTriangle,
    items: [
      { title: "Service Impact", href: "/operations/impact", icon: AlertTriangle },
      { title: "Alarm Correlation", href: "/operations/alarms", icon: BellRing },
    ],
  },
  {
    title: "Infrastructure",
    icon: Server,
    items: [
      { title: "Transport Inventory", href: "/infrastructure/inventory", icon: Server },
      { title: "RAN Correlation", href: "/infrastructure/ran", icon: RadioTower },
    ],
  },
  {
    title: "Integration",
    icon: Database,
    items: [
      { title: "Data Sources", href: "/integration/data-sources", icon: Database },
      { title: "API Framework", href: "/integration/api", icon: Code2 },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-16 hover:w-64 transition-all duration-300 ease-in-out bg-panel border-r border-border h-screen flex flex-col group overflow-hidden z-50 fixed left-0 top-0">
      <div className="h-16 flex items-center justify-center group-hover:justify-start group-hover:px-4 border-b border-border shrink-0">
        <div className="w-8 h-8 bg-accentBlue/20 rounded flex items-center justify-center text-accentBlue shrink-0">
          <Network className="w-5 h-5" />
        </div>
        <span className="ml-3 font-bold text-textPrimary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          TUS NOC
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <nav className="space-y-6 px-2">
          {menuItems.map((section, i) => (
            <div key={i} className="space-y-1">
              {section.items ? (
                <>
                  <div className="px-2 py-2 flex items-center text-textSecondary group-hover:text-textPrimary transition-colors">
                    <section.icon className="w-5 h-5 shrink-0" />
                    <span className="ml-3 text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {section.title}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item, j) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={j}
                          href={item.href}
                          className={cn(
                            "flex items-center px-2 py-2 rounded-md transition-colors group/item relative",
                            isActive
                              ? "bg-accentBlue/10 text-accentBlue"
                              : "text-textSecondary hover:bg-panelSoft hover:text-textPrimary"
                          )}
                          title={item.title}
                        >
                          <div className="w-5 h-5 flex items-center justify-center shrink-0">
                            <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-accentBlue" : "bg-transparent group-hover/item:bg-textSecondary")} />
                          </div>
                          <span className="ml-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            {item.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </>
              ) : (
                <Link
                  href={section.href}
                  className={cn(
                    "flex items-center px-2 py-2 rounded-md transition-colors",
                    pathname === section.href
                      ? "bg-accentBlue/10 text-accentBlue"
                      : "text-textSecondary hover:bg-panelSoft hover:text-textPrimary"
                  )}
                  title={section.title}
                >
                  <section.icon className="w-5 h-5 shrink-0" />
                  <span className="ml-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {section.title}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-2 border-t border-border shrink-0">
        <Link
          href="/settings"
          className="flex items-center px-2 py-2 rounded-md text-textSecondary hover:bg-panelSoft hover:text-textPrimary transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="ml-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Settings
          </span>
        </Link>
      </div>
    </aside>
  );
}