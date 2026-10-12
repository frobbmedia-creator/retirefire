import { getAllPosts as baseGetAllPosts, getPost as baseGetPost } from "./posts";
import type { BlogPost } from "./posts";
import { PILLAR_POSTS } from "./pillar-posts";

export type { BlogPost };

export function getPost(slug: string): BlogPost | undefined {
  return baseGetPost(slug) ?? PILLAR_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...baseGetAllPosts(), ...PILLAR_POSTS].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
}
