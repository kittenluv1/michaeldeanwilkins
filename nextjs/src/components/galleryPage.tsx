import { connection } from "next/server";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/live";
import GridSection from "@/components/gridSection";
import ImagePopup from "@/components/imagePopup";
import { HOMEPAGE_QUERY } from "@/sanity/queries";
import { slugify } from "@/lib/utils";

export default async function GalleryPage({
  gallery,
  searchParams,
}: {
  gallery: string;
  searchParams: Promise<{ photo?: string }>;
}) {
  await connection();
  const { photo } = await searchParams;
  const { data: homepage } = await sanityFetch({ query: HOMEPAGE_QUERY, stega: true });
  const subsections = homepage?.subsections ?? [];
  const activeSection =
    subsections.find((section: any) => slugify(section.title) === gallery) ||
    subsections.find((section: any) => section._type === "gridSection") ||
    subsections[0];

  if (!activeSection || activeSection._type !== "gridSection") notFound();

  return (
    <section className="relative min-h-screen w-full">
      {photo && <ImagePopup photoId={photo} photos={activeSection.photos} />}
      <div className={photo ? "pointer-events-none absolute inset-0 z-0 overflow-hidden" : "relative"}>
        <GridSection photos={activeSection.photos ?? []} />
      </div>
    </section>
  );
}