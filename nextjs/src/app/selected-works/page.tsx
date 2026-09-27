import HeroSlider from "@/components/heroSlider";
import { getSelectedWorksPage } from "@/sanity/queries/fetch";
import notFound from "../not-found";

export default async function SelectedWorksIndex() {
  const page = await getSelectedWorksPage();

  if (!page) notFound();

  return (
    <section className="w-full">
      <HeroSlider slides={page.hero} />
    </section>
  );
}
