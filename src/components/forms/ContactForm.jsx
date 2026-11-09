import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";
import DemoNotice from "@/components/shared/DemoNotice";
import { cn } from "@/lib/utils";

const inquiryTypes = ["Start a campaign", "Sports teams", "Product fundraising", "School onboarding", "General question"];
const fields = [
  { name: "name", label: "Full name", placeholder: "Jordan Alvarez", type: "text" },
  { name: "email", label: "Email", placeholder: "you@school.edu", type: "email" },
  { name: "school", label: "School / organization", placeholder: "Northgate High School", type: "text" },
  { name: "phone", label: "Phone", placeholder: "(503) 555-0100", type: "tel" },
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", school: "", phone: "", type: inquiryTypes[0], message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.school.trim()) next.school = "Required";
    if (form.message.trim().length < 10) next.message = "Tell us a little more (10+ characters)";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
    toast("Message saved as a draft", { description: "This form is a frontend prototype — nothing was sent." });
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.05] p-8">
        <CheckCircle2 className="h-7 w-7 text-emerald-400" />
        <h2 className="mt-4 font-heading text-xl font-semibold text-white">Your details are validated</h2>
        <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-silver">
          This contact form is a frontend prototype, so no message was delivered. Connect your inbox or CRM to start receiving real inquiries.
        </p>
        <button type="button" onClick={() => setSent(false)} className="mt-6 rounded-xl border border-border px-4 py-2.5 text-[12.5px] font-semibold text-silver hover:text-white">
          Edit and send again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border/80 surface p-6">
      <h2 className="font-heading text-lg font-semibold text-white">Send us a message</h2>
      <p className="mt-1 text-[12.5px] text-muted-foreground">All fields marked with an asterisk are required.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className="block">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">{f.label} *</span>
            <input
              type={f.type}
              value={form[f.name]}
              onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
              placeholder={f.placeholder}
              className={cn("mt-1.5 h-11 w-full rounded-xl border bg-white/[0.03] px-3.5 text-[13px] text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20", errors[f.name] ? "border-red-500/60" : "border-border focus:border-primary/60")}
            />
            {errors[f.name] && <span className="mt-1 block text-[11px] text-red-400">{errors[f.name]}</span>}
          </label>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Inquiry type</span>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="mt-1.5 h-11 w-full rounded-xl border border-border bg-white/[0.03] px-3.5 text-[13px] text-silver focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {inquiryTypes.map((t) => (
            <option key={t} value={t} className="bg-[#0b0616]">{t}</option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Message *</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="What are you raising for, and when would you like to launch?"
          className={cn("mt-1.5 w-full resize-none rounded-xl border bg-white/[0.03] px-3.5 py-3 text-[13px] text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20", errors.message ? "border-red-500/60" : "border-border focus:border-primary/60")}
        />
        {errors.message && <span className="mt-1 block text-[11px] text-red-400">{errors.message}</span>}
      </label>

      <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90">
        <Send className="h-3.5 w-3.5" /> Send message
      </button>

      <DemoNotice className="mt-5">Frontend-only form — no message is transmitted.</DemoNotice>
    </form>
  );
}