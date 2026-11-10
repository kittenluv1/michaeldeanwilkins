import HeroSlider from "@/components/heroSlider";
import GridSection from "@/components/galleryGrid";
import { getSectionTitles, getHomepage } from "@/sanity/queries/fetch";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ photo?: string }>;
}) {
  const { photo } = await searchParams;
  const page = await getHomepage();

  if (!page) return notFound();

  if (!page.homepageSections || page.homepageSections.length === 0) {
    return <ErrorMessage>No homepage sections found.</ErrorMessage>;
  }

  // get homepage gallery titles to display galleries at the bottom of the page
  const sections = await getSectionTitles();
  if (!sections?.homePage) {
    return <ErrorMessage>Homepage navigation is unavailable.</ErrorMessage>;
  }
  const { homePage } = sections;

  // test change
  return (
    <section className="w-full">
      {page.homepageSections.map((section) => (
        <div key={section.heroSlider._id}>
          <HeroSlider slides={section.heroSlider.hero} />
          <div className="p-10">
            <GridSection
              items={section.photos}
              galleryType="photo"
              display="square"
              photoId={
                photo && section.photos.some((item) => item?._id === photo)
                  ? photo
                  : undefined
              }
            />
          </div>
        </div>
      ))}
      <div className="flex flex-col text-2xl items-center justify-center gap-4 text-center m-10">
        <p className="pb-6">EXPLORE GALLERIES:</p>
        <div className="flex flex-wrap items-center justify-center gap-20">
          {homePage.galleries.map((section) => (
            <Link
              key={section.title}
              href={`/${slugify(page.title)}/${slugify(section.title)}`}
              className="mb-4 text-lg hover:underline"
            >
              [ {section.title.toUpperCase()} ]
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
