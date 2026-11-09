import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Heart, Megaphone, ArrowUpRight, UserCircle } from "lucide-react";
import { toast } from "sonner";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import StatCard from "@/components/shared/StatCard";
import DataTable from "@/components/shared/DataTable";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { campaigns, donorHistory } from "@/data/mock";
import { formatCurrency, formatDate, percent } from "@/lib/format";

export const Route = createFileRoute("/_dash/donor/dashboard")({
  head: () => ({ meta: [{ title: "Donor Dashboard — RampUp" }] }),
  component: DonorDashboard,
});

function DonorDashboard() {
  const total = donorHistory.reduce((a, d) => a + d.amount, 0);
  const supported = campaigns.slice(0, 3);
  return (
    <>
      <DashPageHeader
        title="Welcome back, Jordan"
        subtitle="Your giving history and the campaigns you're supporting."
        actions={
          <Link to="/donor/profile" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">
            <UserCircle className="h-3.5 w-3.5" /> Profile settings
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total donated" value={formatCurrency(total)} icon={Heart} delta="2 gifts this month" accent />
        <StatCard label="Campaigns supported" value={donorHistory.length} icon={Megaphone} note="across 4 schools" />
        <StatCard label="Recurring gifts" value="1" icon={Download} note="monthly · $25" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-[13.5px] font-semibold text-white">Donation history</h2>
            <Link to="/campaigns" className="inline-flex items-center gap-1 text-[11.5px] text-accent">Find a cause <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <DataTable
            columns={[
              { key: "campaign", label: "Campaign", render: (r) => <div><p className="font-medium text-white">{r.campaign}</p><p className="text-[11px] text-muted-foreground">{r.school}</p></div> },
              { key: "date", label: "Date", render: (r) => formatDate(r.date) },
              { key: "amount", label: "Amount", align: "right", render: (r) => <span className="font-mono text-accent">{formatCurrency(r.amount)}</span> },
              { key: "receipt", label: "Receipt", align: "right", render: (r) => (
                <button type="button" onClick={() => toast("Receipt preview", { description: `PDF generation is not connected (${r.receipt}).` })} className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[10.5px] font-medium text-silver hover:text-white">
                  <Download className="h-3 w-3" /> PDF
                </button>
              ) },
            ]}
            rows={donorHistory}
          />
        </div>

        <div>
          <h2 className="mb-3 font-heading text-[13.5px] font-semibold text-white">Campaigns you support</h2>
          <div className="space-y-2">
            {supported.map((c) => (
              <Link key={c.id} to="/campaign/$slug" params={{ slug: c.slug }} className="block rounded-xl border border-border/70 surface p-3.5 hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <img src={c.cover} alt="" className="h-11 w-11 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold text-white">{c.title}</p>
                    <p className="text-[10.5px] text-muted-foreground">{c.school}</p>
                  </div>
                  <span className="font-mono text-[10.5px] text-accent">{percent(c.raised, c.goal)}%</span>
                </div>
                <ProgressBar className="mt-2.5 h-1.5" raised={c.raised} goal={c.goal} />
              </Link>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-primary/25 bg-primary/[0.06] p-4">
            <p className="text-[12.5px] font-semibold text-white">Give again in one tap</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-silver/80">Your saved details make repeat gifts faster. Payment methods are not stored in this prototype.</p>
            <Link to="/campaigns" className="mt-3 inline-block rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-white">Browse campaigns</Link>
          </div>
        </div>
      </div>
    </>
  );
}