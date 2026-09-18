import { notFound } from "next/navigation";
import { getGridSections } from "@/sanity/queries";
import GalleryPage from "@/components/galleryPage";
import { slugify } from "@/lib/utils";

export async function generateStaticParams() {
  const sections = await getGridSections("homepage");

  return sections.map((section) => ({
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
  const sections = await getGridSections("homepage");
  const allowedGalleries = sections.map((section) => slugify(section.title));

  if (!allowedGalleries.includes(gallery)) notFound();

  return <GalleryPage gallery={gallery} searchParams={searchParams} />;
}