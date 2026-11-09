import { createFileRoute } from "@tanstack/react-router";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable, { StatusPill } from "@/components/shared/DataTable";
import StatCard from "@/components/shared/StatCard";
import { Wallet, Clock, CheckCircle2 } from "lucide-react";
import { payouts } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_dash/admin/payouts")({
  head: () => ({ meta: [{ title: "Payouts — Admin" }] }),
  component: AdminPayouts,
});

function AdminPayouts() {
  return (
    <>
      <DashPageHeader
        title="Payouts"
        subtitle="Scheduled and completed transfers to school bank accounts."
        actions={<button type="button" className="rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white">Run payout batch</button>}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Paid this month" value="$53,550" icon={CheckCircle2} delta="6 schools" accent />
        <StatCard label="Processing" value="$9,640" icon={Clock} note="1 payout" />
        <StatCard label="Next batch" value="Nov 15" icon={Wallet} note="scheduled" />
      </div>
      <div className="mt-4">
        <DataTable
          columns={[
            { key: "id", label: "Payout", render: (r) => <span className="font-mono text-[11.5px] text-white">{r.id}</span> },
            { key: "school", label: "School" },
            { key: "period", label: "Period" },
            { key: "date", label: "Date", render: (r) => formatDate(r.date) },
            { key: "amount", label: "Amount", align: "right", render: (r) => <span className="font-mono text-white">{formatCurrency(r.amount)}</span> },
            { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
          ]}
          rows={payouts}
        />
      </div>
    </>
  );
}