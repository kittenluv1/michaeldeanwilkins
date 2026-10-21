import HeroSlider from "@/components/heroSlider";
import GridSection from "@/components/galleryGrid";
import { getSelectedWorksPage } from "@/sanity/queries/fetch";
import notFound from "../not-found";

export default async function SelectedWorksIndex({
  searchParams,
}: {
  searchParams: Promise<{ photo?: string }>;
}) {
  const { photo } = await searchParams;
  const page = await getSelectedWorksPage();

  if (!page) notFound();

  return (
    <section className="w-full">
      {page.homepageSections.map((section) => (
        <div key={section.heroSlider._id}>
          <HeroSlider slides={section.heroSlider.hero} />
          <GridSection
            photos={section.photos}
            photoId={
              photo && section.photos.some((item) => item?._id === photo)
                ? photo
                : undefined
            }
          />
        </div>
      ))}
    </section>
  );
}
