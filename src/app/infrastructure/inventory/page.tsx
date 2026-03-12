"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Server, Router, RadioTower } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";

const inventoryData = [
  { id: "CORE-01", type: "Core Router", vendor: "Cisco", model: "NCS 5500", region: "Bogotá", status: "normal", ip: "10.24.1.55" },
  { id: "CORE-02", type: "Core Router", vendor: "Cisco", model: "NCS 5500", region: "Medellín", status: "normal", ip: "10.24.1.56" },
  { id: "AGG-N1", type: "Aggregation", vendor: "Nokia", model: "7750 SR", region: "Norte", status: "warning", ip: "10.24.2.10" },
  { id: "AGG-C1", type: "Aggregation", vendor: "Nokia", model: "7750 SR", region: "Centro", status: "normal", ip: "10.24.2.11" },
  { id: "AGG-S1", type: "Aggregation", vendor: "Nokia", model: "7750 SR", region: "Sur", status: "normal", ip: "10.24.2.12" },
  { id: "DIST-W1", type: "Access", vendor: "Huawei", model: "ATN 910", region: "Suba", status: "critical", ip: "10.24.3.100" },
  { id: "DIST-E1", type: "Access", vendor: "Huawei", model: "ATN 910", region: "Usaquén", status: "normal", ip: "10.24.3.101" },
  { id: "DIST-C1", type: "Access", vendor: "Huawei", model: "ATN 910", region: "Chapinero", status: "normal", ip: "10.24.3.102" },
  { id: "DIST-S1", type: "Access", vendor: "Huawei", model: "ATN 910", region: "Kennedy", status: "normal", ip: "10.24.3.103" },
  { id: "MW-N1", type: "Microwave", vendor: "Ericsson", model: "MINI-LINK", region: "Norte", status: "normal", ip: "10.24.4.50" },
  { id: "MW-S1", type: "Microwave", vendor: "Ericsson", model: "MINI-LINK", region: "Sur", status: "warning", ip: "10.24.4.51" },
];

export default function TransportInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorFilter, setVendorFilter] = useState("all");

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.ip.includes(searchTerm);
    const matchesVendor = vendorFilter === "all" || item.vendor.toLowerCase() === vendorFilter.toLowerCase();
    return matchesSearch && matchesVendor;
  });

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          Transport Inventory
        </h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-panel border-border text-textPrimary hover:bg-panelSoft">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="flex-1 bg-panel border-border overflow-hidden flex flex-col">
        <CardHeader className="border-b border-border pb-4 shrink-0 flex flex-row items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
              <Input
                type="text"
                placeholder="Search by Node ID or IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-panelSoft border-border text-textPrimary pl-10 h-9"
              />
            </div>
            <Select value={vendorFilter} onValueChange={setVendorFilter}>
              <SelectTrigger className="w-[180px] bg-panelSoft border-border text-textPrimary h-9">
                <SelectValue placeholder="Filter by Vendor" />
              </SelectTrigger>
              <SelectContent className="bg-panel border-border text-textPrimary">
                <SelectItem value="all">All Vendors</SelectItem>
                <SelectItem value="cisco">Cisco</SelectItem>
                <SelectItem value="nokia">Nokia</SelectItem>
                <SelectItem value="huawei">Huawei</SelectItem>
                <SelectItem value="ericsson">Ericsson</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="bg-panelSoft border-border text-textPrimary h-9">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
          <div className="text-sm text-textSecondary">
            Showing <span className="font-bold text-textPrimary">{filteredData.length}</span> of {inventoryData.length} nodes
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-panelSoft sticky top-0 z-10">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="text-textSecondary">Node ID</TableHead>
                <TableHead className="text-textSecondary">Type</TableHead>
                <TableHead className="text-textSecondary">Vendor</TableHead>
                <TableHead className="text-textSecondary">Model</TableHead>
                <TableHead className="text-textSecondary">Region</TableHead>
                <TableHead className="text-textSecondary">IP Address</TableHead>
                <TableHead className="text-textSecondary">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((node) => (
                <TableRow key={node.id} className="border-border hover:bg-panelSoft transition-colors">
                  <TableCell>
                    {node.type === "Core Router" ? <Router className="w-4 h-4 text-accentBlue" /> :
                     node.type === "Aggregation" ? <Server className="w-4 h-4 text-success" /> :
                     <RadioTower className="w-4 h-4 text-textSecondary" />}
                  </TableCell>
                  <TableCell className="font-bold text-textPrimary">{node.id}</TableCell>
                  <TableCell className="text-textSecondary">{node.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-panelSoft border-border text-textPrimary">
                      {node.vendor}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-textSecondary">{node.model}</TableCell>
                  <TableCell className="text-textSecondary">{node.region}</TableCell>
                  <TableCell className="font-mono text-xs text-textPrimary">{node.ip}</TableCell>
                  <TableCell>
                    <StatusBadge status={node.status as any} />
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-textSecondary">
                    No nodes found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}