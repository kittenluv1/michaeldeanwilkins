import { connection } from "next/server";
import { notFound } from "next/navigation";
import GridSection from "@/components/gridSection";
import ImageModal from "@/components/imageModal";
import { getGallery } from "@/sanity/queries/fetch";

export default async function GalleryPage({
  galleryTitle,
  searchParams,
}: {
  galleryTitle: string;
  searchParams: Promise<{ photo?: string }>;
}) {
  await connection();
  const { photo } = await searchParams;
  const activeSection = await getGallery(galleryTitle);

  if (!activeSection) notFound();

  return (
    <section className="relative w-full">
      {photo && <ImageModal photoId={photo} photos={activeSection.photos} />}
      <GridSection photos={activeSection.photos ?? []} />
    </section>
  );
}
