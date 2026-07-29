import { generatedOgImage, ogImageSize } from "@/components/seo/GeneratedOgImage";
import { getDecisionPage } from "@/content/decision-pages";

export const alt = "RetireFire planning guide";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}) {
  const { seoSlug } = await params;
  const page = getDecisionPage(seoSlug);
  return generatedOgImage(page?.title ?? "RetireFire planning guide", page?.eyebrow ?? "Planning guide");
}
