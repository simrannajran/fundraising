import { createFileRoute } from "@tanstack/react-router";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable, { StatusPill } from "@/components/shared/DataTable";
import StatCard from "@/components/shared/StatCard";
import { CreditCard, Receipt, Percent } from "lucide-react";
import { transactions } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_dash/admin/transactions")({
  head: () => ({ meta: [{ title: "Transactions — Admin" }] }),
  component: AdminTransactions,
});

function AdminTransactions() {
  return (
    <>
      <DashPageHeader
        title="Transactions"
        subtitle="Settlement detail behind every donation and product order."
        actions={<button type="button" className="rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">Export CSV</button>}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Gross volume" value="$186,420" icon={CreditCard} delta="12.8%" accent />
        <StatCard label="Processing fees" value="$4,186" icon={Percent} note="2.2% blended" />
        <StatCard label="Net to schools" value="$182,234" icon={Receipt} delta="12.1%" />
      </div>
      <div className="mt-4">
        <DataTable
          columns={[
            { key: "id", label: "Transaction", render: (r) => <span className="font-mono text-[11.5px] text-white">{r.id}</span> },
            { key: "donor", label: "Payer" },
            { key: "campaign", label: "Campaign" },
            { key: "method", label: "Method" },
            { key: "date", label: "Date", render: (r) => formatDate(r.date) },
            { key: "amount", label: "Gross", align: "right", render: (r) => <span className="font-mono">{formatCurrency(r.amount, { decimals: 2 })}</span> },
            { key: "fee", label: "Fee", align: "right", render: (r) => <span className="font-mono text-muted-foreground">{formatCurrency(r.fee, { decimals: 2 })}</span> },
            { key: "net", label: "Net", align: "right", render: (r) => <span className="font-mono text-white">{formatCurrency(r.net, { decimals: 2 })}</span> },
            { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
          ]}
          rows={transactions}
        />
      </div>
    </>
  );
}