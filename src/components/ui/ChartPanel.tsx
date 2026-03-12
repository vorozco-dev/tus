import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function ChartPanel({ title, children, className, action }: ChartPanelProps) {
  return (
    <Card className={cn("bg-panel border-border flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-textSecondary uppercase tracking-wider">
          {title}
        </CardTitle>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        {children}
      </CardContent>
    </Card>
  );
}