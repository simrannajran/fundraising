import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import DataTable from "@/components/shared/DataTable";
import SearchBar from "@/components/shared/SearchBar";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { participants, teams } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_dash/school/participants")({
  head: () => ({ meta: [{ title: "Participants — School" }] }),
  component: SchoolParticipants,
});

function SchoolParticipants() {
  const [query, setQuery] = useState("");
  const rows = participants.filter((p) => !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.team.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <DashPageHeader
        title="Participants"
        subtitle="Every student and seller with a personal fundraising page."
        actions={<button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white"><UserPlus className="h-3.5 w-3.5" /> Invite</button>}
      />
      <div className="mb-4"><SearchBar value={query} onChange={setQuery} placeholder="Search participants or teams…" /></div>
      <DataTable
        columns={[
          { key: "name", label: "Participant", render: (r) => <div className="flex items-center gap-2.5"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary/12 text-[9.5px] font-bold text-accent">{r.initials}</span><div><p className="font-medium text-white">{r.name}</p><p className="text-[11px] text-muted-foreground">{r.role}</p></div></div> },
          { key: "team", label: "Team" },
          { key: "goal", label: "Goal", align: "right", render: (r) => <span className="font-mono text-muted-foreground">{formatCurrency(r.goal)}</span> },
          { key: "raised", label: "Raised", align: "right", render: (r) => <span className="font-mono text-white">{formatCurrency(r.raised)}</span> },
          { key: "progress", label: "Progress", render: (r) => (
            <div className="w-24">
              <ProgressBar className="h-1.5" raised={r.raised} goal={r.goal} />
              <span className="mt-1 block font-mono text-[10px] text-muted-foreground">{percent(r.raised, r.goal)}%</span>
            </div>
          ) },
          { key: "supporters", label: "Supporters", align: "right" },
        ]}
        rows={rows}
      />
      <p className="mt-3 text-[11px] text-muted-foreground">{teams.length} teams · {participants.length} participants in this demonstration set.</p>
    </>
  );
}