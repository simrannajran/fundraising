import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Bell, ChevronRight, Menu, Search, X, LifeBuoy } from "lucide-react";
import ProfileMenu from "@/components/shared/ProfileMenu";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { LOGO, notifications } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function DashboardShell({ nav, area, user, children }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between gap-2 border-b border-border/70 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={LOGO} alt="RampUp" className="h-8 w-8 rounded-lg object-cover ring-1 ring-white/10" />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-[12px] font-extrabold italic tracking-tight text-metal">RAMPUP</span>
            <span className="text-[7.5px] font-semibold uppercase tracking-[0.3em] text-primary/90">Fundraising</span>
          </span>
        </Link>
        <button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground lg:hidden">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-3 py-3">
        <div className="rounded-xl border border-border/70 bg-white/[0.02] px-3 py-2">
          <p className="text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">Workspace</p>
          <p className="mt-0.5 truncate text-[12px] font-medium text-white">{area}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4 scrollbar-thin">
        {nav.map((item) => {
          const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[12.5px] transition-colors",
                active ? "bg-primary/12 font-medium text-white ring-1 ring-inset ring-primary/25" : "text-muted-foreground hover:bg-white/[0.04] hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4", active ? "text-accent" : "text-muted-foreground group-hover:text-silver")} strokeWidth={1.75} />
              <span className="flex-1 truncate">{item.label}</span>
              {active && <ChevronRight className="h-3 w-3 text-accent" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/70 p-3">
        <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-3">
          <LifeBuoy className="h-4 w-4 text-accent" />
          <p className="mt-2 text-[11.5px] font-semibold text-white">Need a hand?</p>
          <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted-foreground">Your campaign coach replies within one business day.</p>
          <Link to="/contact" className="mt-2 inline-block text-[10.5px] font-semibold text-accent hover:text-white">Contact support →</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-border/70 bg-[#080410] lg:block">{sidebar}</aside>

      <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "" : "pointer-events-none")}>
        <div onClick={() => setOpen(false)} className={cn("absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity", open ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute inset-y-0 left-0 w-[280px] border-r border-border bg-[#080410] transition-transform duration-300", open ? "translate-x-0" : "-translate-x-full")}>
          {sidebar}
        </div>
      </div>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-[#0a0512]/90 px-4 backdrop-blur-xl lg:px-6">
          <button type="button" onClick={() => setOpen(true)} aria-label="Open sidebar" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-silver lg:hidden">
            <Menu className="h-4 w-4" />
          </button>

          <div className="relative hidden flex-1 max-w-sm sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search campaigns, donors, teams…"
              className="h-9 w-full rounded-lg border border-border bg-white/[0.03] pl-9 pr-3 text-[12.5px] text-white placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link to="/school/notifications" className="relative grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-white">
              <Bell className="h-4 w-4" />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />}
            </Link>
            <ThemeToggle className="h-9 w-9" />
            <ProfileMenu name={user.name} role={user.role} initials={user.initials} />
          </div>
        </header>

        <main className="px-4 py-6 lg:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}