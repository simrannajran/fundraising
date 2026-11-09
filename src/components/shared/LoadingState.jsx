import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoadingState({ label = "Loading", className, rows = 3 }) {
  return (
    <div className={cn("space-y-3", className)} aria-busy="true" aria-live="polite">
      <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" /> {label}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 animate-pulse rounded-xl bg-white/[0.04]" />
      ))}
    </div>
  );
}