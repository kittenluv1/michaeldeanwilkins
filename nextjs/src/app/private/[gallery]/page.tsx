import { notFound } from "next/navigation";
import {
  getPrivateSectionTitles,
  getPrivateSectionTitlesForStaticParams,
  getGallery,
} from "@/sanity/queries/fetch";
import GridSection from "@/components/galleryGrid";
import { slugify } from "@/lib/utils";
import { stegaClean } from "next-sanity";

export async function generateStaticParams() {
  const privatePages = await getPrivateSectionTitlesForStaticParams();

  return privatePages.map((section) => ({
    gallery: slugify(section.title),
  }));
}

export default async function privateGallery({
  params,
  searchParams,
}: {
  params: Promise<{ gallery: string }>;
  searchParams: Promise<{ photo?: string; object?: string }>;
}) {
  const { gallery } = await params;
  const { photo, object } = await searchParams;
  const privatePages = (await getPrivateSectionTitles()) ?? [];
  const allowedGalleries = privatePages.map((section) =>
    slugify(stegaClean(section.title)),
  );
  const gallerySection = privatePages.find(
    (section) => slugify(stegaClean(section.title)) === gallery,
  );

  if (!allowedGalleries.includes(gallery) || !gallerySection) notFound();

  const galleryData = await getGallery(gallerySection.title);
  if (!galleryData) notFound();

  if (stegaClean(galleryData.galleryType) === "object") {
    return (
      <GridSection
        items={galleryData.items}
        galleryType="object"
        objectId={object}
      />
    );
  }

  return (
    <GridSection items={galleryData.items} galleryType="photo" photoId={photo} />
  );
}
