import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/content/blog/posts";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} · ${SITE.name}`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="text-xs text-zinc-500">
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

      <footer className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-400">
        <p>
          Educational content only — not financial advice.{" "}
          <Link href="/disclaimer" className="text-emerald-400 hover:underline">
            Disclaimer
          </Link>
          .
        </p>
        <p className="mt-3">
          <Link href="/#calculators" className="font-medium text-emerald-400 hover:underline">
            Open calculators →
          </Link>
        </p>
      </footer>
    </article>
  );
}
