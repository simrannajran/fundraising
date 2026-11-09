import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Modal({ open, onClose, title, description, children, className, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 animate-fade bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-border bg-[#0b0616] shadow-2xl scrollbar-thin sm:max-w-lg sm:rounded-2xl",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h3 className="font-heading text-base font-semibold text-white">{title}</h3>
            {description && <p className="mt-1 text-[12.5px] text-muted-foreground">{description}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
        {footer && <div className="border-t border-border px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}