import { notFound } from "next/navigation";
import GridSection from "@/components/galleryGrid";
import { getPortalPage, getPortalPages, getGallery } from "@/sanity/queries/fetch";
import { slugify } from "@/lib/utils";

export async function generateStaticParams() {
  const pages = await getPortalPages();

  return pages.flatMap((page) =>
    page.galleries.flatMap((entry) =>
      entry.gallery?.title
        ? [{ portal: slugify(page.title), gallery: slugify(entry.gallery.title) }]
        : [],
    ),
  );
}

export default async function PortalGallery({
  params,
  searchParams,
}: {
  params: Promise<{ portal: string; gallery: string }>;
  searchParams: Promise<{ photo?: string }>;
}) {
  const { portal, gallery } = await params;
  const { photo } = await searchParams;
  const pages = await getPortalPages();
  const pageSummary = pages.find((page) => slugify(page.title) === portal);

  if (!pageSummary) notFound();

  const page = await getPortalPage(pageSummary.title);
  const gallerySummary = page?.galleries.find(
    (entry) => entry.gallery && slugify(entry.gallery.title) === gallery,
  );

  if (!gallerySummary?.gallery?.title) notFound();

  const galleryData = await getGallery(gallerySummary.gallery.title);
  if (!galleryData) notFound();

  return (
    <div className="px-10">
      <GridSection photos={galleryData.photos ?? []} photoId={photo} />
    </div>
  );
}
