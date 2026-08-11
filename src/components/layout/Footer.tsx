import Link from "next/link";
import { Flame } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  const groups = [
    {
      label: "Tools",
      links: [
        ["/retirement-checkup", "Retirement Checkup"],
        ["/calculators", "All calculators"],
        ["/calculators/fire-number", "FIRE Number"],
        ["/calculators/years-to-fire", "Years to FIRE"],
        ["/calculators/coast-fire", "Coast FIRE"],
        ["/calculators/retirement-age", "Retirement Age"],
      ],
    },
    {
      label: "Learn",
      links: [
        ["/blog", "Blog"],
        ["/guides", "Guides"],
        ["/research", "Research"],
        ["/resources", "Resources"],
        ["/methodology", "Methodology"],
      ],
    },
    {
      label: "Trust",
      links: [
        ["/approach", "Approach"],
        ["/disclaimer", "Disclaimer"],
        ["/#faq", "FAQ"],
      ],
    },
  ] as const;

  return (
    <footer className="mt-auto border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_2fr] lg:items-start">
          <div className="max-w-md">
            <div className="flex items-center gap-2 font-semibold text-zinc-100">
              <Flame className="h-4 w-4 text-emerald-400" aria-hidden />
              {SITE.name}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
              Free, transparent FIRE calculators. Educational tools only — not
              financial, tax, or investment advice.
            </p>
          </div>

          <div className="grid gap-5 text-sm sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {group.label}
                </p>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-zinc-500">
                  {group.links.map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="hover:text-emerald-400">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-zinc-800/80 pt-4 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>
            Built for clarity — not hype.{" "}
            <Link href="/methodology" className="text-zinc-500 hover:text-emerald-400">
              Methodology
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
