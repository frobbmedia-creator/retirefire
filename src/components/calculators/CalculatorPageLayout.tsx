import Link from "next/link";
import type { ReactNode } from "react";
import { PlannerShell } from "@/components/planner/PlannerShell";
import { CalculatorHub } from "@/components/calculators/CalculatorHub";

type Tool = "fire" | "years" | "coast" | "barista" | "savings";

export function CalculatorPageLayout({
  title,
  description,
  sharePath,
  tools,
  children,
}: {
  title: string;
  description: string;
  sharePath: string;
  tools: Tool[];
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-emerald-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-emerald-400">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{title}</span>
      </nav>

      <header className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zinc-400">
          {description}
        </p>
      </header>

      {children}

      <div className="mt-10">
        <PlannerShell sharePath={sharePath}>
          <CalculatorHub showHeading={false} tools={tools} />
        </PlannerShell>
      </div>

      <p className="mt-10 text-sm text-zinc-500">
        <Link href="/methodology" className="text-emerald-400 hover:underline">
          Methodology
        </Link>
        {" · "}
        <Link href="/disclaimer" className="text-emerald-400 hover:underline">
          Disclaimer
        </Link>
        {" · "}
        <Link href="/#faq" className="text-emerald-400 hover:underline">
          FAQ
        </Link>
      </p>
    </div>
  );
}
