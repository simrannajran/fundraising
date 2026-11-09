import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Heart, DollarSign, Users } from "lucide-react";
import { toast } from "sonner";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable from "@/components/shared/DataTable";
import SearchBar from "@/components/shared/SearchBar";
import StatCard from "@/components/shared/StatCard";
import { donations } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_dash/school/donations")({
  head: () => ({ meta: [{ title: "Donations — School" }] }),
  component: SchoolDonations,
});

function SchoolDonations() {
  const [query, setQuery] = useState("");
  const rows = donations.filter((d) => !query || d.donor.toLowerCase().includes(query.toLowerCase()) || d.campaign.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <DashPageHeader
        title="Donations"
        subtitle="Every gift to your school, with donor detail and messages."
        actions={
          <button type="button" onClick={() => toast("Export queued", { description: "CSV export is not connected in this prototype." })} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total raised" value="$184,500" icon={DollarSign} delta="18.2%" accent />
        <StatCard label="Donors" value="1,842" icon={Users} delta="124" />
        <StatCard label="Average gift" value="$158" icon={Heart} note="last 30 days" />
      </div>
      <div className="my-4"><SearchBar value={query} onChange={setQuery} placeholder="Search donor or campaign…" /></div>
      <DataTable
        columns={[
          { key: "donor", label: "Donor", render: (r) => <span className="font-medium text-white">{r.donor}</span> },
          { key: "campaign", label: "Campaign" },
          { key: "message", label: "Message", render: (r) => <span className="line-clamp-1 text-muted-foreground">{r.message || "—"}</span> },
          { key: "method", label: "Method" },
          { key: "date", label: "Date", render: (r) => formatDate(r.date) },
          { key: "amount", label: "Amount", align: "right", render: (r) => <span className="font-mono text-accent">{formatCurrency(r.amount)}</span> },
        ]}
        rows={rows}
      />
    </>
  );
}