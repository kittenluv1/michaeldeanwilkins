import HeroSlider from "@/components/heroSlider";
import GridSection from "@/components/galleryGrid";
import { getSelectedWorksPage } from "@/sanity/queries/fetch";
import notFound from "../not-found";
import ErrorMessage from "@/components/ErrorMessage";

export default async function SelectedWorksIndex({
  searchParams,
}: {
  searchParams: Promise<{ photo?: string }>;
}) {
  const { photo } = await searchParams;
  const page = await getSelectedWorksPage();

  if (!page) return notFound();

  if (!page.homepageSections || page.homepageSections.length === 0) {
    return <ErrorMessage>No homepage sections found.</ErrorMessage>;
  }

  return (
    <section className="w-full">
      {page.homepageSections.map((section) => (
        <div key={section.heroSlider._id}>
          <HeroSlider slides={section.heroSlider.hero} />
          <div className="p-10">
            <GridSection
              photos={section.photos}
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
    </section>
  );
}
