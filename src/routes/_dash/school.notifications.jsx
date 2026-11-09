import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCheck } from "lucide-react";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import EmptyState from "@/components/shared/EmptyState";
import { notifications } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dash/school/notifications")({
  head: () => ({ meta: [{ title: "Notifications — School" }] }),
  component: SchoolNotifications,
});

function SchoolNotifications() {
  const [items, setItems] = useState(notifications);
  const unread = items.filter((n) => n.unread).length;
  return (
    <>
      <DashPageHeader
        title="Notifications"
        subtitle={`${unread} unread update${unread === 1 ? "" : "s"}`}
        actions={
          <button type="button" onClick={() => setItems(items.map((n) => ({ ...n, unread: false })))} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-silver hover:text-white">
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        }
      />
      {items.length ? (
        <ul className="space-y-2">
          {items.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => setItems(items.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                className={cn("flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors", n.unread ? "border-primary/25 bg-primary/[0.06]" : "border-border/70 surface")}
              >
                <span className={cn("mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg", n.unread ? "bg-primary/20 text-accent" : "bg-white/[0.04] text-muted-foreground")}>
                  <Bell className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-semibold text-white">{n.title}</p>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-[10.5px] text-white/30">{n.time}</p>
                </div>
                {n.unread && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="You're all caught up" body="New donations, milestones and team updates will appear here." />
      )}
    </>
  );
}