import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable, { StatusPill } from "@/components/shared/DataTable";
import SearchBar from "@/components/shared/SearchBar";
import FilterDropdown from "@/components/shared/FilterDropdown";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { campaigns, schools } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_dash/admin/campaigns")({
  head: () => ({ meta: [{ title: "Campaigns — Admin" }] }),
  component: AdminCampaigns,
});

function AdminCampaigns() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [school, setSchool] = useState("All schools");

  const rows = useMemo(
    () =>
      campaigns.filter((c) => {
        const q = query.toLowerCase();
        return (
          (!q || c.title.toLowerCase().includes(q) || c.school.toLowerCase().includes(q)) &&
          (category === "All categories" || c.category === category) &&
          (school === "All schools" || c.school === school)
        );
      }),
    [query, category, school]
  );

  return (
    <>
      <DashPageHeader
        title="Campaigns"
        subtitle="Approve, monitor and compare every campaign on the platform."
        actions={<button type="button" className="rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white">Create campaign</button>}
      />

      <div className="mb-4 flex flex-col gap-2 lg:flex-row">
        <SearchBar value={query} onChange={setQuery} placeholder="Search campaigns…" />
        <FilterDropdown label="Category" value={category} onChange={setCategory} options={["All categories", "Schools", "Sports", "Athletics", "Clubs", "Community"]} className="lg:w-48" />
        <FilterDropdown label="School" value={school} onChange={setSchool} options={["All schools", ...schools.map((s) => s.name)]} className="lg:w-56" />
      </div>

      <DataTable
        columns={[
          { key: "title", label: "Campaign", render: (r) => <div><Link to="/campaign/$slug" params={{ slug: r.slug }} className="font-medium text-white hover:text-accent">{r.title}</Link><p className="text-[11px] text-muted-foreground">{r.school}</p></div> },
          { key: "category", label: "Category" },
          { key: "raised", label: "Raised", align: "right", render: (r) => <span className="font-mono">{formatCurrency(r.raised)}</span> },
          { key: "goal", label: "Goal", align: "right", render: (r) => <span className="font-mono text-muted-foreground">{formatCurrency(r.goal)}</span> },
          { key: "progress", label: "Progress", render: (r) => (
            <div className="w-28">
              <ProgressBar className="h-1.5" raised={r.raised} goal={r.goal} />
              <span className="mt-1 block font-mono text-[10.5px] text-muted-foreground">{percent(r.raised, r.goal)}%</span>
            </div>
          ) },
          { key: "supporters", label: "Donors", align: "right" },
          { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
        ]}
        rows={rows}
      />
    </>
  );
}