import Link from "next/link";

const ages = [
  { href: "/retire-at-40", label: "40" },
  { href: "/retire-at-45", label: "45" },
  { href: "/retire-at-50", label: "50" },
  { href: "/retire-at-55", label: "55" },
  { href: "/retire-at-60", label: "60" },
  { href: "/retire-at-62", label: "62" },
];

const portfolios = [
  { href: "/can-i-retire-with-400k", label: "$400k" },
  { href: "/can-i-retire-with-500k", label: "$500k" },
  { href: "/can-i-retire-with-750k", label: "$750k" },
  { href: "/can-i-retire-with-1-million", label: "$1M" },
  { href: "/can-i-retire-with-1-5-million", label: "$1.5M" },
  { href: "/can-i-retire-with-2-million", label: "$2M" },
  { href: "/can-i-retire-with-3-million", label: "$3M" },
];

const extras = [
  { href: "/fire-number-by-spending", label: "FIRE number by spending" },
  { href: "/coast-fire-by-age", label: "Coast FIRE by age" },
  { href: "/fire-calculator-with-social-security", label: "Add Social Security" },
  { href: "/early-retirement-health-insurance", label: "Healthcare before Medicare" },
];

export function DecisionCluster() {
  return (
    <section
      id="decisions"
      className="scroll-mt-20 border-b border-zinc-800/60 bg-zinc-950"
    >
      <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-12">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400">
          Decision pages
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Start with the question you actually typed
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Age and portfolio pages translate a search into a spending range,
          a withdrawal-rate table, and a free calculator. No account.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-zinc-200">
              How much to retire at…
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ages.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex h-11 min-w-14 items-center justify-center rounded-xl bg-zinc-900 px-3 text-sm font-medium text-zinc-100 ring-1 ring-zinc-800 hover:bg-zinc-800 hover:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-200">
              Can I retire with…
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {portfolios.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-3 text-sm font-medium text-zinc-100 ring-1 ring-zinc-800 hover:bg-zinc-800 hover:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-500">
          {extras.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-emerald-400">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
