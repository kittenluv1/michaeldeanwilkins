import { HEADSHOTS_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";
import GridSection from "@/components/gridSection";
import ImagePopup from "@/components/imagePopup";
import { connection } from "next/server";

export default async function Headshots({
  searchParams,
}: {
  searchParams: Promise<{ photo?: string }>;
}) {
  await connection();
  const { data: headshotsPage } = await sanityFetch({
    query: HEADSHOTS_QUERY,
    stega: true,
  });
  const { photo } = await searchParams;

  return (
    <>
      {!headshotsPage ? (
        // fallback for when no headshots page is found
        <div className="w-full h-screen flex justify-center items-center text-2xl">
          No headshots available.
        </div>
      ) : (
        <section className="relative w-full min-h-screen">
          {photo && (
            <ImagePopup photoId={photo} photos={headshotsPage.photos} />
          )}

          <div
            className={
              photo
                ? "absolute inset-0 w-full overflow-hidden z-0 pointer-events-none"
                : "relative"
            }
          >
            <GridSection photos={headshotsPage?.photos ?? []} />
          </div>
        </section>
      )}
    </>
  );
}
