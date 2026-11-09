import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

const axis = { stroke: "hsl(250 11% 55%)", fontSize: 11, tickLine: false, axisLine: false };

function Shell({ title, action, children, className, height = 240 }) {
  return (
    <div className={cn("rounded-2xl border border-border/80 surface p-5", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-heading text-[13.5px] font-semibold text-white">{title}</h3>
          {action}
        </div>
      )}
      <div style={{ height }}>{children}</div>
    </div>
  );
}

export function AreaTrend({ title, data, xKey = "month", yKey = "raised", prefix = "$", action, className, height }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <Shell title={title} action={action} className={className} height={height}>
      {ready ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 6, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${yKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(271 86% 62%)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="hsl(271 86% 62%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(265 20% 17%)" vertical={false} strokeDasharray="3 6" />
            <XAxis dataKey={xKey} {...axis} />
            <YAxis {...axis} tickFormatter={(v) => `${prefix}${v >= 1000 ? `${Math.round(v / 1000)}k` : v}`} />
            <Tooltip
              contentStyle={{ background: "#0d0819", border: "1px solid hsl(265 20% 20%)", borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: "#cfc9e4" }}
              formatter={(v) => [`${prefix}${Number(v).toLocaleString("en-US")}`, "Total"]}
            />
            <Area type="monotone" dataKey={yKey} stroke="hsl(276 96% 72%)" strokeWidth={2} fill={`url(#grad-${yKey})`} />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full animate-pulse rounded-xl bg-white/[0.03]" />
      )}
    </Shell>
  );
}

export function BarTrend({ title, data, xKey = "name", yKey = "raised", action, className, height, colors }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const palette = colors || ["hsl(271 86% 62%)", "hsl(285 70% 70%)", "hsl(212 80% 66%)", "hsl(158 62% 52%)", "hsl(38 92% 64%)"];
  return (
    <Shell title={title} action={action} className={className} height={height}>
      {ready ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 6, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="hsl(265 20% 17%)" vertical={false} strokeDasharray="3 6" />
            <XAxis dataKey={xKey} {...axis} />
            <YAxis {...axis} tickFormatter={(v) => `${v >= 1000 ? `${Math.round(v / 1000)}k` : v}`} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              contentStyle={{ background: "#0d0819", border: "1px solid hsl(265 20% 20%)", borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: "#cfc9e4" }}
              formatter={(v) => [`$${Number(v).toLocaleString("en-US")}`, "Raised"]}
            />
            <Bar dataKey={yKey} radius={[6, 6, 0, 0]} maxBarSize={44}>
              {data.map((_, i) => (
                <Cell key={i} fill={palette[i % palette.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full animate-pulse rounded-xl bg-white/[0.03]" />
      )}
    </Shell>
  );
}