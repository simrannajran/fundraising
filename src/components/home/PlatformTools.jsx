import { Link } from "@tanstack/react-router";
import { ArrowRight, Share2, Users2, User, Rocket, CreditCard, HandCoins } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const tools = [
  {
    icon: Rocket,
    title: "Campaign creation",
    body: "Build a campaign in minutes — goals, story, imagery, suggested amounts and team settings.",
    cta: "Start a campaign",
    to: "/register-school",
  },
  {
    icon: Share2,
    title: "Peer-to-peer fundraising",
    body: "Supporters become fundraisers with their own pages, personal goals and one-tap sharing.",
    cta: "See a sample page",
    to: "/fundraiser/$slug",
    params: { slug: "maya-ellis" },
  },
  {
    icon: Users2,
    title: "Team fundraising",
    body: "Group every athlete or member under a team page with a combined goal and leaderboard.",
    cta: "See a team page",
    to: "/team/$slug",
    params: { slug: "northgate-track" },
  },
  {
    icon: User,
    title: "Individual fundraiser pages",
    body: "Each participant gets a story, photo and progress bar that makes giving personal.",
    cta: "View an example",
    to: "/fundraiser/$slug",
    params: { slug: "priya-nair" },
  },
  {
    icon: CreditCard,
    title: "Donation tools",
    body: "One-time and recurring gifts, suggested amounts, custom questions and instant receipts.",
    cta: "Explore donations",
    to: "/solutions",
  },
  {
    icon: HandCoins,
    title: "Donor management",
    body: "Track donor history, thank supporters automatically and report to your board with confidence.",
    cta: "See donor tools",
    to: "/school/donations",
  },
];

export default function PlatformTools() {
  return (
    <section className="border-y border-border/70 bg-[#080410]">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="The platform"
          title="From campaign creation to donor management"
          body="RampUp is more than a listing site. Create the campaign, launch personal and team pages, collect donations and manage every donor — with live reporting the whole way."
          action={
            <Link to="/solutions" className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-white">
              All fundraising tools <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.title}
              to={t.to}
              params={t.params}
              className="group flex flex-col rounded-2xl border border-border/80 surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">
                <t.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-heading text-[15px] font-semibold text-white">{t.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{t.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-accent group-hover:text-white">
                {t.cta} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}