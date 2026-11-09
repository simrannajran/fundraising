import { createFileRoute, Outlet } from "@tanstack/react-router";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-[72px]">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}