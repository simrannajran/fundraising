import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FilterDropdown({ label, value, options, onChange, className }) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-border bg-white/[0.03] pl-3.5 pr-9 text-[13px] font-medium text-silver focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => {
          const val = typeof o === "string" ? o : o.value;
          const text = typeof o === "string" ? o : o.label;
          return (
            <option key={val} value={val} className="bg-[#0b0616] text-white">
              {text}
            </option>
          );
        })}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </label>
  );
}