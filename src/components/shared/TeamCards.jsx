import { Link } from "@tanstack/react-router";
import { Users, ArrowRight, Trophy } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { formatCurrency, percent } from "@/lib/format";

export default function TeamCard({ team }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 surface transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="relative h-40 overflow-hidden">
        <img src={team.image} alt={team.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0616] via-[#0b0616]/20 to-transparent" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
          <Users className="h-3 w-3" /> {team.participants}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">{team.school}</p>
        <h3 className="mt-1.5 font-heading text-[15px] font-semibold text-white">{team.name}</h3>
        <div className="mt-4">
          <div className="flex items-baseline justify-between text-[11px]">
            <span className="font-semibold text-white">{formatCurrency(team.raised)}</span>
            <span className="text-muted-foreground">of {formatCurrency(team.goal)}</span>
          </div>
          <ProgressBar className="mt-2 h-1.5" raised={team.raised} goal={team.goal} />
          <p className="mt-2 font-mono text-[11px] text-accent">{percent(team.raised, team.goal)}% funded</p>
        </div>
        <Link
          to="/team/$slug"
          params={{ slug: team.slug }}
          className="mt-4 inline-flex items-center justify-between rounded-xl border border-border px-3.5 py-2.5 text-[12.5px] font-medium text-silver transition-colors hover:border-primary/50 hover:text-white"
        >
          View Team <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

export function ParticipantCard({ p }) {
  const pct = percent(p.raised, p.goal);
  return (
    <div className="rounded-2xl border border-border/80 surface p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 font-heading text-[12px] font-bold text-accent ring-1 ring-inset ring-primary/25">
          {p.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-heading text-[13.5px] font-semibold text-white">{p.name}</p>
          <p className="truncate text-[11px] text-muted-foreground">{p.role}</p>
        </div>
        <span className="ml-auto font-mono text-[11px] font-semibold text-accent">{pct}%</span>
      </div>
      <div className="mt-3">
        <ProgressBar className="h-1.5" raised={p.raised} goal={p.goal} />
        <div className="mt-2 flex justify-between text-[11px]">
          <span className="text-silver">{formatCurrency(p.raised)}</span>
          <span className="text-muted-foreground">goal {formatCurrency(p.goal)}</span>
        </div>
      </div>
      <Link to="/fundraiser/$slug" params={{ slug: p.slug }} className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-semibold text-accent hover:text-white">
        View page <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

export function Leaderboard({ rows, title = "Team leaderboard" }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 surface">
      <div className="flex items-center gap-2 border-b border-border/80 px-5 py-3.5">
        <Trophy className="h-3.5 w-3.5 text-amber-300" />
        <h3 className="font-heading text-[13px] font-semibold text-white">{title}</h3>
      </div>
      <ul className="divide-y divide-border/50">
        {rows.map((r, i) => (
          <li key={r.id ?? r.name} className="flex items-center gap-3 px-5 py-3">
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md font-mono text-[11px] font-semibold ${i === 0 ? "bg-amber-400/15 text-amber-300" : "bg-white/[0.05] text-muted-foreground"}`}>
              {i + 1}
            </span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/12 text-[10px] font-bold text-accent ring-1 ring-inset ring-primary/20">
              {r.initials || r.name?.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-medium text-white">{r.name}</p>
              <div className="mt-1">
                <ProgressBar className="h-1" raised={r.raised} goal={r.goal} />
              </div>
            </div>
            <span className="shrink-0 font-mono text-[11.5px] font-semibold text-silver">{formatCurrency(r.raised)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}