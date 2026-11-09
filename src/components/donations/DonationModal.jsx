import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/components/shared/Modal";
import DonationForm from "@/components/donations/DonationForm";
import DemoNotice from "@/components/shared/DemoNotice";

export default function DonationModal({ open, onClose, campaignTitle, defaultAmount }) {
  const [done, setDone] = useState(null);
  const close = () => {
    setDone(null);
    onClose();
  };
  return (
    <Modal open={open} onClose={close} title={done ? "Checkout preview" : "Make a donation"} description={done ? undefined : campaignTitle}>
      {done ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-primary/25 bg-primary/[0.07] p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-accent">Next step would be payment</p>
            <p className="mt-2 text-[13px] text-silver">
              {done.anonymous ? "Anonymous" : done.name} · {done.frequency === "recurring" ? "monthly" : "one-time"} gift of{" "}
              <span className="font-mono font-semibold text-white">${done.amount}</span>
            </p>
            <p className="mt-1 text-[11.5px] text-muted-foreground">Receipt would go to {done.email}</p>
          </div>
          <DemoNotice>
            No payment was processed and no donation was recorded. Connect a payment provider to complete this flow.
          </DemoNotice>
          <button type="button" onClick={close} className="w-full rounded-xl border border-border py-3 text-[13px] font-semibold text-silver hover:text-white">
            Close preview
          </button>
        </div>
      ) : (
        <DonationForm
          campaignTitle={campaignTitle}
          defaultAmount={defaultAmount}
          onContinue={(payload) => {
            setDone(payload);
            toast("Checkout preview ready", { description: "No payment is processed in this prototype." });
          }}
        />
      )}
    </Modal>
  );
}