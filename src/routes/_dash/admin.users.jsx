import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable, { StatusPill } from "@/components/shared/DataTable";
import SearchBar from "@/components/shared/SearchBar";
import FilterDropdown from "@/components/shared/FilterDropdown";
import { users } from "@/data/mock";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_dash/admin/users")({
  head: () => ({ meta: [{ title: "Users — Admin" }] }),
  component: AdminUsers,
});

function AdminUsers() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All roles");
  const rows = users.filter((u) => {
    const q = query.toLowerCase();
    return (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) && (role === "All roles" || u.role === role);
  });

  return (
    <>
      <DashPageHeader
        title="Users"
        subtitle="Administrators, coaches, advisors and participants across every school."
        actions={<button type="button" className="rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white">Invite user</button>}
      />

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by name or email…" />
        <FilterDropdown label="Role" value={role} onChange={setRole} options={["All roles", "School admin", "Campaign manager", "Coach", "Advisor", "Participant"]} className="sm:w-56" />
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Name", render: (r) => <div className="flex items-center gap-2.5"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary/12 text-[9.5px] font-bold text-accent">{r.name.split(" ").map((w) => w[0]).join("")}</span><div><p className="font-medium text-white">{r.name}</p><p className="text-[11px] text-muted-foreground">{r.email}</p></div></div> },
          { key: "role", label: "Role" },
          { key: "school", label: "School" },
          { key: "joined", label: "Joined", render: (r) => formatDate(r.joined) },
          { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
        ]}
        rows={rows}
      />
    </>
  );
}