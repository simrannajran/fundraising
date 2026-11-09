import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Copy, Heart, Lock, Share2, Users } from "lucide-react";
import { toast } from "sonner";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Leaderboard } from "@/components/shared/TeamCards";
import DonationCard from "@/components/shared/DonationCard";
import DonationModal from "@/components/donations/DonationModal";
import ShareModal from "@/components/donations/ShareModal";
import DemoNotice from "@/components/shared/DemoNotice";
import { participants, donations } from "@/data/mock";
import { formatCurrency, initials, percent } from "@/lib/format";

export const Route = createFileRoute("/_site/fundraiser/$slug")({
  head: ({ params }) => ({ meta: [{ title: `Fundraiser ${params.slug.replace(/-/g, " ")} — RampUp Fundraising` }] }),
  component: FundraiserPage,
});

function FundraiserPage() {
  const { slug } = Route.useParams();
  const person = participants.find((p) => p.slug === slug);
  const [donateOpen, setDonateOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  if (!person) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-white">Fundraiser page not found</h1>
        <Link to="/campaigns" className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-white">
          Explore campaigns
        </Link>
      </div>
    );
  }

  const teammates = participants.filter((p) => p.team === person.team);
  const supporters = donations.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1140px] px-5 py-8 lg:px-8">
      <Link to="/team/$slug" params={{ slug: person.teamSlug }} className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-white">
        <ArrowLeft className="h-3.5 w-3.5" /> {person.team}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary/15 font-heading text-lg font-bold text-accent ring-1 ring-inset ring-primary/25">
              {person.initials}
            </span>
            <div>
              <h1 className="font-heading text-2xl font-semibold text-white sm:text-[32px]">{person.name}</h1>
              <p className="mt-1 text-[12.5px] text-muted-foreground">{person.role} · {person.school}</p>
              <p className="text-[12.5px] text-accent">Fundraising for {person.campaign}</p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border/80">
            <img src={person.image} alt={person.campaign} className="h-56 w-full object-cover sm:h-72" />
          </div>

          <div className="mt-6 rounded-2xl border border-border/80 surface p-5">
            <h2 className="font-heading text-[15px] font-semibold text-white">Why I'm fundraising</h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-silver">"{person.message}"</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {person.supporters} supporters</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Verified school account</span>
              <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Demonstration page</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-heading text-[15px] font-semibold text-white">Supporters</h2>
            <div className="mt-3 space-y-2">
              {supporters.map((d) => (
                <DonationCard key={d.id} donation={d} />
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-[88px] lg:h-fit">
          <div className="rounded-2xl border border-border/80 surface p-5 glow-soft">
            <p className="font-heading text-3xl font-semibold text-white">{formatCurrency(person.raised)}</p>
            <p className="mt-1 text-[12px] text-muted-foreground">raised of {formatCurrency(person.goal)} personal goal</p>
            <ProgressBar className="mt-3 h-2.5" raised={person.raised} goal={person.goal} />
            <p className="mt-2 font-mono text-[11px] text-accent">{percent(person.raised, person.goal)}% funded</p>

            <button
              type="button"
              onClick={() => setDonateOpen(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground glow hover:bg-primary/90"
            >
              <Heart className="h-4 w-4" /> Support this fundraiser
            </button>
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-[13px] font-semibold text-silver hover:text-white"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/70 bg-white/[0.02] px-3 py-2.5">
              <input readOnly value={`rampup.demo/f/${person.slug}`} className="flex-1 truncate bg-transparent text-[11.5px] text-silver focus:outline-none" />
              <button type="button" onClick={() => toast("Link copied", { description: "Demonstration link copied." })} className="text-muted-foreground hover:text-white">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            <DemoNotice className="mt-3">Personal page preview with fictional profile data.</DemoNotice>
          </div>

          <Leaderboard
            title={`${person.team} leaderboard`}
            rows={teammates.map((t) => ({ id: t.id, name: t.name, initials: t.initials, raised: t.raised, goal: t.goal }))}
          />

          <div className="rounded-2xl border border-border/80 surface p-5">
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Team page</p>
            <div className="mt-2 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/12 text-[10px] font-bold text-accent">{initials(person.team)}</span>
              <Link to="/team/$slug" params={{ slug: person.teamSlug }} className="text-[13px] font-semibold text-white hover:text-accent">
                {person.team}
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <DonationModal open={donateOpen} onClose={() => setDonateOpen(false)} campaignTitle={`${person.name} · ${person.campaign}`} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} title={`${person.name}'s fundraiser`} slug={person.slug} />
    </div>
  );
}