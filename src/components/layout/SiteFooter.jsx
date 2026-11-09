import { Link } from "@tanstack/react-router";
import { LOGO } from "@/data/mock";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Fundraising Solutions", to: "/solutions" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "Explore Campaigns", to: "/campaigns" },
      { label: "Product Fundraising", to: "/product-fundraising" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Success Stories", to: "/success-stories" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Start Fundraising", to: "/register-school" },
      { label: "Login", to: "/login" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-[#080410]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={LOGO} alt="RampUp Fundraising" className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/10" />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-base font-extrabold italic tracking-tight text-metal">RAMPUP</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-primary/90">Fundraising</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              We raise. You coach. They win. A school fundraising platform built for teams, clubs and the communities behind them.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <span key={i} className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 RampUp Fundraising. Demonstration product experience.</p>
          <div className="flex flex-wrap items-center gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
            <span className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/50">Demo data</span>
          </div>
        </div>
      </div>
    </footer>
  );
}