import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Attorney } from "@/lib/types";

export function AttorneyCard({ attorney }: { attorney: Attorney }) {
  return (
    <Link
      href={`/attorneys/${attorney.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-paper shadow-[0_1px_2px_rgba(11,27,43,0.06)] ring-1 ring-ink/8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(11,27,43,0.25)] hover:ring-brass/40"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
        <Image
          src={attorney.photo}
          alt={attorney.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium text-ink">{attorney.name}</h3>
        <p className="text-sm text-brass">{attorney.title}</p>
        <p className="mt-2 line-clamp-2 text-xs text-ink/55">
          {attorney.practiceAreas.slice(0, 2).join(" · ")}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ink/70 transition-colors group-hover:text-brass">
          View profile
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
