import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import type { Settings } from "@/lib/types";

export function Footer({ settings }: { settings: Settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-cream/85">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Image
              src={settings.logo}
              alt={settings.firmName}
              width={200}
              height={60}
              className="h-11 w-auto brightness-0 invert opacity-95"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              {settings.introText}
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm tracking-wide text-brass-light">
              Offices
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-cream/70">
              {settings.offices.map((o) => (
                <li key={o.id} className="flex gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-brass-light" />
                  <span>
                    <span className="block font-medium text-cream/90">{o.name}</span>
                    {o.address}
                    <br />
                    {o.cityStateZip}
                    <br />
                    <a href={`tel:${o.phone.replace(/[^0-9]/g, "")}`} className="hover:text-cream">
                      {o.phone}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm tracking-wide text-brass-light">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li><Link href="/attorneys" className="hover:text-cream">Attorneys</Link></li>
              <li><Link href="/staff" className="hover:text-cream">Staff</Link></li>
              <li><Link href="/contact" className="hover:text-cream">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-cream">Privacy Policy</Link></li>
              <li><Link href="/admin" className="hover:text-cream/50 text-cream/40">Admin</Link></li>
            </ul>
            <a
              href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm font-medium text-cream hover:border-brass-light hover:text-brass-light"
            >
              <Phone size={14} /> {settings.phone}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {settings.firmName}. All rights reserved.</p>
          <p>Attorney advertising. Prior results do not guarantee a similar outcome.</p>
        </div>
      </div>
    </footer>
  );
}
