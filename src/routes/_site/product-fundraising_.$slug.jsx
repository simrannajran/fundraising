import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Package, Plus, ShoppingCart, Truck } from "lucide-react";
import { toast } from "sonner";
import { ProgressBar } from "@/components/shared/ProgressBar";
import DemoNotice from "@/components/shared/DemoNotice";
import { products, IMAGES } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_site/product-fundraising_/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${params.slug.replace(/-/g, " ")} — Product Fundraising` }] }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const product = products.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-white">Product not found</h1>
        <Link to="/product-fundraising" className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-white">
          Back to product fundraising
        </Link>
      </div>
    );
  }

  const gallery = [product.cover, IMAGES.product, IMAGES.court, IMAGES.kids];

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-8 lg:px-8">
      <Link to="/product-fundraising" className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-white">
        <ArrowLeft className="h-3.5 w-3.5" /> All product campaigns
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="overflow-hidden rounded-2xl border border-border/80">
            <img src={gallery[active]} alt={product.name} className="h-72 w-full object-cover sm:h-[420px]" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {gallery.map((g, i) => (
              <button key={i} type="button" onClick={() => setActive(i)} className={`overflow-hidden rounded-xl border ${i === active ? "border-primary" : "border-border"}`}>
                <img src={g} alt="" className="h-16 w-full object-cover sm:h-20" loading="lazy" />
              </button>
            ))}
          </div>

          <div className="mt-7">
            <span className="rounded-full border border-primary/25 bg-primary/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">{product.category}</span>
            <h1 className="mt-3 font-heading text-2xl font-semibold text-white sm:text-[32px]">{product.name}</h1>
            <p className="mt-1.5 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{product.school}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-silver">{product.description}</p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Package, label: "Items in catalogue", value: `${product.items}` },
              { icon: Truck, label: "Delivery", value: "Single school drop" },
              { icon: ShoppingCart, label: "Seller share", value: product.sellerShare },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border/70 surface p-4">
                <s.icon className="h-4 w-4 text-primary" />
                <p className="mt-2.5 text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{s.label}</p>
                <p className="mt-0.5 font-heading text-[13.5px] font-semibold text-white">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-border/80 surface p-5">
            <h2 className="font-heading text-[15px] font-semibold text-white">Campaign details</h2>
            <dl className="mt-3 space-y-2 text-[12.5px]">
              {[
                ["Fundraising goal", formatCurrency(product.goal)],
                ["Raised so far", formatCurrency(product.raised)],
                ["Progress", `${percent(product.raised, product.goal)}% of goal`],
                ["Program", product.school],
                ["Unit price", formatCurrency(product.price)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border/40 pb-2 last:border-0">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <aside className="lg:sticky lg:top-[88px] lg:h-fit">
          <div className="rounded-2xl border border-border/80 surface p-5 glow-soft">
            <p className="font-mono text-3xl font-semibold text-white">{formatCurrency(product.price)}</p>
            <p className="mt-1 text-[12px] text-muted-foreground">per item · {product.sellerShare} supports the program</p>

            <div className="mt-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Quantity</p>
              <div className="mt-2 flex items-center gap-2">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center rounded-xl border border-border text-silver hover:text-white">
                  <Minus className="h-4 w-4" />
                </button>
                <input readOnly value={qty} className="h-11 flex-1 rounded-xl border border-border bg-white/[0.03] text-center font-mono text-[13px] text-white" />
                <button type="button" onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center rounded-xl border border-border text-silver hover:text-white">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-border/70 bg-white/[0.02] px-3.5 py-3 text-[12.5px]">
                <span className="text-muted-foreground">Order total</span>
                <span className="font-mono font-semibold text-white">{formatCurrency(product.price * qty)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toast("Cart is a demonstration control", { description: `${qty} × ${product.name} — checkout is not implemented.` })}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>

            <div className="mt-5">
              <div className="flex items-baseline justify-between text-[12px]">
                <span className="text-silver">{formatCurrency(product.raised)} raised</span>
                <span className="text-muted-foreground">{percent(product.raised, product.goal)}%</span>
              </div>
              <ProgressBar className="mt-2" raised={product.raised} goal={product.goal} />
              <p className="mt-2 text-[11px] text-muted-foreground">Goal {formatCurrency(product.goal)}</p>
            </div>

            <DemoNotice className="mt-4">Product orders are demonstration only — no cart or payment is processed.</DemoNotice>
          </div>
        </aside>
      </div>
    </div>
  );
}