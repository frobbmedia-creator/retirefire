import {
  getAllPosts as baseGetAllPosts,
  getPost as baseGetPost,
} from "./posts";
import type { BlogPost } from "./posts";
import { PILLAR_POSTS } from "./pillar-posts";
import { QUEUE_A_POSTS } from "./queue-a";
import { QUEUE_B_POSTS } from "./queue-b";
import { QUEUE_C_POSTS } from "./queue-c";
import { QUEUE_D_POSTS } from "./queue-d";

export type { BlogPost };

/**
 * Queue files override posts.ts on slug collision (rewrites), so they are
 * checked first. Pillar posts are additive (unique slugs).
 */
const QUEUE_POSTS: BlogPost[] = [
  ...QUEUE_A_POSTS,
  ...QUEUE_B_POSTS,
  ...QUEUE_C_POSTS,
  ...QUEUE_D_POSTS,
];

const queueSlugs = new Set(QUEUE_POSTS.map((p) => p.slug));

export function getPost(slug: string): BlogPost | undefined {
  return (
    QUEUE_POSTS.find((p) => p.slug === slug) ??
    baseGetPost(slug) ??
    PILLAR_POSTS.find((p) => p.slug === slug)
  );
}

export function getAllPosts(): BlogPost[] {
  const base = baseGetAllPosts().filter((p) => !queueSlugs.has(p.slug));
  return [...QUEUE_POSTS, ...base, ...PILLAR_POSTS].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
}
