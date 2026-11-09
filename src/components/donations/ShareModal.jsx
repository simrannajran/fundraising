import { useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Facebook, Linkedin, Mail, MessageCircle, Twitter } from "lucide-react";
import Modal from "@/components/shared/Modal";

export default function ShareModal({ open, onClose, title, slug }) {
  const [copied, setCopied] = useState(false);
  const url = `rampup.demo/campaign/${slug}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${url}`);
      setCopied(true);
      toast("Link copied", { description: "Demo link copied to the clipboard." });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
    }
  };
  return (
    <Modal open={open} onClose={onClose} title="Share this campaign" description={title}>
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-3 py-2.5">
          <input readOnly value={url} className="flex-1 truncate bg-transparent text-[12.5px] text-silver focus:outline-none" />
          <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11.5px] font-semibold text-white">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Facebook, label: "Facebook" },
            { icon: Twitter, label: "X" },
            { icon: MessageCircle, label: "WhatsApp" },
            { icon: Mail, label: "Email" },
          ].map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => toast("Sharing preview", { description: `${s.label} sharing opens once the campaign is published.` })}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border py-3 text-[10.5px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-white"
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-white/[0.02] px-3.5 py-3">
          <Linkedin className="h-4 w-4 text-muted-foreground" />
          <p className="text-[11.5px] leading-relaxed text-muted-foreground">Social sharing is a visual control in this prototype — links will work once campaigns are published.</p>
        </div>
      </div>
    </Modal>
  );
}