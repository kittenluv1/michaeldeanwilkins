import { connection } from "next/server";
import { notFound } from "next/navigation";
import GridSection from "@/components/gridSection";
import ImagePopup from "@/components/imagePopup";
import { getGallery } from "@/sanity/queries";

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
    <section className="relative min-h-screen w-full">
      {photo && <ImagePopup photoId={photo} photos={activeSection.photos} />}
      <div className={photo ? "pointer-events-none absolute inset-0 z-0 overflow-hidden" : "relative"}>
        <GridSection photos={activeSection.photos ?? []} />
      </div>
    </section>
  );
}