import { cn } from "@/lib/utils";

export default function DataTable({ columns, rows, empty = "No records found.", dense = false }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 surface">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border/80 bg-white/[0.02]">
              {columns.map((c) => (
                <th key={c.key} className={cn("whitespace-nowrap px-4 py-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground", c.align === "right" && "text-right")}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-[13px] text-muted-foreground">
                  {empty}
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr key={row.id ?? i} className="border-b border-border/50 last:border-0 transition-colors hover:bg-white/[0.025]">
                {columns.map((c) => (
                  <td key={c.key} className={cn(dense ? "px-4 py-2.5" : "px-4 py-3.5", "text-[13px] text-silver", c.align === "right" && "text-right")}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusPill({ status }) {
  const tone =
    {
      Active: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25",
      Verified: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25",
      Settled: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25",
      Paid: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25",
      Accepted: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25",
      "Almost funded": "bg-amber-400/10 text-amber-300 ring-amber-400/25",
      Processing: "bg-amber-400/10 text-amber-300 ring-amber-400/25",
      Pending: "bg-amber-400/10 text-amber-300 ring-amber-400/25",
      "Pending review": "bg-amber-400/10 text-amber-300 ring-amber-400/25",
      "In review": "bg-amber-400/10 text-amber-300 ring-amber-400/25",
      New: "bg-primary/15 text-accent ring-primary/30",
      Answered: "bg-sky-400/10 text-sky-300 ring-sky-400/25",
      Invited: "bg-primary/10 text-accent ring-primary/25",
    }[status] || "bg-white/[0.05] text-muted-foreground ring-white/10";
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] ring-1 ring-inset", tone)}>{status}</span>;
}