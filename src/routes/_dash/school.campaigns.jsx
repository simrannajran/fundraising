import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable, { StatusPill } from "@/components/shared/DataTable";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { campaigns } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_dash/school/campaigns")({
  head: () => ({ meta: [{ title: "Campaigns — School" }] }),
  component: SchoolCampaigns,
});

function SchoolCampaigns() {
  return (
    <>
      <DashPageHeader
        title="Campaigns"
        subtitle="Everything your school is raising for this season."
        actions={
          <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-primary/90">
            <Plus className="h-3.5 w-3.5" /> Create campaign
          </button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {campaigns.slice(0, 4).map((c) => (
          <div key={c.id} className="rounded-2xl border border-border/80 surface p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{c.category}</span>
              <StatusPill status={c.status} />
            </div>
            <h3 className="mt-2.5 line-clamp-2 font-heading text-[13.5px] font-semibold leading-snug text-white">{c.title}</h3>
            <p className="mt-2 font-heading text-lg font-semibold text-white">{formatCurrency(c.raised)}</p>
            <p className="text-[10.5px] text-muted-foreground">of {formatCurrency(c.goal)} · ends {c.deadline}</p>
            <ProgressBar className="mt-2.5 h-1.5" raised={c.raised} goal={c.goal} />
            <div className="mt-2 flex items-center justify-between text-[10.5px]">
              <span className="font-mono text-accent">{percent(c.raised, c.goal)}%</span>
              <Link to="/campaign/$slug" params={{ slug: c.slug }} className="font-semibold text-silver hover:text-white">View page →</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h2 className="mb-3 font-heading text-[13.5px] font-semibold text-white">All campaigns</h2>
        <DataTable
          columns={[
            { key: "title", label: "Campaign", render: (r) => <Link to="/campaign/$slug" params={{ slug: r.slug }} className="font-medium text-white hover:text-accent">{r.title}</Link> },
            { key: "category", label: "Category" },
            { key: "raised", label: "Raised", align: "right", render: (r) => <span className="font-mono">{formatCurrency(r.raised)}</span> },
            { key: "goal", label: "Goal", align: "right", render: (r) => <span className="font-mono text-muted-foreground">{formatCurrency(r.goal)}</span> },
            { key: "supporters", label: "Donors", align: "right" },
            { key: "deadline", label: "Ends" },
            { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
          ]}
          rows={campaigns}
        />
      </div>
    </>
  );
}