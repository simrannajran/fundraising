import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable, { StatusPill } from "@/components/shared/DataTable";
import SearchBar from "@/components/shared/SearchBar";
import FilterDropdown from "@/components/shared/FilterDropdown";
import StatCard from "@/components/shared/StatCard";
import { Building2, Megaphone, DollarSign } from "lucide-react";
import { schools } from "@/data/mock";
import { formatCurrency, formatNumber } from "@/lib/format";

export const Route = createFileRoute("/_dash/admin/settings")({
  head: () => ({ meta: [{ title: "Schools — Admin" }] }),
  component: AdminSchools,
});

function AdminSchools() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const rows = useMemo(
    () =>
      schools.filter((s) => {
        const q = query.toLowerCase();
        return (!q || s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)) && (status === "All statuses" || s.status === status);
      }),
    [query, status]
  );

  return (
    <>
      <DashPageHeader
        title="Schools"
        subtitle="Every registered school, its verification state and fundraising totals."
        actions={<button type="button" className="rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white">Invite school</button>}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Registered schools" value="128" icon={Building2} delta="12 this month" accent />
        <StatCard label="Active campaigns" value="346" icon={Megaphone} delta="28 new" />
        <StatCard label="Lifetime raised" value="$8.42M" icon={DollarSign} delta="18.4%" />
      </div>

      <div className="my-4 flex flex-col gap-2 sm:flex-row">
        <SearchBar value={query} onChange={setQuery} placeholder="Search schools or cities…" />
        <FilterDropdown label="Status" value={status} onChange={setStatus} options={["All statuses", "Verified", "Pending review"]} className="sm:w-56" />
      </div>

      <DataTable
        columns={[
          { key: "name", label: "School", render: (r) => <div><p className="font-medium text-white">{r.name}</p><p className="text-[11px] text-muted-foreground">{r.type}</p></div> },
          { key: "city", label: "Location" },
          { key: "students", label: "Students", align: "right", render: (r) => formatNumber(r.students) },
          { key: "campaigns", label: "Campaigns", align: "right" },
          { key: "raised", label: "Raised", align: "right", render: (r) => <span className="font-mono text-white">{formatCurrency(r.raised)}</span> },
          { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
          { key: "actions", label: "", align: "right", render: () => <button type="button" className="text-[11.5px] font-semibold text-accent">View</button> },
        ]}
        rows={rows}
      />
    </>
  );
}