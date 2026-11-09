import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Building2, UserCog, FileCheck2 } from "lucide-react";
import { toast } from "sonner";
import { LOGO } from "@/data/mock";
import DemoNotice from "@/components/shared/DemoNotice";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register-school")({
  head: () => ({ meta: [{ title: "Register Your School — RampUp Fundraising" }] }),
  component: RegisterSchoolPage,
});

const steps = [
  { title: "School details", icon: Building2 },
  { title: "Administrator", icon: UserCog },
  { title: "Verification", icon: FileCheck2 },
  { title: "Review", icon: Check },
];

const input = "mt-1.5 h-11 w-full rounded-xl border border-border bg-white/[0.03] px-3.5 text-[13px] text-white placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20";

function RegisterSchoolPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    school: "", type: "Public high school", city: "", state: "", students: "", website: "",
    name: "", role: "Athletic director", email: "", phone: "",
    ein: "", district: "", verifyMethod: "District email domain",
  });
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const next = () => {
    if (step === 0 && (!data.school || !data.city)) return toast("Add your school name and city to continue.");
    if (step === 1 && (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) return toast("Add a contact name and a valid email.");
    if (step === 2 && !data.district) return toast("Tell us the district or governing body.");
    if (step === 3) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-5 py-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade opacity-40" />
        <div className="absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-[860px]">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </Link>

        <div className="mt-6 flex items-center gap-2.5">
          <img src={LOGO} alt="RampUp Fundraising" className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/10" />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-[13px] font-extrabold italic tracking-tight text-metal">RAMPUP</span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-primary/90">Fundraising</span>
          </span>
        </div>

        <h1 className="mt-7 font-heading text-2xl font-semibold text-white sm:text-3xl">Register your school</h1>
        <p className="mt-2 max-w-lg text-[13.5px] text-muted-foreground">Four short steps. We verify your school before any campaign goes live.</p>

        <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className={cn("rounded-xl border px-3 py-3", i === step ? "border-primary/60 bg-primary/10" : i < step ? "border-emerald-400/25 bg-emerald-400/[0.04]" : "border-border")}>
              <div className="flex items-center gap-2">
                <s.icon className={cn("h-3.5 w-3.5", i === step ? "text-accent" : i < step ? "text-emerald-400" : "text-muted-foreground")} />
                <span className={cn("text-[10px] font-semibold uppercase tracking-[0.12em]", i === step ? "text-white" : "text-muted-foreground")}>Step {i + 1}</span>
              </div>
              <p className={cn("mt-1 text-[12px]", i === step ? "text-white" : "text-muted-foreground")}>{s.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-border/80 surface p-6">
          {done ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-400" />
              <h2 className="mt-4 font-heading text-xl font-semibold text-white">Application ready for review</h2>
              <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                {data.school || "Your school"} is set up as a demonstration account. In production this would enter the verification queue and a campaign coach would reach out to {data.email || "your email"}.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link to="/school/dashboard" className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-[12.5px] font-semibold text-white">
                  Preview school dashboard <ArrowRight className="h-3 w-3" />
                </Link>
                <button type="button" onClick={() => { setDone(false); setStep(0); }} className="rounded-xl border border-border px-4 py-2.5 text-[12.5px] font-semibold text-silver hover:text-white">
                  Start over
                </button>
              </div>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">School name *</span><input className={input} value={data.school} onChange={set("school")} placeholder="Northgate High School" /></label>
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">School type</span>
                    <select className={input} value={data.type} onChange={set("type")}>
                      {["Public high school", "Private school", "Middle school", "K-12 school", "District office"].map((t) => <option key={t} className="bg-[#0b0616]">{t}</option>)}
                    </select>
                  </label>
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Students enrolled</span><input className={input} value={data.students} onChange={set("students")} placeholder="1,400" /></label>
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">City *</span><input className={input} value={data.city} onChange={set("city")} placeholder="Portland" /></label>
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">State</span><input className={input} value={data.state} onChange={set("state")} placeholder="OR" /></label>
                  <label className="block sm:col-span-2"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">School website</span><input className={input} value={data.website} onChange={set("website")} placeholder="northgate.edu" /></label>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Full name *</span><input className={input} value={data.name} onChange={set("name")} placeholder="Diane Reyes" /></label>
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Role</span>
                    <select className={input} value={data.role} onChange={set("role")}>
                      {["Athletic director", "Principal", "Coach", "Booster club lead", "Development director", "Teacher / advisor"].map((t) => <option key={t} className="bg-[#0b0616]">{t}</option>)}
                    </select>
                  </label>
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Work email *</span><input type="email" className={input} value={data.email} onChange={set("email")} placeholder="d.reyes@northgate.edu" /></label>
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Phone</span><input className={input} value={data.phone} onChange={set("phone")} placeholder="(503) 555-0100" /></label>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">District / governing body *</span><input className={input} value={data.district} onChange={set("district")} placeholder="Portland Public Schools" /></label>
                  <label className="block"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Tax ID / EIN (optional)</span><input className={input} value={data.ein} onChange={set("ein")} placeholder="00-0000000" /></label>
                  <label className="block sm:col-span-2"><span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Verification method</span>
                    <select className={input} value={data.verifyMethod} onChange={set("verifyMethod")}>
                      {["District email domain", "Signed letter from administration", "Existing 501(c)(3) documentation", "Booster club registration"].map((t) => <option key={t} className="bg-[#0b0616]">{t}</option>)}
                    </select>
                  </label>
                  <div className="rounded-xl border border-dashed border-border bg-white/[0.02] p-4 sm:col-span-2">
                    <p className="text-[12px] font-medium text-silver">Verification document</p>
                    <p className="mt-1 text-[11.5px] text-muted-foreground">Upload is disabled in this prototype. In production you would attach a district letter or tax document here.</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  {[
                    { title: "School", rows: [["Name", data.school || "—"], ["Type", data.type], ["Location", [data.city, data.state].filter(Boolean).join(", ") || "—"], ["Students", data.students || "—"]] },
                    { title: "Administrator", rows: [["Contact", data.name || "—"], ["Role", data.role], ["Email", data.email || "—"], ["Phone", data.phone || "—"]] },
                    { title: "Verification", rows: [["District", data.district || "—"], ["Tax ID", data.ein || "—"], ["Method", data.verifyMethod]] },
                  ].map((block) => (
                    <div key={block.title} className="rounded-xl border border-border/70 bg-white/[0.02] p-4">
                      <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">{block.title}</p>
                      <dl className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                        {block.rows.map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-3 text-[12.5px]">
                            <dt className="text-muted-foreground">{k}</dt>
                            <dd className="text-right text-white">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                  <DemoNotice>No account is created and no verification is performed in this prototype.</DemoNotice>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-5">
                <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-xl border border-border px-4 py-2.5 text-[12.5px] font-semibold text-silver hover:text-white disabled:opacity-40">
                  Back
                </button>
                <button type="button" onClick={next} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-[12.5px] font-semibold text-white hover:bg-primary/90">
                  {step === 3 ? "Submit application" : "Continue"} <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </>
          )}
        </div>

        <p className="mt-5 text-center text-[12.5px] text-muted-foreground">
          Already registered? <Link to="/login" className="font-semibold text-accent hover:text-white">Login</Link>
        </p>
      </div>
    </div>
  );
}