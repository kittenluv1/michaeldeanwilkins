import Link from "next/link";
import { notFound } from "next/navigation";
import ImageWrapper from "@/components/image";
import { getSkillsAndServicesPage } from "@/sanity/queries/fetch";
import { slugify } from "@/lib/utils";

export default async function SkillsAndServicesIndex() {
  const page = await getSkillsAndServicesPage();

  if (!page) notFound();

  return (
    <section className="w-full">
      {page.hero?.asset && (
        <div className="aspect-[16/7] w-full overflow-hidden">
          <ImageWrapper
            photoAsset={page.hero.asset}
            altText="Skills and services"
            className="h-full w-full object-cover transition-opacity duration-500"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-2 lg:gap-4 lg:p-10">
        {page.galleries.map((entry) => {
          const title = entry.gallery?.title;
          const image = entry.galleryImage?.asset;

          if (!title || !image) return null;

          return (
            <Link
              key={entry.gallery?._id}
              href={`/skills-and-services/${slugify(title)}`}
              className="group relative aspect-[5/3] overflow-hidden"
            >
              <ImageWrapper
                photoAsset={image}
                altText={title}
                className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-80"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center font-medium text-3xl text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                {title.toUpperCase()}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
