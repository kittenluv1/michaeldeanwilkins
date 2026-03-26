import { redirect } from "next/navigation";
import { sanityFetch } from "@/sanity/live";
import GridSection from "@/components/gridSection";
import ImagePopup from "@/components/imagePopup";
import AboutSection from "@/components/aboutSection";
import { HOMEPAGE_QUERY } from "@/sanity/queries";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic"; // SSR for production

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; photo?: string }>;
}) {
  const { section, photo } = await searchParams;
  const { data: homepage } = await sanityFetch({
    query: HOMEPAGE_QUERY,
    stega: true,
  });
  const sections = homepage?.sections ?? [];

  // If no section is found, redirect to the first section
  if (!section) {
    redirect(`/?section=${slugify(sections[0].title)}`);
  }

  // Determine the active section based on the slug from the query parameters
  const activeSection =
    (section
      ? sections.find((s: any) => slugify(s.title) === section)
      : null) || sections[0];

  return (
    <>
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
          <AboutSection
            contact={activeSection.contact}
            image={activeSection.image}
            content={activeSection.content}
          />
        )}
      </section>
    </>
  );
}
