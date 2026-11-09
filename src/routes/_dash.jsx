import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import DashboardShell from "@/components/dashboards/DashboardShell";
import { areaConfig } from "@/components/dashboards/navConfig";

export const Route = createFileRoute("/_dash")({
  component: DashLayout,
});

function DashLayout() {
  const { pathname } = useLocation();
  const area = pathname.startsWith("/admin")
    ? "admin"
    : pathname.startsWith("/participant")
      ? "participant"
      : pathname.startsWith("/donor")
        ? "donor"
        : "school";
  const cfg = areaConfig[area];
  return (
    <DashboardShell nav={cfg.nav} area={cfg.label} user={cfg.user}>
      <Outlet />
    </DashboardShell>
  );
}