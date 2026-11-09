import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Share2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Leaderboard, ParticipantCard } from "@/components/shared/TeamCards";
import { participants, teams } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_dash/school/teams/$id")({
  head: () => ({ meta: [{ title: "Team Detail — School" }] }),
  component: SchoolTeamDetail,
});

function SchoolTeamDetail() {
  const { id } = Route.useParams();
  const team = teams.find((t) => t.id === id) || teams[0];
  const members = participants.filter((p) => p.team === team.name);
  const roster = members.length ? members : participants.slice(0, 3);

  return (
    <>
      <Link to="/school/teams" className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-white">
        <ArrowLeft className="h-3.5 w-3.5" /> All teams
      </Link>

      <DashPageHeader
        title={team.name}
        subtitle={`${team.school} · ${team.coach} · ${team.participants} participants`}
        actions={
          <>
            <button type="button" onClick={() => toast("Invite link copied", { description: "Demonstration only." })} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white">
              <UserPlus className="h-3.5 w-3.5" /> Add participant
            </button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border/80 surface">
            <img src={team.image} alt={team.name} className="h-44 w-full object-cover" />
            <div className="p-5">
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">{team.description}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ["Raised", formatCurrency(team.raised)],
                  ["Goal", formatCurrency(team.goal)],
                  ["Progress", `${percent(team.raised, team.goal)}%`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-border/70 bg-white/[0.02] px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{k}</p>
                    <p className="mt-0.5 font-heading text-[13.5px] font-semibold text-white">{v}</p>
                  </div>
                ))}
              </div>
              <ProgressBar className="mt-3" raised={team.raised} goal={team.goal} />
            </div>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-[13.5px] font-semibold text-white">Participants</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {roster.map((p) => (
                <ParticipantCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Leaderboard title="Team leaderboard" rows={roster.map((p) => ({ id: p.id, name: p.name, initials: p.initials, raised: p.raised, goal: p.goal }))} />
          <div className="rounded-2xl border border-border/80 surface p-5">
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Linked campaign</p>
            <Link to="/campaign/$slug" params={{ slug: team.campaignSlug }} className="mt-1.5 block font-heading text-[13.5px] font-semibold text-white hover:text-accent">
              {team.campaign}
            </Link>
            <Link to="/team/$slug" params={{ slug: team.slug }} className="mt-3 inline-block text-[11.5px] font-semibold text-accent hover:text-white">
              Open public team page →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}