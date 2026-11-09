import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SettingsCard({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-border/80 surface p-5">
      <h2 className="font-heading text-[13.5px] font-semibold text-white">{title}</h2>
      {description && <p className="mt-1 text-[12px] text-muted-foreground">{description}</p>}
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

export function ToggleRow({ label, description, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/40 pb-3 last:border-0 last:pb-0">
      <div>
        <p className="text-[12.5px] font-medium text-white">{label}</p>
        {description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", on ? "bg-primary" : "bg-white/15")}
      >
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform", on ? "translate-x-[18px]" : "translate-x-0.5")} />
      </button>
    </div>
  );
}

export function TextField({ label, defaultValue, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-1.5 h-10 w-full rounded-lg border border-border bg-white/[0.03] px-3 text-[12.5px] text-white placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none"
      />
    </label>
  );
}

export function SaveBar({ label = "Save changes" }) {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
      <button type="button" className="rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">Cancel</button>
      <button
        type="button"
        onClick={() => toast("Settings saved locally", { description: "This prototype does not persist settings to a server." })}
        className="rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-primary/90"
      >
        {label}
      </button>
    </div>
  );
}