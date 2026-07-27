import type { Metadata } from "next";
import Image from "next/image";
import { PawPrint } from "lucide-react";
import { getStaff } from "@/lib/db";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Staff",
  description:
    "Meet the staff at Davis Steadman Percy & Sluka, LLC, and a couple of very good office dogs.",
};

export default function StaffPage() {
  const staff = getStaff();
  const people = staff.filter((s) => !s.isPet);
  const pets = staff.filter((s) => s.isPet);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <AnimatedSection className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brass">
          Behind the Scenes
        </p>
        <h1 className="font-display mt-3 text-4xl font-medium text-ink sm:text-5xl">
          Our Staff
        </h1>
        <p className="mt-4 text-lg text-ink/60">
          The people (and a couple of very good dogs) who keep both offices
          running smoothly.
        </p>
      </AnimatedSection>

      <div className="mt-12 flex flex-wrap gap-6">
        {people.map((person, i) => (
          <AnimatedItem key={person.id} index={i} className="w-[calc(50%-0.75rem)] sm:w-56">
            <div className="group h-full overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-ink/8 transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(11,27,43,0.2)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 224px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-medium text-ink">{person.name}</h3>
                <p className="text-sm text-brass">{person.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/55">{person.bio}</p>
              </div>
            </div>
          </AnimatedItem>
        ))}
      </div>

      {pets.length > 0 && (
        <div className="mt-16">
          <AnimatedSection className="flex items-center gap-2">
            <PawPrint size={20} className="text-brass" />
            <h2 className="font-display text-2xl font-medium text-ink">
              Office Companions
            </h2>
          </AnimatedSection>
          <div className="mt-8 flex flex-wrap gap-6">
            {pets.map((pet, i) => (
              <AnimatedItem key={pet.id} index={i} className="w-[calc(50%-0.75rem)] sm:w-56">
                <div className="group h-full overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-ink/8 transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(11,27,43,0.2)]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
                    <Image
                      src={pet.photo}
                      alt={pet.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 224px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-medium text-ink">{pet.name}</h3>
                    <p className="text-xs text-brass">{pet.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-ink/55">{pet.bio}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
