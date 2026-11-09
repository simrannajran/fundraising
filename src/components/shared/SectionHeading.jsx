import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, body, align = "left", className, action }) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto max-w-2xl text-center")}>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.12] text-white sm:text-[38px]">{title}</h2>
        {body && <p className="mt-3.5 text-[15px] leading-relaxed text-muted-foreground">{body}</p>}
      </div>
      {action}
    </div>
  );
}