import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-white disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={cn(
            "h-9 min-w-9 rounded-lg border px-3 text-[13px] font-medium transition-colors",
            p === page ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:text-white"
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-white disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}