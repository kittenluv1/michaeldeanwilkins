import { sanityFetch } from "@/sanity/live";
import { HOMEPAGE_QUERY } from "@/sanity/queries";
import AboutSection from "@/components/aboutSection";

export default async function ContactPage() {
  const { data: homepage } = await sanityFetch({
    query: HOMEPAGE_QUERY,
    stega: true,
  });
  const about = homepage?.sections?.find((section: any) => section._type === "about");

  if (!about) return null;

  return (
    <section className="relative min-h-screen w-full">
      <AboutSection contact={about.contact} image={about.image} content={about.content} />
    </section>
  );
}