import Link from "next/link";
import { redirect } from "next/navigation";
import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import GridSection from "@/components/gridSection";
import ImagePopup from "@/components/imagePopup";
import AboutSection from "@/components/aboutSection";

function slugify(title: string) {
  return title
  .toLowerCase()
  .replace(/\s+/g, '-')     // Replace spaces with -
  .replace(/[&]/g, '-and-')   // Replace & with 'and'
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars except hyphens
  .replace(/\-\-+/g, '-')   // Replace multiple - with single -
  .replace(/^-+/, '')       // Trim - from start
  .replace(/-+$/, '')       // Trim - from end
}

const homepageQuery = defineQuery(`*[_type == "homepage"][0]{
  sections[]->{
    _id,
    _type,
    title,
    photos[]->{
      _id,
      title,
      mainImage,
      altText,
      relatedPhotos
    },
    image, 
    text
  }
}`);

export default async function Home({ searchParams} : {
  searchParams?: { section?: string, photo?: string }
}) {
  const { section, photo } = await searchParams;
  const { data: homepage } = await sanityFetch({ query: homepageQuery, stega: true });
  const sections = homepage?.sections ?? [];

  // If no section is found, redirect to the first section
  if (!section) {
    redirect(`/?section=${slugify(sections[0].title)}`);
  }

  // Determine the active section based on the slug from the query parameters
  const activeSection =
    (section ? sections.find((s: any) => slugify(s.title) === section) : null) ||
    sections[0];

  return (
    <main className="w-full flex flex-col items-center">
      <img
        className="h-7 mt-15 mb-4"
        src="/logo.svg"
        alt="Michael Dean Wilkins logo"
      />
      <nav className="bg-white/95 w-full p-6 flex justify-center sticky top-0 z-10 backdrop-blur-md">
        {sections.map((s: any) => (
            <Link
              key={s._id}
              href={`/?section=${slugify(s.title)}`}
              className={`mx-4 text-lg hover:underline ${slugify(s.title) === section && 'font-bold'}`}
            >
              {s.title}
            </Link>
          ))}
      </nav>
        <section className="relative">
        {photo && <ImagePopup photoId={photo} photos={activeSection.photos} />}
        {activeSection?._type === "gridSection" ? (
            <GridSection photos={activeSection.photos} />
          ) : activeSection?._type === "about" ? (
            <AboutSection image={activeSection.image} text={activeSection.text} />
          ) : null }
      </section>
    </main>
  );
}
