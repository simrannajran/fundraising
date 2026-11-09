import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Megaphone, DollarSign, Heart, Users, ClipboardCheck, ArrowUpRight, Activity } from "lucide-react";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import StatCard from "@/components/shared/StatCard";
import DataTable, { StatusPill } from "@/components/shared/DataTable";
import { AreaTrend, BarTrend } from "@/components/charts/Charts";
import DemoNotice from "@/components/shared/DemoNotice";
import { activity, campaigns, donations, growthSeries, schools, trendSeries } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_dash/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Overview — RampUp Fundraising" }] }),
  component: AdminDashboard,
});

const stats = [
  { label: "Total schools", value: "128", icon: Building2, delta: "12 this month", accent: true },
  { label: "Active campaigns", value: "346", icon: Megaphone, delta: "28 new" },
  { label: "Total funds raised", value: "$8.42M", icon: DollarSign, delta: "18.4%" },
  { label: "Total donations", value: "24,918", icon: Heart, delta: "1,204" },
  { label: "Total participants", value: "9,412", icon: Users, delta: "312" },
  { label: "Pending approvals", value: "7", icon: ClipboardCheck, note: "4 schools · 3 campaigns" },
];

function AdminDashboard() {
  return (
    <>
      <DashPageHeader
        title="Platform overview"
        subtitle="Every school, campaign and dollar across the RampUp network."
        actions={
          <>
            <Link to="/admin/reports" className="rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">Export report</Link>
            <Link to="/admin/schools" className="rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-primary/90">Review approvals</Link>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <AreaTrend
          title="Fundraising growth"
          data={growthSeries}
          yKey="raised"
          action={<span className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">Last 6 months</span>}
          height={260}
        />
        <BarTrend title="Donation trend (this week)" data={trendSeries} xKey="day" yKey="amount" height={260} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-[13.5px] font-semibold text-white">Recent school registrations</h2>
            <Link to="/admin/schools" className="inline-flex items-center gap-1 text-[11.5px] text-accent">All schools <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <DataTable
            dense
            columns={[
              { key: "name", label: "School", render: (r) => <span className="font-medium text-white">{r.name}</span> },
              { key: "city", label: "Location" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]}
            rows={schools.slice(0, 5)}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-[13.5px] font-semibold text-white">Recent campaigns</h2>
            <Link to="/admin/campaigns" className="inline-flex items-center gap-1 text-[11.5px] text-accent">All campaigns <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <DataTable
            dense
            columns={[
              { key: "title", label: "Campaign", render: (r) => <span className="font-medium text-white">{r.title}</span> },
              { key: "school", label: "School" },
              { key: "raised", label: "Raised", align: "right", render: (r) => <span className="font-mono">{formatCurrency(r.raised)}</span> },
            ]}
            rows={campaigns.slice(0, 5)}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-[13.5px] font-semibold text-white">Campaign performance</h2>
          <Link to="/admin/reports" className="inline-flex items-center gap-1 text-[11.5px] text-accent">Full report <ArrowUpRight className="h-3 w-3" /></Link>
        </div>
        <DataTable
          columns={[
            { key: "title", label: "Campaign", render: (r) => <div><p className="font-medium text-white">{r.title}</p><p className="text-[11px] text-muted-foreground">{r.school}</p></div> },
            { key: "category", label: "Category" },
            { key: "goal", label: "Goal", align: "right", render: (r) => <span className="font-mono">{formatCurrency(r.goal)}</span> },
            { key: "raised", label: "Raised", align: "right", render: (r) => <span className="font-mono text-white">{formatCurrency(r.raised)}</span> },
            { key: "progress", label: "Progress", render: (r) => (
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((r.raised / r.goal) * 100)}%` }} />
                </div>
                <span className="font-mono text-[11px]">{Math.round((r.raised / r.goal) * 100)}%</span>
              </div>
            ) },
            { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
          ]}
          rows={campaigns.slice(0, 5)}
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-[13.5px] font-semibold text-white">Recent donations</h2>
            <Link to="/admin/donations" className="inline-flex items-center gap-1 text-[11.5px] text-accent">All donations <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <DataTable
            dense
            columns={[
              { key: "donor", label: "Donor", render: (r) => <span className="font-medium text-white">{r.donor}</span> },
              { key: "campaign", label: "Campaign" },
              { key: "date", label: "Date", render: (r) => formatDate(r.date) },
              { key: "amount", label: "Amount", align: "right", render: (r) => <span className="font-mono text-accent">{formatCurrency(r.amount)}</span> },
            ]}
            rows={donations.slice(0, 6)}
          />
        </div>

        <div className="rounded-2xl border border-border/80 surface p-5">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <h2 className="font-heading text-[13.5px] font-semibold text-white">Activity feed</h2>
          </div>
          <ol className="mt-4 space-y-3.5">
            {activity.map((a) => (
              <li key={a.id} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                <div>
                  <p className="text-[12px] leading-relaxed text-silver">{a.text}</p>
                  <p className="mt-0.5 text-[10.5px] text-white/35">{a.time}</p>
                </div>
              </li>
            ))}
          </ol>
          <DemoNotice className="mt-4" />
        </div>
      </div>
    </>
  );
}