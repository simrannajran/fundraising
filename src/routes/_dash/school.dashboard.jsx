import { createFileRoute, Link } from "@tanstack/react-router";
import { DollarSign, Megaphone, Heart, Users, Plus, Trophy, Send, BarChart3, ArrowUpRight, Activity } from "lucide-react";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import StatCard from "@/components/shared/StatCard";
import { AreaTrend } from "@/components/charts/Charts";
import { RecentDonations } from "@/components/shared/DonationCard";
import { ProgressBar } from "@/components/shared/ProgressBar";
import DemoNotice from "@/components/shared/DemoNotice";
import { activity, campaigns, donations, growthSeries, teams } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_dash/school/dashboard")({
  head: () => ({ meta: [{ title: "School Overview — RampUp Fundraising" }] }),
  component: SchoolDashboard,
});

const quickActions = [
  { label: "Create Campaign", icon: Plus, to: "/school/campaigns" },
  { label: "Add Team", icon: Trophy, to: "/school/teams" },
  { label: "Invite Participants", icon: Send, to: "/school/invitations" },
  { label: "View Reports", icon: BarChart3, to: "/school/reports" },
];

function SchoolDashboard() {
  const schoolCampaigns = campaigns.slice(0, 4);
  return (
    <>
      <DashPageHeader
        title="Good evening, Diane"
        subtitle="Northgate High School · 4 active campaigns · next payout Nov 15"
        actions={<Link to="/school/campaigns" className="rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-primary/90">Create campaign</Link>}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total raised" value="$184,500" icon={DollarSign} delta="18.2%" accent />
        <StatCard label="Active campaigns" value="4" icon={Megaphone} note="1 closing this month" />
        <StatCard label="Total donors" value="1,842" icon={Heart} delta="124" />
        <StatCard label="Total participants" value="146" icon={Users} delta="18" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <AreaTrend
          title="Fundraising performance"
          data={growthSeries}
          height={250}
          action={<span className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">Last 6 months</span>}
        />
        <div className="rounded-2xl border border-border/80 surface p-5">
          <h2 className="font-heading text-[13.5px] font-semibold text-white">Quick actions</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {quickActions.map((a) => (
              <Link key={a.label} to={a.to} className="flex flex-col gap-2 rounded-xl border border-border/70 bg-white/[0.02] p-3 transition-colors hover:border-primary/40 hover:bg-primary/[0.07]">
                <a.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                <span className="text-[11.5px] font-medium leading-tight text-white">{a.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Top performing team</p>
            <div className="mt-2 rounded-xl border border-border/70 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between">
                <p className="text-[12.5px] font-semibold text-white">{teams[0].name}</p>
                <span className="font-mono text-[11px] text-accent">{percent(teams[0].raised, teams[0].goal)}%</span>
              </div>
              <ProgressBar className="mt-2 h-1.5" raised={teams[0].raised} goal={teams[0].goal} />
              <p className="mt-1.5 text-[11px] text-muted-foreground">{formatCurrency(teams[0].raised)} of {formatCurrency(teams[0].goal)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-[13.5px] font-semibold text-white">Campaign performance</h2>
          <Link to="/school/campaigns" className="inline-flex items-center gap-1 text-[11.5px] text-accent">All campaigns <ArrowUpRight className="h-3 w-3" /></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {schoolCampaigns.map((c) => (
            <Link key={c.id} to="/campaign/$slug" params={{ slug: c.slug }} className="rounded-2xl border border-border/80 surface p-4 transition-colors hover:border-primary/40">
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{c.category}</p>
              <p className="mt-1 line-clamp-2 font-heading text-[13px] font-semibold leading-snug text-white">{c.title}</p>
              <p className="mt-3 font-heading text-lg font-semibold text-white">{formatCurrency(c.raised)}</p>
              <p className="text-[10.5px] text-muted-foreground">of {formatCurrency(c.goal)}</p>
              <ProgressBar className="mt-2 h-1.5" raised={c.raised} goal={c.goal} />
              <p className="mt-2 font-mono text-[10.5px] text-accent">{percent(c.raised, c.goal)}% · {c.supporters} donors</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_1fr_0.9fr]">
        <RecentDonations donations={donations} limit={5} />
        <div className="rounded-2xl border border-border/80 surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-[13.5px] font-semibold text-white">Top teams</h2>
            <Link to="/school/teams" className="inline-flex items-center gap-1 text-[11.5px] text-accent">All <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <div className="space-y-3">
            {teams.slice(0, 4).map((t, i) => (
              <Link key={t.id} to="/school/teams/$id" params={{ id: t.id }} className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/[0.05] font-mono text-[10.5px] text-muted-foreground">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-white">{t.name}</p>
                  <ProgressBar className="mt-1 h-1" raised={t.raised} goal={t.goal} />
                </div>
                <span className="shrink-0 font-mono text-[11px] text-silver">{formatCurrency(t.raised)}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border/80 surface p-5">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <h2 className="font-heading text-[13.5px] font-semibold text-white">Recent activity</h2>
          </div>
          <ol className="mt-3.5 space-y-3">
            {activity.slice(0, 4).map((a) => (
              <li key={a.id} className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                <div>
                  <p className="text-[11.5px] leading-relaxed text-silver">{a.text}</p>
                  <p className="text-[10px] text-white/30">{a.time}</p>
                </div>
              </li>
            ))}
          </ol>
          <DemoNotice className="mt-4">Demonstration dashboard data.</DemoNotice>
        </div>
      </div>
    </>
  );
}