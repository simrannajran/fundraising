import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, Heart, MapPin, Share2, Users, Target } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import DonationModal from "@/components/donations/DonationModal";
import ShareModal from "@/components/donations/ShareModal";
import { ParticipantCard } from "@/components/shared/TeamCards";
import DonationCard from "@/components/shared/DonationCard";
import DemoNotice from "@/components/shared/DemoNotice";
import { campaigns, participants, teams, donations, donationPresets } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_site/campaign/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${params.slug.replace(/-/g, " ")} — RampUp Fundraising` }] }),
  component: CampaignDetailPage,
});

function CampaignDetailPage() {
  const { slug } = Route.useParams();
  const campaign = campaigns.find((c) => c.slug === slug);
  if (!campaign) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-white">Campaign not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">This demonstration campaign does not exist.</p>
        <Link to="/campaigns" className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-white">
          Back to campaigns
        </Link>
      </div>
    );
  }
  return <CampaignView campaign={campaign} />;
}

function CampaignView({ campaign }) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [amount, setAmount] = useState(50);

  const campaignTeams = teams.filter((t) => t.campaignSlug === campaign.slug);
  const campaignParticipants = participants.filter((p) => p.campaignSlug === campaign.slug);
  const campaignDonations = donations.filter((d) => d.campaign === campaign.title);
  const pct = percent(campaign.raised, campaign.goal);

  return (
    <>
      <div className="border-b border-border/70">
        <div className="mx-auto max-w-[1280px] px-5 py-4 lg:px-8">
          <Link to="/campaigns" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to campaigns
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 py-8 lg:px-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-border/80">
              <img src={campaign.cover} alt={campaign.title} className="h-64 w-full object-cover sm:h-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0512] via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                {campaign.category}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground">{campaign.school}</p>
              <h1 className="mt-2 font-heading text-2xl font-semibold leading-tight text-white sm:text-[34px]">{campaign.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {campaign.school}</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {campaign.supporters} supporters</span>
                <span className="inline-flex items-center gap-1.5"><CalendarClock className="h-3.5 w-3.5" /> Ends {campaign.deadline}</span>
                <span className="inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5" /> {pct}% funded</span>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-white">About this campaign</h2>
              <p className="text-[14px] leading-relaxed text-silver">{campaign.summary}</p>
              {campaign.story.split("\n\n").map((para, i) => (
                <p key={i} className="text-[14px] leading-relaxed text-muted-foreground">{para}</p>
              ))}
            </div>

            <div className="mt-9">
              <h2 className="font-heading text-lg font-semibold text-white">Campaign updates</h2>
              {campaign.updates.length ? (
                <div className="mt-4 space-y-3">
                  {campaign.updates.map((u) => (
                    <div key={u.title} className="rounded-xl border border-border/70 surface p-4">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-primary">{u.date}</p>
                      <p className="mt-1.5 text-[13.5px] font-semibold text-white">{u.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{u.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-[13px] text-muted-foreground">No updates posted yet.</p>
              )}
            </div>

            {campaignTeams.length > 0 && (
              <div className="mt-9">
                <h2 className="font-heading text-lg font-semibold text-white">Team members</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {campaignTeams.map((t) => (
                    <Link key={t.id} to="/team/$slug" params={{ slug: t.slug }} className="flex items-center gap-3 rounded-xl border border-border/70 surface p-3 hover:border-primary/40">
                      <img src={t.image} alt={t.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-white">{t.name}</p>
                        <p className="text-[11px] text-muted-foreground">{t.participants} participants · {formatCurrency(t.raised)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {campaignParticipants.length > 0 && (
              <div className="mt-9">
                <h2 className="font-heading text-lg font-semibold text-white">Fundraisers</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {campaignParticipants.map((p) => (
                    <ParticipantCard key={p.id} p={p} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-9">
              <h2 className="font-heading text-lg font-semibold text-white">Recent supporters</h2>
              <div className="mt-4 space-y-2">
                {(campaignDonations.length ? campaignDonations : donations.slice(0, 3)).map((d) => (
                  <DonationCard key={d.id} donation={d} />
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-[88px] lg:h-fit">
            <div className="rounded-2xl border border-border/80 surface p-5 glow-soft">
              <div className="flex items-baseline justify-between">
                <p className="font-heading text-3xl font-semibold text-white">{formatCurrency(campaign.raised)}</p>
                <p className="font-mono text-sm font-semibold text-accent">{pct}%</p>
              </div>
              <p className="mt-1 text-[12px] text-muted-foreground">raised of {formatCurrency(campaign.goal)} goal</p>
              <ProgressBar className="mt-3 h-2.5" raised={campaign.raised} goal={campaign.goal} />
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl border border-border/70 bg-white/[0.02] py-2.5">
                  <p className="font-heading text-sm font-semibold text-white">{campaign.supporters}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Donors</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-white/[0.02] py-2.5">
                  <p className="font-heading text-sm font-semibold text-white">{campaign.deadline.split(",")[0]}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Deadline</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Choose an amount</p>
                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {donationPresets.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAmount(a)}
                      className={`rounded-xl border py-2.5 font-mono text-[13px] font-semibold transition-colors ${amount === a ? "border-primary bg-primary/15 text-white" : "border-border text-silver hover:border-primary/40"}`}
                    >
                      ${a}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="1"
                    placeholder="Custom"
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="rounded-xl border border-border bg-transparent px-2 text-center font-mono text-[12px] text-white placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setDonateOpen(true)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground glow transition-colors hover:bg-primary/90"
                >
                  <Heart className="h-4 w-4" /> Donate Now
                </button>
                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-[13px] font-semibold text-silver transition-colors hover:border-primary/40 hover:text-white"
                >
                  <Share2 className="h-3.5 w-3.5" /> Share campaign
                </button>
              </div>
              <DemoNotice className="mt-4">Demonstration campaign — donations are not processed.</DemoNotice>
            </div>
          </aside>
        </div>
      </div>

      <DonationModal open={donateOpen} onClose={() => setDonateOpen(false)} campaignTitle={campaign.title} defaultAmount={amount} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} title={campaign.title} slug={campaign.slug} />
    </>
  );
}