import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * Visual + JSON-LD breadcrumbs. Last item is the current page (not linked).
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav
        className={cn("text-xs text-zinc-500", className)}
        aria-label="Breadcrumb"
      >
        <ol className="flex flex-wrap items-center gap-x-0">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.path}-${i}`} className="flex items-center">
                {i > 0 && <span className="mx-2 text-zinc-700">/</span>}
                {isLast ? (
                  <span className="text-zinc-400" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-emerald-400"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
