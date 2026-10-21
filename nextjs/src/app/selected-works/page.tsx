import HeroSlider from "@/components/heroSlider";
import GridSection from "@/components/galleryGrid";
import { getSelectedWorksPage } from "@/sanity/queries/fetch";
import notFound from "../not-found";

export default async function SelectedWorksIndex() {
  const page = await getSelectedWorksPage();

  if (!page) notFound();

  return (
    <section className="w-full">
      {page.homepageSections.map((section) => (
        <div key={section.heroSlider._id}>
          <HeroSlider slides={section.heroSlider.hero} />
          <GridSection photos={section.photos} />
        </div>
      ))}
    </section>
  );
}
