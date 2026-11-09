import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable from "@/components/shared/DataTable";
import SearchBar from "@/components/shared/SearchBar";
import StatCard from "@/components/shared/StatCard";
import { Heart, DollarSign, Users } from "lucide-react";
import { donations } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_dash/admin/donations")({
  head: () => ({ meta: [{ title: "Donations — Admin" }] }),
  component: AdminDonations,
});

function AdminDonations() {
  const [query, setQuery] = useState("");
  const rows = donations.filter((d) => !query || d.donor.toLowerCase().includes(query.toLowerCase()) || d.campaign.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <DashPageHeader title="Donations" subtitle="Every gift recorded across the platform." />
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Donations (30 days)" value="1,204" icon={Heart} delta="9.2%" accent />
        <StatCard label="Average gift" value="$146" icon={DollarSign} note="across all campaigns" />
        <StatCard label="Unique donors" value="3,918" icon={Users} delta="4.1%" />
      </div>
      <div className="my-4"><SearchBar value={query} onChange={setQuery} placeholder="Search donor or campaign…" /></div>
      <DataTable
        columns={[
          { key: "donor", label: "Donor", render: (r) => <span className="font-medium text-white">{r.donor}</span> },
          { key: "campaign", label: "Campaign" },
          { key: "method", label: "Method" },
          { key: "message", label: "Message", render: (r) => <span className="line-clamp-1 text-muted-foreground">{r.message || "—"}</span> },
          { key: "date", label: "Date", render: (r) => formatDate(r.date) },
          { key: "amount", label: "Amount", align: "right", render: (r) => <span className="font-mono text-accent">{formatCurrency(r.amount)}</span> },
        ]}
        rows={rows}
      />
    </>
  );
}