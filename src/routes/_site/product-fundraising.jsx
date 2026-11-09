import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Package, ShoppingBag } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import ProductCard from "@/components/shared/ProductCard";
import SearchBar from "@/components/shared/SearchBar";
import FilterDropdown from "@/components/shared/FilterDropdown";
import EmptyState from "@/components/shared/EmptyState";
import DemoNotice from "@/components/shared/DemoNotice";
import { products } from "@/data/mock";

export const Route = createFileRoute("/_site/product-fundraising")({
  head: () => ({ meta: [{ title: "Product Fundraising — RampUp Fundraising" }] }),
  component: ProductFundraisingPage,
});

const categories = ["All categories", "Food Products", "Discount Cards", "Merchandise", "School Merchandise", "Special Fundraising Products"];

function ProductFundraisingPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("Most raised");

  const rows = useMemo(() => {
    const filtered = products.filter((p) => {
      const q = query.toLowerCase();
      const matches = !q || p.name.toLowerCase().includes(q) || p.school.toLowerCase().includes(q);
      return matches && (category === "All categories" || p.category === category);
    });
    return [...filtered].sort((a, b) =>
      sort === "Most raised" ? b.raised - a.raised : sort === "Price: low to high" ? a.price - b.price : b.raised / b.goal - a.raised / a.goal
    );
  }, [query, category, sort]);

  return (
    <>
      <PageHero
        eyebrow="Product fundraising"
        title="Sell something people actually want, and fund the season"
        body="Discount cards, locally roasted coffee, school merch and seasonal boxes — with per-seller tracking and one clean invoice."
      >
        <div className="flex flex-wrap gap-2">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90">
            Start a product drive <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/campaigns" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-silver hover:text-white">
            Browse donation campaigns
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1280px] px-5 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShoppingBag, title: "Sell in person or online", body: "Sellers share a link; supporters order from a phone in under a minute." },
            { icon: Package, title: "One consolidated delivery", body: "Orders ship to the school in a single drop, sorted by seller." },
            { icon: ArrowRight, title: "Clear seller share", body: "Every product shows the percentage that goes to your program up front." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border/70 surface p-5">
              <f.icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.75} />
              <p className="mt-3.5 font-heading text-[13.5px] font-semibold text-white">{f.title}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border/80 surface p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBar value={query} onChange={setQuery} placeholder="Search products or schools…" />
            <div className="grid grid-cols-2 gap-2 sm:w-[400px]">
              <FilterDropdown label="Category" value={category} onChange={setCategory} options={categories} />
              <FilterDropdown label="Sort" value={sort} onChange={setSort} options={["Most raised", "Closest to goal", "Price: low to high"]} />
            </div>
          </div>
        </div>

        {rows.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState className="mt-6" title="No products match" body="Try another category or search term." />
        )}

        <DemoNotice className="mt-8">
          Product fundraising is kept separate from donation campaigns. Checkout is not implemented — quantities are demonstration only.
        </DemoNotice>
      </section>
    </>
  );
}