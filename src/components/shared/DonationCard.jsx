import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart } from "lucide-react";
import { formatCurrency, formatDate, initials } from "@/lib/format";

export default function DonationCard({ donation }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-white/[0.02] px-4 py-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/12 text-[10px] font-bold text-accent ring-1 ring-inset ring-primary/20">
        {donation.anonymous ? <Heart className="h-3.5 w-3.5" /> : initials(donation.donor)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[12.5px] font-medium text-white">{donation.anonymous ? "Anonymous supporter" : donation.donor}</p>
          <p className="shrink-0 font-mono text-[12px] font-semibold text-accent">{formatCurrency(donation.amount)}</p>
        </div>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{donation.campaign}</p>
        {donation.message && <p className="mt-1.5 line-clamp-2 text-[11.5px] italic text-silver/80">"{donation.message}"</p>}
        <p className="mt-1 text-[10.5px] text-white/30">{formatDate(donation.date)}</p>
      </div>
    </div>
  );
}

export function RecentDonations({ donations, title = "Recent donations", limit }) {
  const rows = limit ? donations.slice(0, limit) : donations;
  return (
    <div className="rounded-2xl border border-border/80 surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-[13.5px] font-semibold text-white">{title}</h3>
        <Link to="/school/donations" className="inline-flex items-center gap-1 text-[11.5px] font-medium text-accent">
          All <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {rows.map((d) => (
          <DonationCard key={d.id} donation={d} />
        ))}
      </div>
    </div>
  );
}