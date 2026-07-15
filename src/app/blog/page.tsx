import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/content/blog/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Educational guides on FIRE numbers, Coast FIRE, Barista FIRE, and transparent retirement math.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Blog
      </h1>
      <p className="mt-3 text-zinc-400">
        Short, evidence-oriented explainers — no product pitches. Pair with the{" "}
        <Link href="/#calculators" className="text-emerald-400 hover:underline">
          calculators
        </Link>{" "}
        and{" "}
        <Link href="/methodology" className="text-emerald-400 hover:underline">
          methodology
        </Link>
        .
      </p>

      <ul className="mt-10 space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-emerald-500/30 hover:bg-zinc-900"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <time dateTime={post.date}>{post.date}</time>
                <span>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <p className="mt-2 text-lg font-medium text-zinc-50">{post.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                {post.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
