import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react";
import { LOGO, navLinks } from "@/data/mock";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { ResourcesMenu, ResourcesMobile } from "@/components/layout/ResourcesMenu";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border/70 bg-[#0a0512]/85 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-5 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src={LOGO} alt="RampUp Fundraising" className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/10" />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-heading text-[15px] font-extrabold italic tracking-tight text-metal">RAMPUP</span>
            <span className="text-[8.5px] font-semibold uppercase tracking-[0.34em] text-primary/90">Fundraising</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-lg px-2.5 py-2 text-[12.5px] font-medium transition-colors",
                pathname === l.to ? "text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
          <ResourcesMenu />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/login"
            className="hidden rounded-xl px-3.5 py-2 text-[13px] font-medium text-silver transition-colors hover:text-white sm:block"
          >
            Login
          </Link>
          <Link
            to="/register-school"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_10px_30px_-10px_hsl(271_86%_58%/0.9)]"
          >
            Start Fundraising
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border text-silver lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "" : "pointer-events-none")}>
        <div
          onClick={() => setOpen(false)}
          className={cn("absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity", open ? "opacity-100" : "opacity-0")}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-[86%] max-w-[360px] flex-col border-l border-border bg-[#0b0616] transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Menu</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-silver">
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-silver hover:bg-white/[0.04] hover:text-white"
              >
                {l.label}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
            <ResourcesMobile />
          </nav>
          <div className="space-y-2 border-t border-border p-5">
            <div className="mb-2 flex items-center justify-between rounded-xl border border-border px-4 py-2">
              <span className="text-sm text-silver">Appearance</span>
              <ThemeToggle className="h-9 w-9 border-0" />
            </div>
            <Link to="/login" className="block rounded-xl border border-border px-4 py-3 text-center text-sm font-medium text-silver">
              Login
            </Link>
            <Link to="/register-school" className="block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">
              Start Fundraising
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}