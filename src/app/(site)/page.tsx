import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Users,
  Home as HomeIcon,
  HardHat,
  Scale,
  FileText,
  Handshake,
  MapPin,
} from "lucide-react";
import { getSettings, getAttorneys, getNews } from "@/lib/db";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";
import { AttorneyCard } from "@/components/AttorneyCard";
import { PracticeAreaCard } from "@/components/PracticeAreaCard";

export default function Home() {
  const settings = getSettings();
  const attorneys = getAttorneys();
  const [latestNews] = getNews();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bg-blob-brass pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full blur-3xl" />
        <div className="bg-blob-emerald pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-28 lg:pt-24">
          <div>
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink/70 ring-1 ring-ink/10">
                Serving Vermont &amp; New Hampshire's Upper Valley
              </span>
            </AnimatedSection>

            <AnimatedSection delay={1}>
              <h1 className="font-display mt-6 text-4xl font-medium leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl">
                Exceptional skills.{" "}
                <span className="italic text-brass">Exceptional people.</span>{" "}
                Exceptional solutions.
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
                {settings.firmName}{" "}offers personal attention in all phases of
                legal counseling in Vermont and New Hampshire &mdash; from
                family law and real estate to workers&rsquo; compensation and
                general civil practice.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`}
                  className="group flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-ink/20 transition-transform hover:scale-[1.03]"
                >
                  <Phone size={16} />
                  Call {settings.phone}
                </a>
                <Link
                  href="/attorneys"
                  className="group flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-ink/5"
                >
                  Meet Our Attorneys
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={4}>
              <div className="mt-10 flex flex-wrap items-center gap-6 opacity-90">
                {settings.badges.map((b) => (
                  <Image
                    key={b.id}
                    src={b.image}
                    alt={b.alt}
                    width={110}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={2} className="relative">
            <div className="relative mx-auto aspect-[2030/850] w-full max-w-xl overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20 ring-1 ring-ink/10">
              <Image
                src={settings.heroImage}
                alt={`${settings.firmName} attorneys`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-paper px-5 py-4 shadow-xl ring-1 ring-ink/10 sm:block">
              <p className="font-display text-2xl font-medium text-ink">2</p>
              <p className="text-xs text-ink/55">Upper Valley offices</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SERVICES SUMMARY */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <AnimatedSection className="grid gap-6 rounded-[2rem] bg-ink px-8 py-10 text-cream sm:px-12 md:grid-cols-2 md:gap-10">
          <div>
            <h2 className="font-display text-xl font-medium text-brass-light">
              Our Legal Services
            </h2>
            <p className="mt-2 text-cream/70">{settings.servicesText}</p>
          </div>
          <div className="border-t border-cream/10 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <h2 className="font-display text-xl font-medium text-brass-light">
              Real Estate Services
            </h2>
            <p className="mt-2 text-cream/70">{settings.realEstateText}</p>
          </div>
        </AnimatedSection>
      </section>

      {/* PRACTICE AREAS */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <AnimatedSection className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brass">
            Practice Areas
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium text-ink sm:text-4xl">
            Counsel across the moments that matter most
          </h2>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Family Law",
              description:
                "Divorce, parentage, parental rights and responsibilities, parent-child contact, and child support.",
              tone: "brass" as const,
            },
            {
              icon: HomeIcon,
              title: "Real Estate",
              description:
                "Purchase and sales agreements through closing, subdivisions, title work, and easements.",
              tone: "emerald" as const,
            },
            {
              icon: HardHat,
              title: "Workers' Compensation",
              description:
                "Representing injured workers and Vermont employers alike, from claims through appeal.",
              tone: "ink" as const,
            },
            {
              icon: Scale,
              title: "Municipal & Civil Litigation",
              description:
                "Zoning and tax appeals, landlord/tenant disputes, and general civil litigation.",
              tone: "ink" as const,
            },
            {
              icon: FileText,
              title: "Probate & Estate",
              description:
                "Estate planning and probate matters handled with care and clarity.",
              tone: "brass" as const,
            },
            {
              icon: Handshake,
              title: "Mediation & Collaborative Law",
              description:
                "Negotiation, mediation, and collaborative approaches to resolve disputes efficiently.",
              tone: "emerald" as const,
            },
          ].map((area, i) => (
            <AnimatedItem key={area.title} index={i}>
              <PracticeAreaCard {...area} />
            </AnimatedItem>
          ))}
        </div>
      </section>

      {/* ATTORNEYS PREVIEW */}
      <section className="bg-cream-dim/60 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brass">
                Our Team
              </p>
              <h2 className="font-display mt-3 text-3xl font-medium text-ink sm:text-4xl">
                Meet the attorneys
              </h2>
            </div>
            <Link
              href="/attorneys"
              className="group flex items-center gap-1.5 text-sm font-semibold text-ink/70 hover:text-brass"
            >
              View full team
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {attorneys.map((a, i) => (
              <AnimatedItem key={a.id} index={i}>
                <AttorneyCard attorney={a} />
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <AnimatedSection className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brass">
            Office Locations
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium text-ink sm:text-4xl">
            Two offices, one Upper Valley team
          </h2>
          <p className="mt-3 text-ink/60">
            Conveniently located near Interstate 89 and 91, close to Dartmouth
            College and DHMC.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {settings.offices.map((office, i) => (
            <AnimatedItem key={office.id} index={i}>
              <div className="group overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-ink/8 transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(11,27,43,0.2)]">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={office.photo}
                    alt={office.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display flex items-center gap-2 text-xl font-medium text-ink">
                    <MapPin size={18} className="text-brass" />
                    {office.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink/60">
                    {office.address}
                    <br />
                    {office.cityStateZip}
                  </p>
                  <a
                    href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brass"
                  >
                    <Phone size={14} /> {office.phone}
                  </a>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </section>

      {/* NEWS + CTA */}
      {latestNews && (
        <section className="mx-auto max-w-7xl px-6 pb-8 sm:px-8">
          <AnimatedSection className="rounded-[2rem] bg-paper p-8 ring-1 ring-ink/8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-brass">
              Firm News
            </p>
            <h3 className="font-display mt-2 text-2xl font-medium text-ink">
              {latestNews.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/60 whitespace-pre-line line-clamp-6">
              {latestNews.body}
            </p>
          </AnimatedSection>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <AnimatedSection className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-center text-cream sm:px-14">
          <div className="bg-blob-brass pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl" />
          <h2 className="font-display relative text-3xl font-medium sm:text-4xl">
            Ready to talk to an attorney?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-cream/65">
            New clients should call our main office &mdash; we&rsquo;ll help
            connect you with the right attorney for your situation.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-2.5 rounded-full bg-brass px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              <Phone size={16} /> {settings.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-full px-6 py-3.5 text-sm font-semibold text-cream ring-1 ring-cream/25 transition-colors hover:bg-white/5"
            >
              Send a message
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
