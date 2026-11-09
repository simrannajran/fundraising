import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import TeamCard from "@/components/shared/TeamCards";
import { teams } from "@/data/mock";

export const Route = createFileRoute("/_dash/school/teams/")({
  head: () => ({ meta: [{ title: "Teams — School" }] }),
  component: SchoolTeams,
});

function SchoolTeams() {
  return (
    <>
      <DashPageHeader
        title="Teams"
        subtitle="Every team raising under your school, with its own goal and roster."
        actions={
          <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-primary/90">
            <Plus className="h-3.5 w-3.5" /> Add team
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {teams.map((t) => (
          <TeamCard key={t.id} team={t} />
        ))}
      </div>
    </>
  );
}