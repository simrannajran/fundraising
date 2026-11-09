import { useState } from "react";
import { Lock, Heart, Mail, User, MessageSquare } from "lucide-react";
import { donationPresets } from "@/data/mock";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import DemoNotice from "@/components/shared/DemoNotice";

export default function DonationForm({ campaignTitle, defaultAmount = 50, onContinue }) {
  const [amount, setAmount] = useState(defaultAmount);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [anonymous, setAnonymous] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);

  const finalAmount = custom ? Number(custom) || 0 : amount;

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Enter the name for this gift.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (finalAmount < 1) next.amount = "Choose an amount of at least $1.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPending(true);
    setTimeout(() => {
      setPending(false);
      onContinue?.({ amount: finalAmount, frequency, anonymous, ...form });
    }, 650);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Donation amount</p>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {donationPresets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => { setAmount(p); setCustom(""); }}
              className={cn(
                "rounded-xl border py-2.5 font-mono text-[13px] font-semibold transition-colors",
                !custom && amount === p ? "border-primary bg-primary/15 text-white" : "border-border text-silver hover:border-primary/40"
              )}
            >
              ${p}
            </button>
          ))}
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted-foreground">$</span>
            <input
              type="number"
              min="1"
              inputMode="decimal"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Custom"
              className={cn(
                "h-full w-full rounded-xl border bg-transparent pl-6 pr-2 text-[13px] font-semibold text-white placeholder:font-normal placeholder:text-muted-foreground/70 focus:outline-none",
                custom ? "border-primary" : "border-border focus:border-primary/60"
              )}
            />
          </div>
        </div>
        {errors.amount && <p className="mt-1.5 text-[11px] text-red-400">{errors.amount}</p>}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { key: "one-time", label: "One-time" },
          { key: "recurring", label: "Monthly" },
        ].map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => setFrequency(o.key)}
            className={cn(
              "rounded-xl border py-2.5 text-[12.5px] font-medium transition-colors",
              frequency === o.key ? "border-primary bg-primary/15 text-white" : "border-border text-muted-foreground hover:text-white"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <Field icon={User} error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="h-11 w-full bg-transparent pl-9 pr-3 text-[13px] text-white placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </Field>
        <Field icon={Mail} error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email for your receipt"
            className="h-11 w-full bg-transparent pl-9 pr-3 text-[13px] text-white placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </Field>
        <Field icon={MessageSquare}>
          <textarea
            rows={2}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Leave a message of support (optional)"
            className="w-full resize-none bg-transparent py-2.5 pl-9 pr-3 text-[13px] text-white placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </Field>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-[12.5px] text-muted-foreground">
        <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-4 w-4 rounded border-border bg-transparent accent-[hsl(271_86%_58%)]" />
        Give anonymously
      </label>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
      >
        <Heart className="h-4 w-4" />
        {pending ? "Opening checkout…" : `Continue with ${formatCurrency(finalAmount)}`}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/35">
        <Lock className="h-3 w-3" /> Checkout is not connected in this prototype
      </div>
      <DemoNotice>
        Supporting <span className="text-white">{campaignTitle}</span>. Payment processing is intentionally not wired up yet — this form only demonstrates the donation experience.
      </DemoNotice>
    </form>
  );
}

function Field({ icon: Icon, children, error }) {
  return (
    <div>
      <div className={cn("relative overflow-hidden rounded-xl border bg-white/[0.03] focus-within:border-primary/60", error ? "border-red-500/60" : "border-border")}>
        <Icon className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
        {children}
      </div>
      {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
    </div>
  );
}