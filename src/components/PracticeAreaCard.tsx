import type { LucideIcon } from "lucide-react";

export function PracticeAreaCard({
  icon: Icon,
  title,
  description,
  tone = "ink",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "ink" | "brass" | "emerald";
}) {
  const toneClasses = {
    ink: "bg-ink text-cream",
    brass: "bg-brass text-ink",
    emerald: "bg-emerald text-cream",
  }[tone];

  return (
    <div className="group relative flex h-full flex-col rounded-[1.75rem] bg-paper p-7 ring-1 ring-ink/8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(11,27,43,0.2)]">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
      >
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-display text-xl font-medium text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">{description}</p>
    </div>
  );
}
