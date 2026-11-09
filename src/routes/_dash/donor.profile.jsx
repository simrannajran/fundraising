import { createFileRoute } from "@tanstack/react-router";
import DashPageHeader from "@/components/dashboards/DashPageHeader";
import { SettingsCard, SaveBar, TextField, ToggleRow } from "@/components/dashboards/SettingsPanels";
import { donorHistory } from "@/data/mock";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_dash/donor/profile")({
  head: () => ({ meta: [{ title: "Donor Profile — RampUp" }] }),
  component: DonorProfile,
});

function DonorProfile() {
  return (
    <>
      <DashPageHeader title="Profile settings" subtitle="Your details, receipts and communication preferences." />
      <div className="grid gap-4 xl:grid-cols-2">
        <SettingsCard title="Personal details" description="Used on donor receipts and thank-you messages.">
          <TextField label="Full name" defaultValue="Jordan Avery" />
          <TextField label="Email" defaultValue="jordan.avery@example.com" type="email" />
          <TextField label="Phone" defaultValue="(512) 555-0166" />
          <TextField label="Mailing address" defaultValue="412 Live Oak Drive, Austin, TX" />
          <SaveBar label="Save profile" />
        </SettingsCard>

        <div className="space-y-4">
          <SettingsCard title="Receipts & communication">
            <ToggleRow label="Email annual giving summary" description="A single statement each January." defaultOn />
            <ToggleRow label="Notify me about campaign updates" defaultOn />
            <ToggleRow label="School newsletters" />
            <ToggleRow label="Show my name on campaign pages" description="Turn off to give anonymously by default." defaultOn />
          </SettingsCard>

          <div className="rounded-2xl border border-border/80 surface p-5">
            <h2 className="font-heading text-[13.5px] font-semibold text-white">Giving summary</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-border/70 bg-white/[0.02] px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Lifetime</p>
                <p className="mt-0.5 font-heading text-[15px] font-semibold text-white">{formatCurrency(donorHistory.reduce((a, d) => a + d.amount, 0))}</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-white/[0.02] px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Gifts</p>
                <p className="mt-0.5 font-heading text-[15px] font-semibold text-white">{donorHistory.length}</p>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">Payment methods are never stored in this prototype.</p>
          </div>
        </div>
      </div>
    </>
  );
}