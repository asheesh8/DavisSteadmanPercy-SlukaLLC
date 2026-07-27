import type { Metadata } from "next";
import { getAttorneys } from "@/lib/db";
import { AttorneyCard } from "@/components/AttorneyCard";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Attorneys",
  description:
    "Meet the attorneys of Davis Steadman Percy & Sluka, LLC — serving Vermont and New Hampshire in family law, real estate, workers' compensation, and civil litigation.",
};

export default function AttorneysPage() {
  const attorneys = getAttorneys();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
      <AnimatedSection className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brass">
          Our Team
        </p>
        <h1 className="font-display mt-3 text-4xl font-medium text-ink sm:text-5xl">
          Attorneys
        </h1>
        <p className="mt-4 text-lg text-ink/60">
          Four attorneys, one shared commitment to personal attention in
          every matter &mdash; across family law, real estate, workers&rsquo;
          compensation, and general civil practice.
        </p>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {attorneys.map((a, i) => (
          <AnimatedItem key={a.id} index={i}>
            <AttorneyCard attorney={a} />
          </AnimatedItem>
        ))}
      </div>
    </div>
  );
}
