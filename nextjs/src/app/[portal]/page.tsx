import Link from "next/link";
import {
  getPortalPage,
  getPortalPages,
  getPortalPagesForStaticParams,
} from "@/sanity/queries/fetch";
import { slugify } from "@/lib/utils";
import HeroSlider from "@/components/heroSlider";
import ImageWrapper from "@/components/image";
import { stegaClean } from "next-sanity";
import ErrorMessage from "@/components/ErrorMessage";

export async function generateStaticParams() {
  const pages = (await getPortalPagesForStaticParams()) ?? [];
  return pages.flatMap((page) => {
    const title = stegaClean(page.title);
    return title ? [{ portal: slugify(title) }] : [];
  });
}

export default async function PortalPage({
  params,
}: {
  params: Promise<{ portal: string }>;
}) {
  const { portal } = await params;
  const pages = (await getPortalPages()) ?? [];
  const pageSummary = pages.find(
    (page) => page.title && slugify(stegaClean(page.title)) === portal,
  );

  if (!pageSummary) {
    return <ErrorMessage>Portal page not found.</ErrorMessage>;
  }

  const portalTitle = stegaClean(pageSummary.title);
  if (!portalTitle) {
    return <ErrorMessage>Portal page title is invalid.</ErrorMessage>;
  }

  const page = await getPortalPage(pageSummary.title);
  if (!page) {
    return <ErrorMessage>Portal page content is unavailable.</ErrorMessage>;
  }

  return (
    <section className="w-full">
      <HeroSlider slides={page.hero?.hero} />
      <div className="grid grid-cols-1 gap-4 p-6 lg:gap-8 md:grid-cols-2 lg:p-10">
        {page.galleries.map((entry) => {
          const title = entry.gallery?.title;
          const image = entry.galleryImage;

          if (!title || !image) return null;

          return (
            <Link
              key={entry.gallery?._id ? stegaClean(entry.gallery._id) : title}
              href={`/${portal}/${slugify(stegaClean(title))}`}
              className="group relative aspect-[5/3] overflow-hidden"
            >
              <ImageWrapper photo={image} altText={title} cover />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-3xl font-medium text-white sm:text-4xl lg:text-5xl xl:text-6xl underline md:no-underline">
                {title.toUpperCase()}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
