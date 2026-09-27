import { notFound } from "next/navigation";
import { getPrivateSectionTitles } from "@/sanity/queries/fetch";
import GalleryPage from "@/components/galleryPage";
import { slugify } from "@/lib/utils";

export async function generateStaticParams() {
  const privatePages = await getPrivateSectionTitles();

  return privatePages.map((section) => ({
    gallery: slugify(section.title),
  }));
}

export default async function privateGallery({
  params,
  searchParams,
}: {
  params: Promise<{ gallery: string }>;
  searchParams: Promise<{ photo?: string }>;
}) {
  const { gallery } = await params;
  const privatePages = await getPrivateSectionTitles();
  const allowedGalleries = privatePages.map((section) =>
    slugify(section.title),
  );
  const gallerySection = privatePages.find(
    (section) => slugify(section.title) === gallery,
  );

  if (!allowedGalleries.includes(gallery) || !gallerySection) notFound();

  return (
    <GalleryPage
      galleryTitle={gallerySection.title}
      searchParams={searchParams}
    />
  );
}
