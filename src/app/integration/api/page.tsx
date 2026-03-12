"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Copy, CheckCircle2, Terminal, FileJson } from "lucide-react";
import { cn } from "@/lib/utils";

const endpoints = [
  {
    id: "get-topology",
    method: "GET",
    path: "/api/v1/topology",
    description: "Retrieve the full network topology including nodes and links.",
    params: [
      { name: "region", type: "string", required: false, desc: "Filter by region (e.g., 'Bogotá')" },
      { name: "layer", type: "string", required: false, desc: "Filter by layer ('physical', 'transport', 'logical')" },
    ],
    response: `{
  "nodes": [
    { "id": "CORE-01", "type": "core", "region": "Bogotá" },
    ...
  ],
  "links": [
    { "source": "CORE-01", "target": "CORE-02", "capacity": "400G" },
    ...
  ]
}`
  },
  {
    id: "get-capacity",
    method: "GET",
    path: "/api/v1/capacity/links",
    description: "Get current utilization metrics for all network links.",
    params: [
      { name: "threshold", type: "number", required: false, desc: "Return only links above this utilization %" },
    ],
    response: `{
  "data": [
    { "linkId": "LNK-1042", "utilization": 85.4, "trend": "up" },
    ...
  ]
}`
  },
  {
    id: "post-simulate",
    method: "POST",
    path: "/api/v1/simulate/failure",
    description: "Run a digital twin simulation for a specific failure scenario.",
    params: [
      { name: "type", type: "string", required: true, desc: "'node' or 'link'" },
      { name: "targetId", type: "string", required: true, desc: "ID of the element to fail" },
    ],
    response: `{
  "simulationId": "sim_987654321",
  "status": "completed",
  "impact": {
    "isolatedNodes": ["DIST-W1"],
    "affectedServices": 450,
    "reroutedTraffic": "12.4G"
  }
}`
  }
];

export default function APIFrameworkPage() {
  const [activeEndpoint, setActiveEndpoint] = useState(endpoints[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-textPrimary tracking-tight">
          API Framework
        </h1>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-panelSoft border-border text-textSecondary">
            <Code2 className="w-3 h-3 mr-1" />
            v1.0.0
          </Badge>
          <Button variant="outline" className="bg-panel border-border text-textPrimary hover:bg-panelSoft">
            Generate API Key
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Sidebar Navigation */}
        <Card className="w-80 bg-panel border-border shrink-0 overflow-y-auto flex flex-col">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg font-bold text-textPrimary">
              Endpoints
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            <div className="flex flex-col">
              {endpoints.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => setActiveEndpoint(ep)}
                  className={cn(
                    "flex items-center gap-3 p-4 text-left border-b border-border transition-colors hover:bg-panelSoft",
                    activeEndpoint.id === ep.id ? "bg-panelSoft border-l-2 border-l-accentBlue" : "border-l-2 border-l-transparent"
                  )}
                >
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "w-14 justify-center text-[10px] font-bold",
                      ep.method === "GET" ? "border-accentBlue text-accentBlue bg-accentBlue/10" :
                      ep.method === "POST" ? "border-success text-success bg-success/10" :
                      "border-warning text-warning bg-warning/10"
                    )}
                  >
                    {ep.method}
                  </Badge>
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium text-textPrimary truncate">{ep.path}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="flex-1 bg-panel border-border overflow-hidden flex flex-col">
          <CardHeader className="border-b border-border pb-4 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs font-bold",
                  activeEndpoint.method === "GET" ? "border-accentBlue text-accentBlue bg-accentBlue/10" :
                  activeEndpoint.method === "POST" ? "border-success text-success bg-success/10" :
                  "border-warning text-warning bg-warning/10"
                )}
              >
                {activeEndpoint.method}
              </Badge>
              <h2 className="text-xl font-mono text-textPrimary">{activeEndpoint.path}</h2>
            </div>
            <p className="text-sm text-textSecondary">{activeEndpoint.description}</p>
          </CardHeader>
          
          <CardContent className="p-6 flex-1 overflow-y-auto space-y-8">
            
            {/* Parameters */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider flex items-center gap-2">
                <FileJson className="w-4 h-4 text-textSecondary" /> Parameters
              </h3>
              <div className="border border-border rounded-md overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-panelSoft text-textSecondary text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Required</th>
                      <th className="px-4 py-3 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {activeEndpoint.params.map((param, i) => (
                      <tr key={i} className="hover:bg-panelSoft/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-accentBlue">{param.name}</td>
                        <td className="px-4 py-3 text-textSecondary">{param.type}</td>
                        <td className="px-4 py-3">
                          {param.required ? (
                            <Badge variant="outline" className="border-danger text-danger bg-danger/10 text-[10px]">Yes</Badge>
                          ) : (
                            <span className="text-textSecondary text-xs">No</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-textPrimary">{param.desc}</td>
                      </tr>
                    ))}
                    {activeEndpoint.params.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-4 text-center text-textSecondary italic">No parameters required.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Code Examples */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-textSecondary" /> Example Request
              </h3>
              <Tabs defaultValue="curl" className="w-full">
                <TabsList className="bg-panelSoft border border-border p-1">
                  <TabsTrigger value="curl" className="data-[state=active]:bg-panel data-[state=active]:text-textPrimary text-textSecondary">cURL</TabsTrigger>
                  <TabsTrigger value="js" className="data-[state=active]:bg-panel data-[state=active]:text-textPrimary text-textSecondary">JavaScript</TabsTrigger>
                  <TabsTrigger value="python" className="data-[state=active]:bg-panel data-[state=active]:text-textPrimary text-textSecondary">Python</TabsTrigger>
                </TabsList>
                
                <div className="relative mt-2 group">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-panelSoft/50 hover:bg-panelSoft text-textSecondary hover:text-textPrimary z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(`curl -X ${activeEndpoint.method} https://api.tus.local${activeEndpoint.path} -H "Authorization: Bearer YOUR_API_KEY"`)}
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  
                  <TabsContent value="curl" className="m-0">
                    <pre className="bg-[#0f172a] p-4 rounded-md border border-border overflow-x-auto text-sm font-mono text-textPrimary">
                      <span className="text-accentBlue">curl</span> -X {activeEndpoint.method} \<br/>
                      {'  '}https://api.tus.local{activeEndpoint.path} \<br/>
                      {'  '}-H <span className="text-success">"Authorization: Bearer YOUR_API_KEY"</span>
                      {activeEndpoint.method === "POST" && (
                        <><br/>{'  '}-H <span className="text-success">"Content-Type: application/json"</span> \<br/>
                        {'  '}-d <span className="text-success">'{`{"type":"link","targetId":"LNK-1042"}`}'</span></>
                      )}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="js" className="m-0">
                    <pre className="bg-[#0f172a] p-4 rounded-md border border-border overflow-x-auto text-sm font-mono text-textPrimary">
                      <span className="text-accentBlue">fetch</span>(<span className="text-success">'https://api.tus.local{activeEndpoint.path}'</span>, {'{\n'}
                      {'  '}method: <span className="text-success">'{activeEndpoint.method}'</span>,\n
                      {'  '}headers: {'{\n'}
                      {'    '}<span className="text-success">'Authorization'</span>: <span className="text-success">'Bearer YOUR_API_KEY'</span>
                      {activeEndpoint.method === "POST" && <>{',\n    <span className="text-success">\'Content-Type\'</span>: <span className="text-success">\'application/json\'</span>'}</>}
                      {'\n  }'}
                      {activeEndpoint.method === "POST" && <>{',\n  body: JSON.<span className="text-accentBlue">stringify</span>({ type: <span className="text-success">\'link\'</span>, targetId: <span className="text-success">\'LNK-1042\'</span> })'}</>}
                      {'\n}'})
                      {'\n  '}.<span className="text-accentBlue">then</span>(res => res.<span className="text-accentBlue">json</span>())
                      {'\n  '}.<span className="text-accentBlue">then</span>(console.<span className="text-accentBlue">log</span>);
                    </pre>
                  </TabsContent>

                  <TabsContent value="python" className="m-0">
                    <pre className="bg-[#0f172a] p-4 rounded-md border border-border overflow-x-auto text-sm font-mono text-textPrimary">
                      <span className="text-warning">import</span> requests\n\n
                      url = <span className="text-success">"https://api.tus.local{activeEndpoint.path}"</span>\n
                      headers = {'{"Authorization": "Bearer YOUR_API_KEY"}'}\n
                      {activeEndpoint.method === "POST" && <>payload = {'{"type": "link", "targetId": "LNK-1042"}'}\n</>}
                      \n
                      response = requests.<span className="text-accentBlue">{activeEndpoint.method.toLowerCase()}</span>(url, headers=headers{activeEndpoint.method === "POST" ? ", json=payload" : ""})\n
                      <span className="text-warning">print</span>(response.json())
                    </pre>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Response Example */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-textSecondary" /> Example Response
              </h3>
              <div className="relative group">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-panelSoft/50 hover:bg-panelSoft text-textSecondary hover:text-textPrimary z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleCopy(activeEndpoint.response)}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </Button>
                <pre className="bg-[#0f172a] p-4 rounded-md border border-border overflow-x-auto text-sm font-mono text-textPrimary">
                  {activeEndpoint.response}
                </pre>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}