import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/content/blog/posts";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  pageMeta,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const TAG_CALCULATOR: Record<string, { href: string; label: string }> = {
  "lean-fire": {
    href: "/calculators/fire-number",
    label: "FIRE Number calculator (Lean preset)",
  },
  "fire-number": {
    href: "/calculators/fire-number",
    label: "FIRE Number calculator",
  },
  "coast-fire": {
    href: "/calculators/coast-fire",
    label: "Coast FIRE calculator",
  },
  "barista-fire": {
    href: "/calculators/barista-fire",
    label: "Barista FIRE calculator",
  },
  "years-to-fire": {
    href: "/calculators/years-to-fire",
    label: "Years to FIRE calculator",
  },
  "sequence-risk": {
    href: "/calculators/coast-fire",
    label: "Coast FIRE + free stress test",
  },
  "stress-test": {
    href: "/resources/sequence-risk-guide",
    label: "Sequence risk guide",
  },
  tables: {
    href: "/calculators/coast-fire",
    label: "Coast FIRE age table",
  },
  linkable: {
    href: "/calculators/coast-fire",
    label: "Coast FIRE calculator",
  },
  methodology: {
    href: "/methodology",
    label: "Methodology",
  },
  comparison: {
    href: "/#scenario-compare",
    label: "Scenario A/B compare",
  },
  "semi-retirement": {
    href: "/calculators/barista-fire",
    label: "Barista FIRE calculator",
  },
  "2026": {
    href: "/calculators/fire-number",
    label: "FIRE Number calculator",
  },
  swr: {
    href: "/calculators/fire-number",
    label: "FIRE Number calculator",
  },
  basics: {
    href: "/calculators",
    label: "All calculators",
  },
};

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  const path = `/blog/${post.slug}`;
  return pageMeta(path, {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} · ${SITE.name}`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [SITE.name],
    },
    authors: [{ name: SITE.name, url: `https://${SITE.domain}` }],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const relatedCalc =
    post.tags.map((t) => TAG_CALCULATOR[t]).find(Boolean) ??
    TAG_CALCULATOR.basics;

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ])}
      />
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.description,
          path,
          date: post.date,
          readingMinutes: post.readingMinutes,
        })}
      />

      <nav className="text-xs text-zinc-500" aria-label="Breadcrumb">
        <Link href="/blog" className="hover:text-emerald-400">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{post.title}</span>
      </nav>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <time dateTime={post.date}>{post.date}</time>
          <span>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-zinc-400">{post.description}</p>
      </header>

      <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-zinc-300">
        {post.body.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2
                key={i}
                className="pt-4 text-xl font-semibold text-zinc-50"
              >
                {block.content as string}
              </h2>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={i} className="list-disc space-y-2 pl-5 text-zinc-400">
                {(block.content as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="text-zinc-400">
              {block.content as string}
            </p>
          );
        })}
      </div>

      <footer className="mt-12 space-y-4">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-sm text-zinc-300">
          <p className="font-medium text-emerald-300">Try the related tool</p>
          <p className="mt-2 text-zinc-400">
            Pair this guide with a free, transparent calculator.
          </p>
          <p className="mt-3">
            <Link
              href={relatedCalc.href}
              className="font-medium text-emerald-400 hover:underline"
            >
              Open {relatedCalc.label} →
            </Link>
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs">
            <li>
              <Link
                href="/resources/coast-fire-checklist"
                className="rounded-full bg-zinc-950/50 px-2.5 py-1 text-zinc-400 ring-1 ring-zinc-800 hover:text-emerald-400"
              >
                Coast checklist
              </Link>
            </li>
            <li>
              <Link
                href="/resources/sequence-risk-guide"
                className="rounded-full bg-zinc-950/50 px-2.5 py-1 text-zinc-400 ring-1 ring-zinc-800 hover:text-emerald-400"
              >
                Sequence risk guide
              </Link>
            </li>
            <li>
              <Link
                href="/#scenario-compare"
                className="rounded-full bg-zinc-950/50 px-2.5 py-1 text-zinc-400 ring-1 ring-zinc-800 hover:text-emerald-400"
              >
                Compare A/B
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-400">
          <p>
            Educational content only — not financial advice.{" "}
            <Link href="/disclaimer" className="text-emerald-400 hover:underline">
              Disclaimer
            </Link>
            .
          </p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            <Link
              href="/methodology"
              className="font-medium text-emerald-400 hover:underline"
            >
              Methodology
            </Link>
            <Link
              href="/approach"
              className="font-medium text-emerald-400 hover:underline"
            >
              Approach
            </Link>
            <Link
              href="/resources"
              className="font-medium text-emerald-400 hover:underline"
            >
              All resources
            </Link>
            <Link
              href="/blog"
              className="font-medium text-emerald-400 hover:underline"
            >
              More guides
            </Link>
          </p>
        </div>
      </footer>
    </article>
  );
}
