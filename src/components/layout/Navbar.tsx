"use client";

import Link from "next/link";
import { useState } from "react";
import { Flame, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const links = [
  { href: "/retirement-checkup", label: "Checkup" },
  { href: "/calculators", label: "Calculators" },
  { href: "/calculators/fire-number", label: "FIRE Number" },
  { href: "/calculators/coast-fire", label: "Coast" },
  { href: "/calculators/barista-fire", label: "Barista" },
  { href: "/resources", label: "Resources" },
  { href: "/guides", label: "Guides" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/methodology", label: "Methodology" },
  { href: "/approach", label: "Approach" },
  { href: "/pro", label: "Pro" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30 transition group-hover:bg-emerald-500/25 sm:h-11 sm:w-11">
            <Flame className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </span>
          <span>
            {SITE.name}
            <span className="ml-2 hidden text-xs font-normal tracking-normal text-zinc-500 xl:inline">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-sm transition hover:bg-zinc-800/80 hover:text-zinc-100",
                link.href === "/pro"
                  ? "bg-emerald-500/10 font-semibold text-emerald-300 ring-1 ring-emerald-500/25"
                  : "text-zinc-400",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-300 hover:bg-zinc-800 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-zinc-800 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-3">
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
