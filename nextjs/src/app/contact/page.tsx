import { getAboutSection } from "@/sanity/queries";
import AboutSection from "@/components/aboutSection";
import { notFound } from "next/navigation";

export default async function ContactPage() {
  const about = await getAboutSection();

  if (!about) notFound(); 

  return (
    <section className="relative min-h-screen w-full">
      <AboutSection contact={about.contact} image={about.image} content={about.content} />
    </section>
  );
}