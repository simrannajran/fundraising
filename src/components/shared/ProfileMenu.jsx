import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, LogOut, LayoutDashboard, User, Settings, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "School dashboard", to: "/school/dashboard", icon: LayoutDashboard },
  { label: "Participant dashboard", to: "/participant/dashboard", icon: User },
  { label: "Donor dashboard", to: "/donor/dashboard", icon: Heart },
  { label: "Admin dashboard", to: "/admin/dashboard", icon: Settings },
];

export default function ProfileMenu({ name = "Diane Reyes", role = "School admin", initials = "DR" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-xl border border-border bg-white/[0.03] py-1.5 pl-1.5 pr-2.5 text-left transition-colors hover:border-primary/40"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/20 text-[10.5px] font-bold text-accent">{initials}</span>
        <span className="hidden leading-tight sm:block">
          <span className="block text-[12px] font-medium text-white">{name}</span>
          <span className="block text-[10px] text-muted-foreground">{role}</span>
        </span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-[#0d0819] py-1.5 shadow-2xl">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] text-silver hover:bg-white/[0.05] hover:text-white"
              >
                <l.icon className="h-3.5 w-3.5 text-muted-foreground" /> {l.label}
              </Link>
            ))}
            <div className="my-1.5 rule-fade" />
            <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] text-silver hover:bg-white/[0.05] hover:text-white">
              <LogOut className="h-3.5 w-3.5 text-muted-foreground" /> Sign out
            </Link>
          </div>
        </>
      )}
    </div>
  );
}