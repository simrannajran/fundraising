import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import CampaignCard from "@/components/shared/CampaignCard";
import SearchBar from "@/components/shared/SearchBar";
import FilterDropdown from "@/components/shared/FilterDropdown";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import { campaigns, schools } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/campaigns")({
  head: () => ({ meta: [{ title: "Explore Campaigns — RampUp Fundraising" }] }),
  component: CampaignsPage,
});

const PER_PAGE = 6;
const CATEGORIES = ["All", "Schools", "Sports", "Athletics", "Clubs", "Community"];

function CampaignsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [school, setSchool] = useState("All schools");
  const [status, setStatus] = useState("All statuses");
  const [sort, setSort] = useState("Most raised");
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    let rows = campaigns.filter((c) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.school.toLowerCase().includes(q);
      const matchesCat = category === "All" || c.category === category;
      const matchesSchool = school === "All schools" || c.school === school;
      const matchesStatus = status === "All statuses" || c.status === status;
      return matchesQuery && matchesCat && matchesSchool && matchesStatus;
    });
    rows = [...rows].sort((a, b) => {
      if (sort === "Most raised") return b.raised - a.raised;
      if (sort === "Closest to goal") return b.raised / b.goal - a.raised / a.goal;
      if (sort === "Most supporters") return b.supporters - a.supporters;
      return a.goal - b.goal;
    });
    return rows;
  }, [query, category, school, status, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageRows = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const reset = (fn) => (v) => { fn(v); setPage(1); };

  const hasFilters = query || category !== "All" || school !== "All schools" || status !== "All statuses";
  const clearAll = () => {
    setQuery("");
    setCategory("All");
    setSchool("All schools");
    setStatus("All statuses");
    setPage(1);
  };

  return (
    <>
      <PageHero
        eyebrow="Explore campaigns"
        title="Find a school, a team or a cause to back today"
        body="Search live fundraisers from schools, teams and clubs, filter by what matters to you, then give in under a minute."
      >
        <div className="max-w-3xl">
          <SearchBar
            value={query}
            onChange={reset(setQuery)}
            placeholder="Search campaigns, schools or teams…"
            inputClassName="h-12 text-[15px]"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => reset(setCategory)(c)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors",
                  category === c
                    ? "border-primary/60 bg-primary/15 text-white"
                    : "border-border bg-white/[0.02] text-muted-foreground hover:border-primary/40 hover:text-white"
                )}
              >
                {c === "All" ? "All causes" : c}
              </button>
            ))}
          </div>

          <p className="mt-4 text-[12.5px] text-muted-foreground">
            Running a fundraiser?{" "}
            <Link to="/register-school" className="font-semibold text-accent hover:text-white">
              Start a campaign in minutes
            </Link>
          </p>
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1280px] px-5 py-12 lg:px-8">
        <div className="rounded-2xl border border-border/80 surface p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3 lg:max-w-[620px]">
              <FilterDropdown label="School" value={school} onChange={reset(setSchool)} options={["All schools", ...schools.map((s) => s.name)]} />
              <FilterDropdown label="Status" value={status} onChange={reset(setStatus)} options={["All statuses", "Active", "Almost funded"]} />
              <FilterDropdown label="Sort" value={sort} onChange={reset(setSort)} options={["Most raised", "Closest to goal", "Most supporters", "Lowest goal"]} />
            </div>
            <div className="flex items-center gap-3 text-[11.5px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <SlidersHorizontal className="h-3 w-3" />
                {results.length} campaign{results.length === 1 ? "" : "s"} match your filters
              </span>
              {hasFilters && (
                <button type="button" onClick={clearAll} className="inline-flex items-center gap-1 font-medium text-accent hover:text-white">
                  <RotateCcw className="h-3 w-3" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {pageRows.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pageRows.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        ) : (
          <EmptyState className="mt-6" title="No campaigns match those filters" body="Try a different category, school or search term." />
        )}

        <Pagination page={current} totalPages={totalPages} onChange={setPage} />

        <p className="mt-6 text-[11px] text-white/35">Demonstration data — no live transactions are processed.</p>
      </section>
    </>
  );
}