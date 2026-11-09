import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, Share2, Target, Users } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Leaderboard, ParticipantCard } from "@/components/shared/TeamCards";
import DonationModal from "@/components/donations/DonationModal";
import ShareModal from "@/components/donations/ShareModal";
import { participants, teams } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_site/team/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${params.slug.replace(/-/g, " ")} — Team Fundraising` }] }),
  component: TeamPage,
});

function TeamPage() {
  const { slug } = Route.useParams();
  const team = teams.find((t) => t.slug === slug);
  const [donateOpen, setDonateOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  if (!team) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-white">Team not found</h1>
        <Link to="/campaigns" className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-white">
          Explore campaigns
        </Link>
      </div>
    );
  }

  const members = participants.filter((p) => p.team === team.name);
  const roster = members.length ? members : participants.slice(0, 3);

  return (
    <>
      <section className="relative border-b border-border/70">
        <div className="absolute inset-0 -z-10">
          <img src={team.image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0512]/80 via-[#0a0512]/95 to-background" />
        </div>
        <div className="mx-auto max-w-[1140px] px-5 py-10 lg:px-8 lg:py-14">
          <Link to="/campaigns" className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> Campaigns
          </Link>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-accent">{team.school}</p>
              <h1 className="mt-2 font-heading text-3xl font-semibold text-white sm:text-[42px]">{team.name}</h1>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted-foreground">{team.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-silver">
                <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {team.participants} participants</span>
                <span className="inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5" /> {percent(team.raised, team.goal)}% of goal</span>
                <span>{team.coach}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setDonateOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[13px] font-semibold text-white hover:bg-primary/90">
                <Heart className="h-4 w-4" /> Donate to team
              </button>
              <button type="button" onClick={() => setShareOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-silver hover:text-white">
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1140px] px-5 py-10 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/80 surface p-5">
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Team raised</p>
            <p className="mt-2 font-heading text-2xl font-semibold text-white">{formatCurrency(team.raised)}</p>
            <p className="text-[11px] text-muted-foreground">of {formatCurrency(team.goal)} goal</p>
            <ProgressBar className="mt-3" raised={team.raised} goal={team.goal} />
          </div>
          <div className="rounded-2xl border border-border/80 surface p-5">
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Participants</p>
            <p className="mt-2 font-heading text-2xl font-semibold text-white">{team.participants}</p>
            <p className="text-[11px] text-muted-foreground">each with a personal page</p>
          </div>
          <div className="rounded-2xl border border-border/80 surface p-5">
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Linked campaign</p>
            <Link to="/campaign/$slug" params={{ slug: team.campaignSlug }} className="mt-2 block font-heading text-[14px] font-semibold text-white hover:text-accent">
              {team.campaign}
            </Link>
            <p className="mt-1 text-[11px] text-muted-foreground">View the full campaign page</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-heading text-lg font-semibold text-white">Team members</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {roster.map((p) => (
                <ParticipantCard key={p.id} p={p} />
              ))}
            </div>
          </div>
          <Leaderboard
            title="Participant leaderboard"
            rows={roster.map((p) => ({ id: p.id, name: p.name, initials: p.initials, raised: p.raised, goal: p.goal }))}
          />
        </div>
      </div>

      <DonationModal open={donateOpen} onClose={() => setDonateOpen(false)} campaignTitle={team.name} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} title={team.name} slug={team.slug} />
    </>
  );
}