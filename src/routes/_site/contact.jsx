import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/forms/ContactForm";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({ meta: [{ title: "Contact — RampUp Fundraising" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what your school is trying to fund"
        body="Send a note and a campaign coach will reply within one business day with a suggested structure and timeline."
      />
      <section className="mx-auto grid max-w-[1280px] gap-8 px-5 py-14 lg:grid-cols-[1.35fr_1fr] lg:px-8">
        <ContactForm />
        <div className="space-y-3">
          {[
            { icon: Mail, label: "Email", value: "hello@rampupfundraising.com" },
            { icon: Phone, label: "Phone", value: "(503) 555-0140" },
            { icon: MapPin, label: "Office", value: "Portland, Oregon" },
            { icon: Clock, label: "Hours", value: "Mon–Fri, 8am–6pm PT" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3 rounded-2xl border border-border/80 surface p-4">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">
                <c.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">{c.label}</p>
                <p className="mt-0.5 text-[13px] text-white">{c.value}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-5">
            <p className="font-heading text-[13.5px] font-semibold text-white">Already raising?</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-silver/80">
              Existing campaigns can be moved onto RampUp mid-season. Ask about migrating your donor list.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}