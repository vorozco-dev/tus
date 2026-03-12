"use client";

import { Bell, Search, User, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-16 bg-panel border-b border-border flex items-center justify-between px-6 sticky top-0 z-40 ml-16">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <Input
            type="text"
            placeholder="Search nodes, links, alarms..."
            className="w-full bg-panelSoft border-border text-textPrimary pl-10 focus-visible:ring-accentBlue"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="flex h-2 w-2 rounded-full bg-success animate-pulse"></span>
          <span className="text-textSecondary font-medium">System Status:</span>
          <span className="text-success font-bold">Optimal</span>
        </div>

        <div className="h-6 w-px bg-border"></div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-textSecondary hover:text-textPrimary hover:bg-panelSoft">
            <Activity className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative text-textSecondary hover:text-textPrimary hover:bg-panelSoft">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-danger text-white border-none">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-panelSoft text-accentBlue hover:bg-accentBlue/20 hover:text-accentBlue">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}