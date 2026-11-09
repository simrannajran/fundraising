import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable, { StatusPill } from "@/components/shared/DataTable";
import Modal from "@/components/shared/Modal";
import { inquiries } from "@/data/mock";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_dash/admin/inquiries")({
  head: () => ({ meta: [{ title: "Contact Inquiries — Admin" }] }),
  component: AdminInquiries,
});

function AdminInquiries() {
  const [active, setActive] = useState(null);
  return (
    <>
      <DashPageHeader title="Contact inquiries" subtitle="Inbound requests from schools and districts." />
      <DataTable
        columns={[
          { key: "name", label: "Contact", render: (r) => <div><p className="font-medium text-white">{r.name}</p><p className="text-[11px] text-muted-foreground">{r.email}</p></div> },
          { key: "school", label: "School" },
          { key: "type", label: "Inquiry type" },
          { key: "date", label: "Received", render: (r) => formatDate(r.date) },
          { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
          { key: "actions", label: "", align: "right", render: (r) => (
            <button type="button" onClick={() => setActive(r)} className="text-[11.5px] font-semibold text-accent">Open</button>
          ) },
        ]}
        rows={inquiries}
      />

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.school} description={active ? `${active.name} · ${active.type}` : ""}>
        {active && (
          <div className="space-y-4">
            <dl className="space-y-2 text-[12.5px]">
              {[["Email", active.email], ["Phone", active.phone], ["Received", formatDate(active.date)], ["Status", active.status]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border/40 pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-xl border border-border/70 bg-white/[0.02] p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Message</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-silver">
                We're looking to raise for a new weight room before spring season. Our booster club has 40 families ready to participate and we would like participant pages set up.
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => toast("Reply drafted", { description: "Email sending is not connected in this prototype." })} className="flex-1 rounded-xl bg-primary py-2.5 text-[12.5px] font-semibold text-white">
                <Mail className="mr-1.5 inline h-3.5 w-3.5" /> Draft reply
              </button>
              <button type="button" onClick={() => toast("Note added", { description: "Internal notes are local to this prototype." })} className="flex-1 rounded-xl border border-border py-2.5 text-[12.5px] font-semibold text-silver">
                <MessageSquare className="mr-1.5 inline h-3.5 w-3.5" /> Add note
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}