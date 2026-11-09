import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/home/Hero";
import AudiencePaths from "@/components/home/AudiencePaths";
import PlatformTools from "@/components/home/PlatformTools";
import CampaignCard from "@/components/shared/CampaignCard";
import {
  ImpactStats,
  SolutionsGrid,
  HowItWorksStrip,
  WhyChoose,
  FeaturedSchools,
  SuccessStoriesStrip,
  Testimonials,
  FinalCTA,
  FeaturedCampaignsHeader,
} from "@/components/home/HomeSections";
import { campaigns } from "@/data/mock";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "RampUp Fundraising — Fundraising Software for Schools, Teams & Communities" },
      { name: "description", content: "Fundraising software for schools, teams and communities. Run donation campaigns, peer-to-peer and team pages, product sales and giving events with donor tools and live reporting." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div
      className="contents"
      onClickCapture={(event) => {
        if (event.target.closest("a")) event.preventDefault();
      }}
    >
      <Hero />
      <ImpactStats />
      <AudiencePaths />
      <PlatformTools />

      <section className="mx-auto max-w-[1280px] px-5 pb-20 lg:px-8 lg:pb-24">
        <FeaturedCampaignsHeader />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.slice(0, 6).map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
        <p className="mt-5 text-[11px] text-white/35">Demonstration data — no live transactions are processed.</p>
      </section>

      <SolutionsGrid />
      <HowItWorksStrip />
      <WhyChoose />
      <FeaturedSchools />
      <SuccessStoriesStrip />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}