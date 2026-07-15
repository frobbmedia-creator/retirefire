import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Educational free vs Coming Pro labels — never dark-pattern lock free core.
 * See docs/growth/06-feature-backlog-freemium.md and /approach.
 */
export function ProTeaserStrip({
  freeLabel,
  proLabel,
  className,
}: {
  freeLabel: string;
  proLabel: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-xl bg-zinc-950/50 px-3 py-2 text-[11px] leading-snug ring-1 ring-zinc-800",
        className,
      )}
    >
      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-300/90 ring-1 ring-emerald-500/25">
        Free
      </span>
      <span className="text-zinc-400">{freeLabel}</span>
      <span className="text-zinc-700" aria-hidden>
        ·
      </span>
      <span className="rounded-full bg-zinc-800/80 px-2 py-0.5 font-medium text-zinc-500 ring-1 ring-zinc-700">
        Coming Pro
      </span>
      <span className="text-zinc-500">{proLabel}</span>
      <Link
        href="/approach"
        className="ml-auto shrink-0 text-zinc-500 underline-offset-2 hover:text-emerald-400 hover:underline"
      >
        What stays free
      </Link>
    </div>
  );
}
