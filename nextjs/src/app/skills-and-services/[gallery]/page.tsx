import { notFound } from "next/navigation";
import { getSectionTitles } from "@/sanity/queries/fetch";
import { getGallery } from "@/sanity/queries/fetch";
import GridSection from "@/components/galleryGrid";
import { slugify } from "@/lib/utils";

export async function generateStaticParams() {
  const { skillsAndServices } = await getSectionTitles();

  return skillsAndServices.map((section) => ({
    gallery: slugify(section.title),
  }));
}

export default async function SkillsAndServicesGallery({
  params,
  searchParams,
}: {
  params: Promise<{ gallery: string }>;
  searchParams: Promise<{ photo?: string }>;
}) {
  const { gallery } = await params;
  const { photo } = await searchParams;
  const { skillsAndServices } = await getSectionTitles();
  const allowedGalleries = skillsAndServices.map((section) =>
    slugify(section.title),
  );
  const gallerySection = skillsAndServices.find(
    (section) => slugify(section.title) === gallery,
  );

  if (!allowedGalleries.includes(gallery) || !gallerySection) notFound();

  const galleryData = await getGallery(gallerySection.title);
  if (!galleryData) notFound();

  return (
    <div className="px-10">
      <GridSection photos={galleryData.photos ?? []} photoId={photo} />
    </div>
  );
}
