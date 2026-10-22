import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortalPage, getPortalPages } from "@/sanity/queries/fetch";
import { slugify } from "@/lib/utils";
import HeroSlider from "@/components/heroSlider";
import ImageWrapper from "@/components/image";

export async function generateStaticParams() {
  const pages = await getPortalPages();

  return pages.map((page) => ({
    portal: slugify(page.title),
  }));
}

export default async function PortalPage({
  params,
}: {
  params: Promise<{ portal: string }>;
}) {
  const { portal } = await params;
  const pages = await getPortalPages();
  const pageSummary = pages.find((page) => slugify(page.title) === portal);

  if (!pageSummary) notFound();

  const page = await getPortalPage(pageSummary.title);
  if (!page) notFound();

  return (
    <section className="w-full">
      <HeroSlider slides={page.hero?.hero} />
      <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-2 lg:p-10">
        {page.galleries.map((entry) => {
          const title = entry.gallery?.title;
          const image = entry.galleryImage;

          if (!title || !image) return null;

          return (
            <Link
              key={entry.gallery?._id}
              href={`/${portal}/${slugify(title)}`}
              className="group relative aspect-[5/3] overflow-hidden"
            >
              <ImageWrapper photo={image} altText={title} cover />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-3xl font-medium text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                {title.toUpperCase()}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}