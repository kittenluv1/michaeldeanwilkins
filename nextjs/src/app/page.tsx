import HeroSlider from "@/components/heroSlider";
import GridSection from "@/components/galleryGrid";
import { getSectionTitles, getHomepage } from "@/sanity/queries/fetch";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { stegaClean } from "next-sanity";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const { item } = await searchParams;
  const page = await getHomepage();

  if (!page)
    return <ErrorMessage>Homepage content is unavailable.</ErrorMessage>;

  if (!page.homepageSections || page.homepageSections.length === 0) {
    return <ErrorMessage>No homepage sections found.</ErrorMessage>;
  }

  // get homepage gallery titles to display galleries at the bottom of the page
  const sections = await getSectionTitles();
  if (!sections?.homePage) {
    return <ErrorMessage>Homepage navigation is unavailable.</ErrorMessage>;
  }
  const { homePage } = sections;

  return (
    <section className="w-full">
      {page.homepageSections.flatMap((section, index) => {
        const heroSlides = section?.heroSlider?.hero;
        const photos = section?.photos ?? [];

        if (!section?.heroSlider || !heroSlides?.length) {
          return [
            <div key={section?.heroSlider?._id ?? `homepage-section-${index}`}>
              <ErrorMessage>Homepage hero slider is unavailable.</ErrorMessage>
            </div>,
          ];
        }

        return [
          <div key={section.heroSlider._id}>
            <HeroSlider slides={heroSlides} />
            <div className="p-10">
              <GridSection
                items={photos}
                galleryType="photo"
                display="square"
                itemId={
                  item && photos.some((photo) => photo?._id === item)
                    ? item
                    : undefined
                }
              />
            </div>
          </div>,
        ];
      })}
      <div className="flex flex-col text-2xl items-center justify-center gap-4 text-center m-8 mt-0 lg:m-10">
        <p className="pb-6">EXPLORE GALLERIES:</p>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-20">
          {homePage.galleries.flatMap((section) => {
            const sectionTitle = stegaClean(section?.title);
            const pageTitle = stegaClean(page?.title);
            if (!sectionTitle || !pageTitle) return [];

            return [
              <Link
                key={sectionTitle}
                href={`/${slugify(pageTitle)}/${slugify(sectionTitle)}`}
                className="text-lg underline md:no-underline hover:underline"
              >
                [ {sectionTitle.toUpperCase()} ]
              </Link>,
            ];
          })}
        </div>
      </div>
    </section>
  );
}
