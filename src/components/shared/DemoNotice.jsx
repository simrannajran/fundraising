import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoNotice({ children = "Demonstration data — no live payments are processed in this prototype.", className }) {
  return (
    <div className={cn("flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/[0.06] px-3.5 py-2.5", className)}>
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
      <p className="text-[11.5px] leading-relaxed text-silver/85">{children}</p>
    </div>
  );
}