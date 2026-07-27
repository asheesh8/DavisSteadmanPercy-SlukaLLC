import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, GraduationCap, Gavel, Briefcase } from "lucide-react";
import { getAttorneyBySlug, getAttorneys } from "@/lib/db";
import { AnimatedSection } from "@/components/AnimatedSection";

export function generateStaticParams() {
  return getAttorneys().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const attorney = getAttorneyBySlug(slug);
  if (!attorney) return {};
  return {
    title: attorney.name,
    description: `${attorney.name}, ${attorney.title} at Davis Steadman Percy & Sluka, LLC — ${attorney.practiceAreas.join(", ")}.`,
  };
}

export default async function AttorneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const attorney = getAttorneyBySlug(slug);
  if (!attorney) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
      <Link
        href="/attorneys"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 hover:text-brass"
      >
        <ArrowLeft size={15} /> Back to attorneys
      </Link>

      <AnimatedSection className="mt-8 grid gap-10 md:grid-cols-[280px_1fr]">
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] ring-1 ring-ink/8">
            <Image
              src={attorney.photo}
              alt={attorney.name}
              fill
              sizes="280px"
              className="object-cover"
              priority
            />
          </div>
          {attorney.badge && (
            <Image
              src={attorney.badge}
              alt="Award badge"
              width={140}
              height={110}
              className="mx-auto mt-4 h-24 w-auto object-contain"
            />
          )}
          <a
            href={`tel:${attorney.phone.replace(/[^0-9]/g, "")}`}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]"
          >
            <Phone size={15} /> {attorney.phone}
          </a>
        </div>

        <div>
          <h1 className="font-display text-4xl font-medium text-ink">{attorney.name}</h1>
          <p className="mt-1 text-lg text-brass">{attorney.title}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {attorney.practiceAreas.map((p) => (
              <span
                key={p}
                className="rounded-full bg-cream-dim px-3.5 py-1.5 text-xs font-medium text-ink/70 ring-1 ring-ink/8"
              >
                {p}
              </span>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-ink/70">
            {attorney.bio.split("\n\n").map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-10 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink/50">
                <GraduationCap size={16} /> Education
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
                {attorney.education.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink/50">
                <Gavel size={16} /> Bar Admissions
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
                {attorney.barAdmissions.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 rounded-2xl bg-cream-dim px-5 py-4 text-sm text-ink/60">
            <Briefcase size={16} className="shrink-0 text-brass" />
            Offices in White River Junction and Woodstock, Vermont.
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
