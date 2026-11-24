import ErrorMessage from "@/components/ErrorMessage";
import GridSection from "@/components/galleryGrid";
import {
  getPortalPage,
  getPortalPages,
  getPortalPagesForStaticParams,
  getGallery,
  getHomepage,
  getSectionTitlesForStaticParams,
} from "@/sanity/queries/fetch";
import { slugify } from "@/lib/utils";
import { stegaClean } from "next-sanity";

export async function generateStaticParams() {
  const pages = (await getPortalPagesForStaticParams()) ?? [];

  const portalParams = pages.flatMap((page) => {
    const portalTitle = stegaClean(page.title);
    if (!portalTitle) return [];

    return page.galleries.flatMap((entry) => {
      const galleryTitle = stegaClean(entry.gallery?.title);
      return galleryTitle
        ? [
            {
              portal: slugify(portalTitle),
              gallery: slugify(galleryTitle),
            },
          ]
        : [];
    });
  });
  // homepage galleries are not included on portal pages, but are also displayed here at /[homepageTitle]/[gallery]
  const sections = await getSectionTitlesForStaticParams();
  const homePage = sections?.homePage;
  const homePageTitle = stegaClean(homePage?.title);
  const homePageParams = homePageTitle
    ? (homePage?.galleries ?? []).flatMap((entry) => {
        const galleryTitle = stegaClean(entry.title);
        return galleryTitle
          ? [
              {
                portal: slugify(homePageTitle),
                gallery: slugify(galleryTitle),
              },
            ]
          : [];
      })
    : [];

  return [...portalParams, ...homePageParams];
}

export default async function PortalGallery({
  params,
  searchParams,
}: {
  params: Promise<{ portal: string; gallery: string }>;
  searchParams: Promise<{
    item?: string;
  }>;
}) {
  const { portal, gallery } = await params;
  const { item } = await searchParams;
  const pages = (await getPortalPages()) ?? [];
  const pageSummary = pages.find(
    (page) => slugify(stegaClean(page.title)) === portal,
  );

  const homePage = await getHomepage();
  if (homePage && slugify(stegaClean(homePage.title)) === portal) {
    const gallerySummary = homePage.galleries.find(
      (entry) => slugify(stegaClean(entry.title)) === gallery,
    );
    if (!gallerySummary) {
      return <ErrorMessage>Gallery not found.</ErrorMessage>;
    }

    const galleryTitle = stegaClean(gallerySummary.title);
    if (!galleryTitle) {
      return <ErrorMessage>Gallery title is unavailable.</ErrorMessage>;
    }
    const galleryData = await getGallery(galleryTitle);
    if (!galleryData) {
      return <ErrorMessage>Gallery content is unavailable.</ErrorMessage>;
    }

    const galleryType = stegaClean(galleryData.galleryType) as
      "photo" | "object" | "retouch";
    return (
      <GridSection
        items={galleryData.items}
        galleryType={galleryType}
        itemId={item}
      />
    );
  }

  if (!pageSummary) {
    return <ErrorMessage>Portal page not found.</ErrorMessage>;
  }

  const page = await getPortalPage(pageSummary.title);
  const gallerySummary = page?.galleries.find(
    (entry) =>
      entry.gallery && slugify(stegaClean(entry.gallery.title)) === gallery,
  );

  if (!gallerySummary?.gallery?.title) {
    return <ErrorMessage>Gallery title is unavailable.</ErrorMessage>;
  }
  const galleryTitle = stegaClean(gallerySummary.gallery.title);
  if (!galleryTitle) {
    return <ErrorMessage>Gallery title is unavailable.</ErrorMessage>;
  }

  const galleryData = await getGallery(
    galleryTitle,
  );
  if (!galleryData) {
    return <ErrorMessage>Gallery content is unavailable.</ErrorMessage>;
  }

  const galleryType = stegaClean(galleryData.galleryType) as
    "photo" | "object" | "retouch";
  return (
    <GridSection
      items={galleryData.items}
      galleryType={galleryType}
      itemId={item}
    />
  );
}
