import { Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Users2, HeartHandshake } from "lucide-react";

const paths = [
  {
    icon: GraduationCap,
    title: "Schools & teams",
    body: "Launch a campaign, invite your participants and watch every team hit its goal.",
    cta: "Start a campaign",
    to: "/register-school",
  },
  {
    icon: Users2,
    title: "Participants & captains",
    body: "Get your own fundraiser page with a personal goal, story and shareable link.",
    cta: "See how it works",
    to: "/how-it-works",
  },
  {
    icon: HeartHandshake,
    title: "Donors & supporters",
    body: "Find a campaign in your community and give in under a minute — no account needed.",
    cta: "Explore campaigns",
    to: "/campaigns",
  },
];

export default function AudiencePaths() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-14 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">Start where you are</h2>
        <p className="text-[13px] text-muted-foreground">One platform, three clear paths — pick the one that fits today.</p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {paths.map((p) => (
          <Link
            key={p.title}
            to={p.to}
            className="group flex flex-col rounded-2xl border border-border/80 surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-inset ring-primary/25">
                <p.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
            <h3 className="mt-4 font-heading text-[15px] font-semibold text-white">{p.title}</h3>
            <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">{p.body}</p>
            <span className="mt-4 text-[12px] font-semibold text-accent group-hover:text-white">{p.cta}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}