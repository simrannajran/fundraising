import { Link } from "@tanstack/react-router";
import { ArrowRight, Package } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { formatCurrency, percent } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 surface transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={product.cover} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0616] via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">{product.school}</p>
        <h3 className="mt-1.5 font-heading text-[15px] font-semibold text-white">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">{product.description}</p>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-border/70 bg-white/[0.02] px-3 py-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"><Package className="h-3 w-3" /> {product.items} items</span>
          <span className="font-mono text-sm font-semibold text-white">{formatCurrency(product.price)}</span>
        </div>
        <div className="mt-3">
          <ProgressBar className="h-1.5" raised={product.raised} goal={product.goal} />
          <div className="mt-2 flex justify-between text-[11px]">
            <span className="text-silver">{formatCurrency(product.raised)}</span>
            <span className="text-muted-foreground">{percent(product.raised, product.goal)}% · {formatCurrency(product.goal)} goal</span>
          </div>
        </div>
        <Link
          to="/product-fundraising/$slug"
          params={{ slug: product.slug }}
          className="mt-4 inline-flex items-center justify-between rounded-xl border border-border px-3.5 py-2.5 text-[12.5px] font-medium text-silver transition-colors hover:border-primary/50 hover:text-white"
        >
          View Campaign <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}