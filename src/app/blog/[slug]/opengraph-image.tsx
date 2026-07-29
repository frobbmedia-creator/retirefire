import { generatedOgImage, ogImageSize } from "@/components/seo/GeneratedOgImage";
import { getPost } from "@/content/blog/posts";

export const alt = "RetireFire educational guide";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return generatedOgImage(post?.title ?? "RetireFire guide", "FIRE guide");
}
