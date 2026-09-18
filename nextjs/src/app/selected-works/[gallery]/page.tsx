import { notFound } from "next/navigation";
import { getSectionTitles } from "@/sanity/queries";
import GalleryPage from "@/components/galleryPage";
import { slugify } from "@/lib/utils";

export async function generateStaticParams() {
  const { selectedWorks } = await getSectionTitles();

  return selectedWorks.map((section) => ({
    gallery: slugify(section.title),
  }));
}

export default async function SelectedWorksGallery({
  params,
  searchParams,
}: {
  params: Promise<{ gallery: string }>;
  searchParams: Promise<{ photo?: string }>;
}) {
  const { gallery } = await params;
  const { selectedWorks } = await getSectionTitles();
  const gallerySection = selectedWorks.find((section) => slugify(section.title) === gallery);

  if (!gallerySection) notFound();

  return <GalleryPage galleryTitle={gallerySection.title} searchParams={searchParams} />;
}