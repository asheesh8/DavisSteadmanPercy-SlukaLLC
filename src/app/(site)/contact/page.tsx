import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { getSettings } from "@/lib/db";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Davis Steadman Percy & Sluka, LLC — offices in White River Junction and Woodstock, Vermont.",
};

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <AnimatedSection className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brass">
          Get In Touch
        </p>
        <h1 className="font-display mt-3 text-4xl font-medium text-ink sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-ink/60">
          New clients should call our main office at{" "}
          <a href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`} className="font-semibold text-ink hover:text-brass">
            {settings.phone}
          </a>
          . We&rsquo;re conveniently located in the Upper Valley, near
          Interstate 89 and 91 and close to Dartmouth College and DHMC.
        </p>
      </AnimatedSection>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          {settings.offices.map((office, i) => (
            <AnimatedItem key={office.id} index={i}>
              <div className="overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-ink/8">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={office.photo}
                    alt={office.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display flex items-center gap-2 text-xl font-medium text-ink">
                    <MapPin size={18} className="text-brass" />
                    {office.name}
                  </h2>
                  <p className="mt-2 text-sm text-ink/60">
                    {office.address}
                    <br />
                    {office.cityStateZip}
                  </p>
                  <a
                    href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brass"
                  >
                    <Phone size={14} /> {office.phone}
                  </a>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>

        <AnimatedSection delay={2} className="rounded-[1.75rem] bg-paper p-8 ring-1 ring-ink/8 sm:p-10">
          <h2 className="font-display text-2xl font-medium text-ink">Send a message</h2>
          <p className="mt-2 text-sm text-ink/55">
            We&rsquo;ll respond as soon as we can, usually within one business day.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
