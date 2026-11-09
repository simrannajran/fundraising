import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flag, Users2, Share2, Target, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { howItWorks, IMAGES } from "@/data/mock";

export const Route = createFileRoute("/_site/how-it-works")({
  head: () => ({ meta: [{ title: "How It Works — RampUp Fundraising" }] }),
  component: SolutionsPage,
});

const icons = { flag: Flag, users: Users2, share: Share2, target: Target };

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Four steps from first idea to a funded goal"
        body="No paperwork, no order forms, no chasing. Set the campaign up once and let every participant carry their own page."
      />

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <div className="relative space-y-4">
          {howItWorks.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <div key={s.step} className="grid items-center gap-6 rounded-2xl border border-border/80 surface p-6 md:grid-cols-[auto_1fr_1fr] md:p-8">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-2xl font-semibold text-primary/70">{s.step}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </div>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-white">{s.title}</h2>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
                <div className="overflow-hidden rounded-xl border border-border/60">
                  <img src={[IMAGES.classroom, IMAGES.kids, IMAGES.court, IMAGES.graduation][i]} alt="" className="h-36 w-full object-cover opacity-85" loading="lazy" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border/70 bg-[#080410]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-white">Built into every campaign</h2>
            <ul className="mt-6 space-y-3">
              {[
                "Approval workflow before a campaign goes live",
                "Personal participant pages with individual goals",
                "Live leaderboards for teams and sellers",
                "Automatic donor thank-you messages",
                "Exportable reports for your board",
                "Clean payouts with a full transaction trail",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-silver">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/80 surface p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Timeline</p>
            <div className="mt-5 space-y-5">
              {[
                { d: "Day 1", t: "Campaign created", b: "Goal, story and imagery are set in about twenty minutes." },
                { d: "Day 2", t: "Team invited", b: "Coaches, captains and advisors added with permissions." },
                { d: "Day 3", t: "Launch", b: "Participants share their personal pages with family and friends." },
                { d: "Week 4", t: "Goal reached", b: "Funds are reconciled and a payout is scheduled." },
              ].map((row) => (
                <div key={row.d} className="flex gap-4">
                  <span className="w-16 shrink-0 font-mono text-[11px] text-primary">{row.d}</span>
                  <div>
                    <p className="text-[13px] font-semibold text-white">{row.t}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{row.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-5 py-20 text-center">
        <h2 className="font-heading text-3xl font-semibold text-white">Ready to see it with your own campaign?</h2>
        <p className="mx-auto mt-3 max-w-lg text-[14px] text-muted-foreground">Set up a school account and publish your first fundraiser in the same afternoon.</p>
        <Link to="/register-school" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow hover:bg-primary/90">
          Start Fundraising <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}