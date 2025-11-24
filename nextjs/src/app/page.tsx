import Link from "next/link";
import { redirect } from "next/navigation";
import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import GridSection from "@/components/gridSection";
import ImagePopup from "@/components/imagePopup";
import AboutSection from "@/components/aboutSection";
import { ImageLoadProvider } from '@/components/ImageLoadProvider';
import Splash from '@/components/Splash';

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
      mainImage{
        asset->{
          _id,
          url,
          metadata{lqip,dimensions}
        }
      },
      altText,
      relatedPhotos[]{
        asset->{
          _id,
          url,
          metadata{lqip,dimensions}
        }
      }
    },
    content,
    image{
      asset->{
        _id,
        url,
        metadata{lqip,dimensions}
      }
    },
    contact,
  }
}`);

export const dynamic = "force-dynamic"; // SSR for production

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
    <>
      <ImageLoadProvider>
        <Splash />
        <main className="w-full flex flex-col items-center">
        <img
          className="h-7 max-w-2/3 mt-15 mb-4"
          src="/logo.svg"
          alt="Michael Dean Wilkins logo"
          id="#top"
        />
        <nav className="bg-white/95 w-full p-6 flex flex-wrap gap-4 justify-center sticky top-0 z-10 backdrop-blur-md font-light overflow-wrap">
          {sections.map((s: any) => (
              <Link
                key={s._id}
                href={`/?section=${slugify(s.title)}`}
                className={`text-lg hover:underline ${slugify(s.title) === section && 'font-bold'}`}
              >
                {s.title}
              </Link>
            ))}
        </nav>
        <section className="relative w-full min-h-screen">
          {photo && <ImagePopup photoId={photo} photos={activeSection.photos} />}

          {
            /* grid section stays mounted and only hides conditionally to prevent full reloads of all images */
            activeSection?._type === "gridSection" && (
              <div
                className={
                  photo
                    ? "absolute inset-0 w-full overflow-hidden z-0 pointer-events-none"
                    : "relative"
                }
              >
                <GridSection photos={activeSection.photos} />
              </div>
            )
          }

          {activeSection?._type === "about" && (
            <AboutSection contact={activeSection.contact} image={activeSection.image} content={activeSection.content} />
          )}
        </section>
        </main>
      </ImageLoadProvider>
      <footer className="w-full flex justify-between items-end pb-10 px-8">
            <span className="font-semibold">Michael Dean Wilkins &copy; 2025</span>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/michaeldean__/" target="_blank" rel="noopener noreferrer">
                <img src="/instagram-icon.svg" alt="Instagram" className="h-8 w-8"/>
              </a>
              <a href="#top" className="h-8">
                <img src="/circle-arrow.svg" alt="Back to top" className="h-8"/>
              </a>
            </div>
      </footer>
    </>
  );
}
