import { cn } from "@/lib/utils";

export default function DashPageHeader({ title, subtitle, actions, className }) {
  return (
    <div className={cn("mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        <h1 className="font-heading text-xl font-semibold text-white sm:text-2xl">{title}</h1>
        {subtitle && <p className="mt-1 text-[12.5px] text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}