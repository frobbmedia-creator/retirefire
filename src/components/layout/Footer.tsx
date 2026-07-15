import Link from "next/link";
import { Flame } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-semibold text-zinc-100">
              <Flame className="h-4 w-4 text-emerald-400" aria-hidden />
              {SITE.name}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Free, transparent FIRE calculators. Educational tools only — not
              financial, tax, or investment advice.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 sm:gap-12">
            <div>
              <p className="font-medium text-zinc-300">Tools</p>
              <ul className="mt-3 space-y-2 text-zinc-500">
                <li>
                  <Link href="/calculators/fire-number" className="hover:text-emerald-400">
                    FIRE Number
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/years-to-fire" className="hover:text-emerald-400">
                    Years to FIRE
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/coast-fire" className="hover:text-emerald-400">
                    Coast FIRE
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/barista-fire" className="hover:text-emerald-400">
                    Barista FIRE
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-zinc-300">Learn</p>
              <ul className="mt-3 space-y-2 text-zinc-500">
                <li>
                  <Link href="/blog" className="hover:text-emerald-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/methodology" className="hover:text-emerald-400">
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link href="/approach" className="hover:text-emerald-400">
                    Approach &amp; roadmap
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-emerald-400">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/coast-fire-checklist"
                    className="hover:text-emerald-400"
                  >
                    Coast checklist
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-emerald-400">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-zinc-300">Trust</p>
              <ul className="mt-3 space-y-2 text-zinc-500">
                <li>
                  <Link href="/disclaimer" className="hover:text-emerald-400">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/approach" className="hover:text-emerald-400">
                    Limitations
                  </Link>
                </li>
                <li>
                  <a
                    href="https://vercel.com/analytics"
                    className="hover:text-emerald-400"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Privacy-friendly analytics
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-800/80 pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
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
