import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBar({ value, onChange, placeholder = "Search…", className, inputClassName }) {
  return (
    <div className={cn("relative flex-1", className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-11 w-full rounded-xl border border-border bg-white/[0.03] pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20",
          inputClassName
        )}
      />
    </div>
  );
}