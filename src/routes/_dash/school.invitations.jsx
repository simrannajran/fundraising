import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Copy } from "lucide-react";
import { toast } from "sonner";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable, { StatusPill } from "@/components/shared/DataTable";
import Modal from "@/components/shared/Modal";
import { invitations, teams } from "@/data/mock";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_dash/school/invitations")({
  head: () => ({ meta: [{ title: "Invitations — School" }] }),
  component: SchoolInvitations,
});

function SchoolInvitations() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", team: teams[0].name });
  return (
    <>
      <DashPageHeader
        title="Invitations"
        subtitle="Invite participants, coaches and advisors to their fundraising pages."
        actions={
          <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white">
            <Send className="h-3.5 w-3.5" /> Invite participant
          </button>
        }
      />

      <div className="mb-4 flex items-center gap-2 rounded-xl border border-border/70 bg-white/[0.02] px-3.5 py-3">
        <input readOnly value="rampup.demo/join/northgate-high" className="flex-1 truncate bg-transparent text-[12px] text-silver focus:outline-none" />
        <button type="button" onClick={() => toast("Join link copied", { description: "Demonstration link copied." })} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-silver hover:text-white">
          <Copy className="h-3 w-3" /> Copy
        </button>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Participant", render: (r) => <div><p className="font-medium text-white">{r.name}</p><p className="text-[11px] text-muted-foreground">{r.email}</p></div> },
          { key: "team", label: "Team" },
          { key: "sent", label: "Sent", render: (r) => formatDate(r.sent) },
          { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
          { key: "actions", label: "", align: "right", render: (r) => (
            <button type="button" onClick={() => toast("Invitation resent", { description: `Demo resend to ${r.email}.` })} className="text-[11.5px] font-semibold text-accent">Resend</button>
          ) },
        ]}
        rows={invitations}
      />

      <Modal open={open} onClose={() => setOpen(false)} title="Invite a participant" description="They'll receive a link to set up their personal page.">
        <div className="space-y-3">
          {[
            { k: "name", label: "Full name", placeholder: "Nina Patel" },
            { k: "email", label: "Email", placeholder: "n.patel@student.northgate.edu" },
          ].map((f) => (
            <label key={f.k} className="block">
              <span className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{f.label}</span>
              <input value={form[f.k]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} placeholder={f.placeholder} className="mt-1.5 h-10 w-full rounded-lg border border-border bg-white/[0.03] px-3 text-[12.5px] text-white placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none" />
            </label>
          ))}
          <label className="block">
            <span className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">Team</span>
            <select value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-border bg-white/[0.03] px-3 text-[12.5px] text-silver focus:border-primary/60 focus:outline-none">
              {teams.map((t) => <option key={t.id} className="bg-[#0b0616]">{t.name}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              if (!form.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return toast("Add a name and valid email.");
              setOpen(false);
              toast("Invitation prepared", { description: "Email delivery is not connected in this prototype." });
            }}
            className="w-full rounded-xl bg-primary py-3 text-[13px] font-semibold text-white"
          >
            Send invitation
          </button>
        </div>
      </Modal>
    </>
  );
}