import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmptyState({ title = "Nothing here yet", body, action, icon: Icon = Inbox, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 px-6 py-14 text-center", className)}>
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.04] text-muted-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-heading text-sm font-semibold text-white">{title}</p>
      {body && <p className="mt-1.5 max-w-sm text-[13px] text-muted-foreground">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}