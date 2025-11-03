import { urlFor } from "@/sanity/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";

const homepageQuery = defineQuery(`*[_type == "homepage"][0]{sections[]->}`);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { data: homepage } = await sanityFetch({ query: homepageQuery, stega: true });

  const sections = homepage.sections?.filter(
    (s: any) => s?.slug?.current
  )

  // Get the active section slug from the query parameters
  const { section: activeSlug } = await searchParams;
  if (!activeSlug && sections.length > 0 && sections[0].slug?.current) {
    redirect(`/?section=${sections[0].slug.current}`);
  }
  const activeSection =
    sections.find((s: any) => s.slug?.current === activeSlug) || sections[0];
  
  // If there are no sections, render a friendly empty state
  if (!sections.length) {
    return (
      <main className="w-full flex flex-col items-center justify-center p-16">
        <p className="text-xl">No sections yet. Add a “Grid Section” in Sanity Studio.</p>
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <img
          className="h-7 m-20 mb-15"
          src="/logo.svg"
          alt="Michael Dean Wilkins logo"
        />
        <nav>
          {sections.map((s: any) => (
              <Link
                key={s._id}
                href={`/?section=${s.slug.current}`}
                className={`mx-4 underline ${s._id === activeSection._id ? 'font-bold' : ''}`}
              >
                {s.title}
              </Link>
            ))}
        </nav>
      </div>
      <section>
        <div className="w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 p-8">
          {activeSection.images?.map((image: any) => (
            <img
              key={image._key}
              src={urlFor(image).url()}
              className="w-full mb-8 break-inside-avoid"
              alt=""
            />
          ))}
        </div>
      </section>
    </main>
  );
}
