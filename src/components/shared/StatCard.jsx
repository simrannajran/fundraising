import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export default function StatCard({ label, value, icon: Icon, delta, note, accent = false, className }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/80 p-5 transition-colors hover:border-primary/40",
        accent ? "surface-2" : "surface",
        className
      )}
    >
      {accent && <div className="pointer-events-none absolute -right-10 -top-14 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />}
      <div className="relative flex items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        {Icon && (
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.04] text-primary ring-1 ring-inset ring-white/10">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
        )}
      </div>
      <p className="relative mt-4 font-heading text-2xl font-semibold tracking-tight text-white sm:text-[28px]">{value}</p>
      <div className="relative mt-2 flex items-center gap-2 text-xs">
        {delta && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 font-medium text-emerald-300">
            <ArrowUpRight className="h-3 w-3" /> {delta}
          </span>
        )}
        {note && <span className="text-muted-foreground">{note}</span>}
      </div>
    </div>
  );
}