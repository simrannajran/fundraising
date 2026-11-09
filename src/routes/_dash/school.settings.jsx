import { createFileRoute } from "@tanstack/react-router";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import { SettingsCard, SaveBar, TextField, ToggleRow } from "@/components/dashboards/SettingsPanels";

export const Route = createFileRoute("/_dash/school/settings")({
  head: () => ({ meta: [{ title: "Settings — School" }] }),
  component: SchoolSettings,
});

function SchoolSettings() {
  return (
    <>
      <DashPageHeader title="Settings" subtitle="Your account, notifications and payout details." />
      <div className="grid gap-4 xl:grid-cols-2">
        <SettingsCard title="Administrator profile" description="The primary contact for this school account.">
          <TextField label="Full name" defaultValue="Diane Reyes" />
          <TextField label="Email" defaultValue="d.reyes@northgate.edu" type="email" />
          <TextField label="Phone" defaultValue="(503) 555-0142" />
          <TextField label="Role" defaultValue="Athletic director" />
        </SettingsCard>

        <SettingsCard title="Payout details" description="Where funds are deposited after settlement.">
          <TextField label="Account holder" defaultValue="Northgate High School Athletics" />
          <TextField label="Bank" defaultValue="First Cascade Bank" />
          <TextField label="Account ending" defaultValue="•••• 4821" />
          <TextField label="Payout schedule" defaultValue="Monthly, 1st business day" />
        </SettingsCard>

        <SettingsCard title="Notifications">
          <ToggleRow label="Donation received" description="Email me each time a gift arrives." defaultOn />
          <ToggleRow label="Campaign milestones" description="Alert me at 50%, 75% and 100% of goal." defaultOn />
          <ToggleRow label="Participant activity" description="Weekly summary of participant progress." />
          <ToggleRow label="Payout confirmations" defaultOn />
        </SettingsCard>

        <SettingsCard title="Team preferences">
          <ToggleRow label="Allow coaches to invite participants" defaultOn />
          <ToggleRow label="Require advisor approval for new teams" defaultOn />
          <ToggleRow label="Let participants edit their page" defaultOn />
          <ToggleRow label="Show donor email addresses in reports" />
        </SettingsCard>
      </div>
      <div className="mt-4"><SaveBar /></div>
    </>
  );
}