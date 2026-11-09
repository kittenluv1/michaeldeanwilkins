import { notFound } from "next/navigation";
import GridSection from "@/components/galleryGrid";
import {
  getPortalPage,
  getPortalPages,
  getGallery,
  getHomepage,
  getSectionTitles,
} from "@/sanity/queries/fetch";
import { slugify } from "@/lib/utils";
import ObjectGrid from "@/components/objectGrid";

export async function generateStaticParams() {
  const pages = await getPortalPages();

  const portalParams = pages.flatMap((page) =>
    page.galleries.flatMap((entry) =>
      entry.gallery?.title
        ? [
            {
              portal: slugify(page.title),
              gallery: slugify(entry.gallery.title),
            },
          ]
        : [],
    ),
  );
  // homepage galleries are not included on portal pages, but are also displayed here at /[homepageTitle]/[gallery]
  const { homePage } = await getSectionTitles();
  const homePageParams = homePage
    ? homePage.galleries.map((entry) => ({
        portal: slugify(homePage.title),
        gallery: slugify(entry.title),
      }))
    : [];

  return [...portalParams, ...homePageParams];
}

export default async function PortalGallery({
  params,
  searchParams,
}: {
  params: Promise<{ portal: string; gallery: string }>;
  searchParams: Promise<{ photo?: string; object?: string }>;
}) {
  const { portal, gallery } = await params;
  const { photo, object } = await searchParams;
  const pages = await getPortalPages();
  const pageSummary = pages.find((page) => slugify(page.title) === portal);

  const homePage = await getHomepage();
  if (homePage && slugify(homePage.title) === portal) {
    const gallerySummary = homePage.galleries.find(
      (entry) => slugify(entry.title) === gallery,
    );
    if (!gallerySummary) notFound();

    const galleryData = await getGallery(gallerySummary.title);
    if (!galleryData) notFound();

    if (galleryData.galleryType === "object") {
      return (
        <div className="px-10">
          <ObjectGrid
            objects={galleryData.items}
            objectId={object}
          />
        </div>
      );
    }

    return (
      <div className="px-10">
        <GridSection photos={galleryData.items ?? []} photoId={photo} />
      </div>
    );
  }

  if (!pageSummary) notFound();

  const page = await getPortalPage(pageSummary.title);
  const gallerySummary = page?.galleries.find(
    (entry) => entry.gallery && slugify(entry.gallery.title) === gallery,
  );

  if (!gallerySummary?.gallery?.title) notFound();

  const galleryData = await getGallery(gallerySummary.gallery.title);
  if (!galleryData) notFound();

  if (galleryData.galleryType === "object") {
    return (
      <div className="px-10">
        <ObjectGrid
          objects={galleryData.items}
          objectId={object}
        />
      </div>
    );
  }

  return (
    <div className="px-10">
      <GridSection photos={galleryData.items ?? []} photoId={photo} />
    </div>
  );
}
