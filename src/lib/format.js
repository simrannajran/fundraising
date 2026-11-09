export const formatCurrency = (value, opts = {}) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: opts.decimals ?? 0,
    minimumFractionDigits: opts.decimals ?? 0,
  }).format(Number(value) || 0);

export const formatNumber = (value) => new Intl.NumberFormat("en-US").format(Number(value) || 0);

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export const percent = (raised, goal) => (goal ? Math.min(100, Math.round((raised / goal) * 100)) : 0);

export const initials = (name = "") =>
  name
    .replace(/^The\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();