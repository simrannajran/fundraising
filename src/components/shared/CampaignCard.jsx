import { Link } from "@tanstack/react-router";
import { Users, Clock, ArrowRight } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { formatCurrency, percent } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function CampaignCard({ campaign, className }) {
  const pct = percent(campaign.raised, campaign.goal);
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border/80 surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_30px_70px_-40px_hsl(271_86%_58%/0.8)]",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={campaign.cover}
          alt={campaign.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0512] via-[#0a0512]/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
          {campaign.category}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
          {pct}%
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{campaign.school}</p>
        <h3 className="mt-1.5 font-heading text-[17px] font-semibold leading-snug text-white">{campaign.title}</h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{campaign.summary}</p>

        <div className="mt-auto pt-4">
          <p className="text-[15px] font-semibold text-white">
            {formatCurrency(campaign.raised)}{" "}
            <span className="text-[11.5px] font-normal text-muted-foreground">raised of {formatCurrency(campaign.goal)}</span>
          </p>
          <ProgressBar className="mt-2" raised={campaign.raised} goal={campaign.goal} />
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" /> {campaign.supporters} supporters
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {campaign.deadline}
            </span>
          </div>
        </div>

        <Link
          to="/campaign/$slug"
          params={{ slug: campaign.slug }}
          className="mt-4 inline-flex items-center justify-between rounded-xl border border-border px-3.5 py-2.5 text-[13px] font-medium text-silver transition-colors group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-white"
        >
          View campaign
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}