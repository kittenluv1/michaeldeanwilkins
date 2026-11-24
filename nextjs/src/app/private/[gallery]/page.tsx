import {
  getPrivateSectionTitles,
  getPrivateSectionTitlesForStaticParams,
  getGallery,
} from "@/sanity/queries/fetch";
import GridSection from "@/components/galleryGrid";
import { slugify } from "@/lib/utils";
import { stegaClean } from "next-sanity";
import ErrorMessage from "@/components/ErrorMessage";

export async function generateStaticParams() {
  const privatePages = await getPrivateSectionTitlesForStaticParams();

  return privatePages.flatMap((section) => {
    const title = stegaClean(section.title);
    return title ? [{ gallery: slugify(title) }] : [];
  });
}

export default async function privateGallery({
  params,
  searchParams,
}: {
  params: Promise<{ gallery: string }>;
  searchParams: Promise<{
    item?: string;
  }>;
}) {
  const { gallery } = await params;
  const { item } = await searchParams;
  const privatePages = (await getPrivateSectionTitles()) ?? [];
  const allowedGalleries = privatePages.map((section) =>
    slugify(stegaClean(section.title)),
  );
  const gallerySection = privatePages.find(
    (section) => slugify(stegaClean(section.title)) === gallery,
  );

  if (!allowedGalleries.includes(gallery) || !gallerySection) {
    return <ErrorMessage>Private gallery not found.</ErrorMessage>;
  }

  const galleryData = await getGallery(gallerySection.title);
  if (!galleryData) {
    return <ErrorMessage>Private gallery content is unavailable.</ErrorMessage>;
  }

  const galleryType = stegaClean(galleryData.galleryType) as
    "photo" | "object" | "retouch";
  return (
    <GridSection
      items={galleryData.items}
      galleryType={galleryType}
      itemId={item}
    />
  );
}
