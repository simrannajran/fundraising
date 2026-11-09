import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { resourceLinks } from "@/data/mock";

export function ResourcesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[12.5px] font-medium text-muted-foreground transition-colors hover:text-white"
      >
        Resources
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <nav className="absolute right-0 top-full z-50 mt-2 min-w-44 rounded-xl border border-border bg-[#100a1b] p-1 shadow-xl">
          {resourceLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-silver transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

export function ResourcesMobile() {
  return (
    <div className="mt-2 border-t border-border/70 pt-3">
      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Resources
      </p>
      {resourceLinks.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-silver hover:bg-white/[0.04] hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
