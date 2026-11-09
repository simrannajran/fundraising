import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import { AreaTrend, BarTrend } from "@/components/charts/Charts";
import FilterDropdown from "@/components/shared/FilterDropdown";
import DataTable from "@/components/shared/DataTable";
import StatCard from "@/components/shared/StatCard";
import { DollarSign, TrendingUp, Users } from "lucide-react";
import { categoryPerformance, campaigns, growthSeries, trendSeries } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_dash/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — Admin" }] }),
  component: AdminReports,
});

function AdminReports() {
  const [range, setRange] = useState("Last 6 months");
  return (
    <>
      <DashPageHeader
        title="Reports"
        subtitle="Platform-wide performance, with date filters for board reporting."
        actions={
          <>
            <FilterDropdown label="Range" value={range} onChange={setRange} options={["Last 30 days", "Last 6 months", "Year to date", "All time"]} className="w-44" />
            <button type="button" className="rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">Download PDF</button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Funds raised" value={formatCurrency(growthSeries.reduce((a, b) => a + b.raised, 0))} icon={DollarSign} delta="18.4%" accent />
        <StatCard label="Donations" value={growthSeries.reduce((a, b) => a + b.donations, 0).toLocaleString("en-US")} icon={Users} delta="11.2%" />
        <StatCard label="Avg. goal completion" value="112%" icon={TrendingUp} delta="3.6 pts" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <AreaTrend title={`Fundraising · ${range}`} data={growthSeries} height={270} />
        <BarTrend title="Raised by category" data={categoryPerformance} xKey="name" yKey="raised" height={270} />
      </div>

      <div className="mt-4">
        <h2 className="mb-3 font-heading text-[13.5px] font-semibold text-white">Category detail</h2>
        <DataTable
          columns={[
            { key: "name", label: "Category", render: (r) => <span className="font-medium text-white">{r.name}</span> },
            { key: "raised", label: "Raised", align: "right", render: (r) => <span className="font-mono">{formatCurrency(r.raised)}</span> },
            { key: "target", label: "Target", align: "right", render: (r) => <span className="font-mono text-muted-foreground">{formatCurrency(r.target)}</span> },
            { key: "attainment", label: "Attainment", render: (r) => <span className="font-mono text-accent">{percent(r.raised, r.target)}%</span> },
          ]}
          rows={categoryPerformance.map((c) => ({ ...c, id: c.name }))}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-border/80 surface p-5">
        <h2 className="font-heading text-[13.5px] font-semibold text-white">Weekly donation pace</h2>
        <div className="mt-4">
          <BarTrend title="" data={trendSeries} xKey="day" yKey="amount" height={220} />
        </div>
        <p className="mt-3 text-[11.5px] text-muted-foreground">
          {campaigns.length} campaigns included in this window · figures are demonstration data.
        </p>
      </div>
    </>
  );
}