"use client";

import Link from "next/link";
import { useState } from "react";
import { Flame, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const links = [
  { href: "/calculators", label: "Calculators" },
  { href: "/calculators/fire-number", label: "FIRE Number" },
  { href: "/calculators/coast-fire", label: "Coast" },
  { href: "/calculators/barista-fire", label: "Barista" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/methodology", label: "Methodology" },
  { href: "/approach", label: "Approach" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold tracking-tight text-zinc-50"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30 transition group-hover:bg-emerald-500/25">
            <Flame className="h-4 w-4" aria-hidden />
          </span>
          <span>
            {SITE.name}
            <span className="ml-1.5 hidden text-xs font-normal text-zinc-500 lg:inline">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-1.5 text-sm text-zinc-400 transition hover:bg-zinc-800/80 hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-300 hover:bg-zinc-800 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-zinc-800 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
