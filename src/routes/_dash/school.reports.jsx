import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import { AreaTrend, BarTrend } from "@/components/charts/Charts";
import FilterDropdown from "@/components/shared/FilterDropdown";
import DataTable from "@/components/shared/DataTable";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { campaigns, categoryPerformance, growthSeries, teams } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_dash/school/reports")({
  head: () => ({ meta: [{ title: "Reports — School" }] }),
  component: SchoolReports,
});

function SchoolReports() {
  const [range, setRange] = useState("Last 6 months");
  const [tab, setTab] = useState("Campaigns");
  return (
    <>
      <DashPageHeader
        title="Reports"
        subtitle="Board-ready numbers for every campaign, team and donor."
        actions={
          <>
            <FilterDropdown label="Range" value={range} onChange={setRange} options={["Last 30 days", "Last 6 months", "Year to date", "All time"]} className="w-44" />
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
          </>
        }
      />

      <div className="mb-4 flex gap-1.5">
        {["Campaigns", "Teams", "Donors"].map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-lg border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${tab === t ? "border-primary bg-primary/15 text-white" : "border-border text-muted-foreground hover:text-white"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <AreaTrend title={`Fundraising · ${range}`} data={growthSeries} height={260} />
        <BarTrend title="Raised by category" data={categoryPerformance} xKey="name" yKey="raised" height={260} />
      </div>

      <div className="mt-4">
        {tab === "Campaigns" && (
          <DataTable
            columns={[
              { key: "title", label: "Campaign", render: (r) => <span className="font-medium text-white">{r.title}</span> },
              { key: "raised", label: "Raised", align: "right", render: (r) => <span className="font-mono">{formatCurrency(r.raised)}</span> },
              { key: "goal", label: "Goal", align: "right", render: (r) => <span className="font-mono text-muted-foreground">{formatCurrency(r.goal)}</span> },
              { key: "supporters", label: "Donors", align: "right" },
              { key: "progress", label: "Completion", render: (r) => (
                <div className="w-28">
                  <ProgressBar className="h-1.5" raised={r.raised} goal={r.goal} />
                  <span className="mt-1 block font-mono text-[10.5px] text-muted-foreground">{percent(r.raised, r.goal)}%</span>
                </div>
              ) },
            ]}
            rows={campaigns}
          />
        )}
        {tab === "Teams" && (
          <DataTable
            columns={[
              { key: "name", label: "Team", render: (r) => <span className="font-medium text-white">{r.name}</span> },
              { key: "participants", label: "Participants", align: "right" },
              { key: "raised", label: "Raised", align: "right", render: (r) => <span className="font-mono">{formatCurrency(r.raised)}</span> },
              { key: "goal", label: "Goal", align: "right", render: (r) => <span className="font-mono text-muted-foreground">{formatCurrency(r.goal)}</span> },
              { key: "progress", label: "Completion", render: (r) => <span className="font-mono text-accent">{percent(r.raised, r.goal)}%</span> },
            ]}
            rows={teams}
          />
        )}
        {tab === "Donors" && (
          <div className="rounded-2xl border border-border/80 surface p-5 text-[12.5px] text-muted-foreground">
            Donor detail report — 1,842 unique donors, 68% repeat givers, average gift $158. Export this view to share with your board.
          </div>
        )}
      </div>
    </>
  );
}