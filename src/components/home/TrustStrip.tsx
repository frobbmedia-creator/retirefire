import Link from "next/link";
import { AlertTriangle, BookMarked, Scale } from "lucide-react";

const items = [
  {
    icon: Scale,
    title: "Conservative defaults",
    body: "5% real return and 4% withdrawal as starting points — adjustable, never hidden.",
    href: "/methodology",
    linkLabel: "See defaults",
  },
  {
    icon: BookMarked,
    title: "Published methodology",
    body: "Formulas, free stress-test notes, and Trinity Study lineage — not a black box.",
    href: "/blog/retirefire-methodology-explained",
    linkLabel: "Human tour",
  },
  {
    icon: AlertTriangle,
    title: "Not financial advice",
    body: "Educational illustrations only. Your taxes, fees, and risk tolerance are unique.",
    href: "/disclaimer",
    linkLabel: "Disclaimer",
  },
] as const;

export function TrustStrip() {
  return (
    <section className="border-b border-zinc-800/60 bg-zinc-900/30">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 sm:py-12">
        {items.map(({ icon: Icon, title, body, href, linkLabel }) => (
          <div key={title} className="flex gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800/80 text-emerald-400">
              <Icon className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">{title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">{body}</p>
              <Link
                href={href}
                className="mt-2 inline-block text-xs font-medium text-emerald-400/90 hover:underline"
              >
                {linkLabel} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
