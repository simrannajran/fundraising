import { percent } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProgressBar({ raised, goal, value, className, tone = "brand", showTrack = true }) {
  const pct = value ?? percent(raised, goal);
  const tones = {
    brand: "bg-gradient-to-r from-primary to-accent",
    silver: "bg-gradient-to-r from-[#cfc9e4] to-[#8f88a8]",
    green: "bg-emerald-400",
  };
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full", showTrack && "bg-white/[0.07]", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700 ease-out", tones[tone])}
        style={{ width: `${Math.max(pct, 2)}%` }}
      />
    </div>
  );
}

export function ProgressRing({ value, size = 56, stroke = 5 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.09)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="url(#ringGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c - (c * Math.min(value, 100)) / 100}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(271 86% 58%)" />
          <stop offset="100%" stopColor="hsl(276 96% 74%)" />
        </linearGradient>
      </defs>
    </svg>
  );
}