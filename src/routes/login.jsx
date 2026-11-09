import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { LOGO } from "@/data/mock";
import DemoNotice from "@/components/shared/DemoNotice";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — RampUp Fundraising" }] }),
  component: LoginPage,
});

const demoAccounts = [
  { label: "School admin", to: "/school/dashboard" },
  { label: "Participant", to: "/participant/dashboard" },
  { label: "Donor", to: "/donor/dashboard" },
  { label: "Platform admin", to: "/admin/dashboard" },
];

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPending(true);
    setTimeout(() => {
      setPending(false);
      toast("Sign-in is a visual demo", { description: "Choose a dashboard below to explore the product." });
    }, 600);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade opacity-40" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-[150px]" />
      </div>

      <div className="w-full max-w-[420px]">
        <Link to="/" className="mb-8 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </Link>

        <div className="rounded-2xl border border-border/80 surface p-7 glow-soft">
          <div className="flex items-center gap-2.5">
            <img src={LOGO} alt="RampUp Fundraising" className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/10" />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-sm font-extrabold italic tracking-tight text-metal">RAMPUP</span>
              <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-primary/90">Fundraising</span>
            </span>
          </div>

          <h1 className="mt-6 font-heading text-xl font-semibold text-white">Welcome back</h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">Sign in to manage your campaigns, teams and donations.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Email</span>
              <div className={cn("relative mt-1.5 rounded-xl border bg-white/[0.03]", errors.email ? "border-red-500/60" : "border-border focus-within:border-primary/60")}>
                <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@school.edu"
                  className="h-11 w-full bg-transparent pl-9 pr-3 text-[13px] text-white placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              {errors.email && <span className="mt-1 block text-[11px] text-red-400">{errors.email}</span>}
            </label>

            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Password</span>
              <div className={cn("relative mt-1.5 rounded-xl border bg-white/[0.03]", errors.password ? "border-red-500/60" : "border-border focus-within:border-primary/60")}>
                <Lock className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="h-11 w-full bg-transparent pl-9 pr-10 text-[13px] text-white placeholder:text-muted-foreground/60 focus:outline-none"
                />
                <button type="button" onClick={() => setShow((v) => !v)} aria-label="Toggle password" className="absolute right-3 top-3.5 text-muted-foreground hover:text-white">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <span className="mt-1 block text-[11px] text-red-400">{errors.password}</span>}
            </label>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[12px] text-muted-foreground">
                <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="h-3.5 w-3.5 accent-[hsl(271_86%_58%)]" />
                Remember me
              </label>
              <button type="button" onClick={() => toast("Password reset", { description: "Reset email is not connected in this prototype." })} className="text-[12px] font-medium text-accent hover:text-white">
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={pending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70">
              {pending ? "Signing in…" : "Login"} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <DemoNotice className="mt-5">Visual prototype — authentication is not connected.</DemoNotice>

          <div className="mt-5 border-t border-border/70 pt-4">
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Explore a dashboard</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {demoAccounts.map((d) => (
                <Link key={d.to} to={d.to} className="rounded-lg border border-border px-3 py-2 text-center text-[11.5px] font-medium text-silver hover:border-primary/50 hover:text-white">
                  {d.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[12.5px] text-muted-foreground">
          New to RampUp?{" "}
          <Link to="/register-school" className="font-semibold text-accent hover:text-white">Register your school</Link>
        </p>
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-white/30">
          <ShieldCheck className="h-3.5 w-3.5" /> Secure sign-in experience for schools
        </div>
      </div>
    </div>
  );
}