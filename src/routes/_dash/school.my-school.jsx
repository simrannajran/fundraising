import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, GraduationCap, MapPin, Users } from "lucide-react";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import { SettingsCard, SaveBar, TextField, ToggleRow } from "@/components/dashboards/SettingsPanels";
import { schools, IMAGES } from "@/data/mock";

export const Route = createFileRoute("/_dash/school/my-school")({
  head: () => ({ meta: [{ title: "My School — RampUp Fundraising" }] }),
  component: MySchool,
});

function MySchool() {
  const school = schools[0];
  return (
    <>
      <DashPageHeader title="My school" subtitle="Profile, branding and the details donors see on every campaign." />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-border/80 surface">
          <img src={IMAGES.classroom} alt="Northgate High School" className="h-44 w-full object-cover" />
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-heading text-lg font-semibold text-white">{school.name}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {school.city}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
                <BadgeCheck className="h-3 w-3" /> Verified
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: GraduationCap, label: "Students", value: school.students.toLocaleString("en-US") },
                { icon: Users, label: "Participants", value: "146" },
                { icon: BadgeCheck, label: "Campaigns", value: school.campaigns },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border/70 bg-white/[0.02] px-3 py-2.5">
                  <s.icon className="h-3.5 w-3.5 text-primary" />
                  <p className="mt-1.5 font-heading text-[14px] font-semibold text-white">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
              Northgate High School serves 1,420 students across 14 athletic programs and 22 clubs. Campaigns are managed by the athletics office with advisor approval.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <SettingsCard title="School profile" description="Appears on campaign and team pages.">
            <TextField label="School name" defaultValue={school.name} />
            <TextField label="Location" defaultValue={school.city} />
            <TextField label="School type" defaultValue={school.type} />
            <TextField label="Website" defaultValue="northgate.edu" />
          </SettingsCard>
          <SettingsCard title="Public page" description="What supporters see.">
            <ToggleRow label="Show donor names publicly" description="Anonymous gifts always stay hidden." defaultOn />
            <ToggleRow label="Show participant leaderboard" description="Rank participants by amount raised." defaultOn />
            <ToggleRow label="Allow participant page edits" description="Participants can update their own message and photo." defaultOn />
            <SaveBar />
          </SettingsCard>
        </div>
      </div>
    </>
  );
}