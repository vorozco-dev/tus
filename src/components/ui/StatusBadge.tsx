import { cn } from "@/lib/utils";

type Status = "critical" | "major" | "minor" | "warning" | "normal" | "unknown";

interface StatusBadgeProps {
  status: Status;
  className?: string;
  showLabel?: boolean;
}

const statusConfig: Record<Status, { color: string; label: string }> = {
  critical: { color: "bg-danger", label: "Critical" },
  major: { color: "bg-warning", label: "Major" },
  minor: { color: "bg-accentBlue", label: "Minor" },
  warning: { color: "bg-warning", label: "Warning" },
  normal: { color: "bg-success", label: "Normal" },
  unknown: { color: "bg-textSecondary", label: "Unknown" },
};

export function StatusBadge({ status, className, showLabel = true }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.unknown;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]",
          config.color,
          status === "critical" && "animate-pulse shadow-danger/50"
        )}
      />
      {showLabel && (
        <span className="text-xs font-medium text-textSecondary uppercase tracking-wider">
          {config.label}
        </span>
      )}
    </div>
  );
}