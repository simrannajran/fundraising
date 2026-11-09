import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Share2, UserPlus, Lightbulb, Trophy, Users, Heart } from "lucide-react";
import { toast } from "sonner";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import { ProgressBar, ProgressRing } from "@/components/shared/ProgressBar";
import { Leaderboard } from "@/components/shared/TeamCards";
import DonationCard from "@/components/shared/DonationCard";
import Modal from "@/components/shared/Modal";
import ShareModal from "@/components/donations/ShareModal";
import { participants, donations, tips, teams } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_dash/participant/dashboard")({
  head: () => ({ meta: [{ title: "My Fundraising — RampUp" }] }),
  component: ParticipantDashboard,
});

function ParticipantDashboard() {
  const me = participants[0];
  const [shareOpen, setShareOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [emails, setEmails] = useState("");
  const teammates = participants.filter((p) => p.team === me.team);
  const pct = percent(me.raised, me.goal);
  const team = teams.find((t) => t.name === me.team);

  return (
    <>
      <DashPageHeader
        title={`Welcome back, ${me.name.split(" ")[0]}`}
        subtitle={`${me.team} · ${me.campaign}`}
        actions={
          <>
            <button type="button" onClick={() => setShareOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">
              <Share2 className="h-3.5 w-3.5" /> Share page
            </button>
            <button type="button" onClick={() => setInviteOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white">
              <UserPlus className="h-3.5 w-3.5" /> Invite supporters
            </button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-border/80 surface p-5 glow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Personal fundraising goal</p>
              <p className="mt-1.5 font-heading text-3xl font-semibold text-white">{formatCurrency(me.raised)}</p>
              <p className="text-[12px] text-muted-foreground">raised of {formatCurrency(me.goal)} · {me.supporters} supporters</p>
            </div>
            <div className="relative grid place-items-center">
              <ProgressRing value={pct} size={72} />
              <span className="absolute font-mono text-[12px] font-semibold text-white">{pct}%</span>
            </div>
          </div>

          <ProgressBar className="mt-4 h-2.5" raised={me.raised} goal={me.goal} />

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/70 bg-white/[0.02] px-3 py-2.5">
            <span className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">Link</span>
            <input readOnly value={`rampup.demo/f/${me.slug}`} className="flex-1 truncate bg-transparent text-[11.5px] text-silver focus:outline-none" />
            <button type="button" onClick={() => toast("Link copied", { description: "Your demonstration link is on the clipboard." })} className="inline-flex items-center gap-1 rounded-lg bg-primary/15 px-2 py-1 text-[10.5px] font-semibold text-accent">
              <Copy className="h-3 w-3" /> Copy
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            <Link to="/fundraiser/$slug" params={{ slug: me.slug }} className="flex-1 rounded-xl border border-border py-2.5 text-center text-[12px] font-semibold text-silver hover:text-white">
              View my public page
            </Link>
            <button type="button" onClick={() => setInviteOpen(true)} className="flex-1 rounded-xl bg-primary py-2.5 text-[12px] font-semibold text-white">
              Invite supporters
            </button>
          </div>
        </div>

        <Leaderboard
          title="Team leaderboard"
          rows={teammates.map((p) => ({ id: p.id, name: p.name, initials: p.initials, raised: p.raised, goal: p.goal }))}
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Supporters", value: me.supporters, icon: Users },
          { label: "Team rank", value: "#1", icon: Trophy },
          { label: "Team raised", value: formatCurrency(team?.raised || 0), icon: Heart },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border/80 surface p-4">
            <s.icon className="h-4 w-4 text-primary" />
            <p className="mt-2.5 font-heading text-xl font-semibold text-white">{s.value}</p>
            <p className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="mb-3 font-heading text-[13.5px] font-semibold text-white">Recent donations</h2>
          <div className="space-y-2">
            {donations.slice(0, 4).map((d) => (
              <DonationCard key={d.id} donation={d} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border/80 surface p-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-3.5 w-3.5 text-amber-300" />
            <h2 className="font-heading text-[13.5px] font-semibold text-white">Fundraising tips</h2>
          </div>
          <ul className="mt-3 space-y-3">
            {tips.map((t, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="font-mono text-[10.5px] text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[11.5px] leading-relaxed text-muted-foreground">{t}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} title={me.campaign} slug={me.slug} />

      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite supporters" description="Add emails separated by commas — we'll prepare a personal message.">
        <textarea
          rows={4}
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder="aunt.jo@example.com, coach.walsh@example.com"
          className="w-full resize-none rounded-xl border border-border bg-white/[0.03] px-3.5 py-3 text-[12.5px] text-white placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => {
            setInviteOpen(false);
            toast("Invites prepared", { description: "Email delivery is not connected in this prototype." });
          }}
          className="mt-3 w-full rounded-xl bg-primary py-3 text-[13px] font-semibold text-white"
        >
          Send invites
        </button>
        <p className="mt-2 text-center text-[10.5px] text-white/35">Demonstration control — no emails are sent.</p>
      </Modal>
    </>
  );
}