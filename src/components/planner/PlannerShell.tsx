"use client";

import { Suspense, type ReactNode } from "react";
import { PlannerProvider } from "./PlannerProvider";

function Fallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center text-sm text-zinc-500">
      Loading calculators…
    </div>
  );
}

/** Wraps children with planner state (Suspense required for useSearchParams). */
export function PlannerShell({
  children,
  sharePath = "/",
}: {
  children: ReactNode;
  sharePath?: string;
}) {
  return (
    <Suspense fallback={<Fallback />}>
      <PlannerProvider sharePath={sharePath}>{children}</PlannerProvider>
    </Suspense>
  );
}
