"use client";

import { useRouter } from "next/navigation";
import ImageWrapper from "./image";
import ErrorMessage from "./ErrorMessage";
import ImageModal from "./imageModal";

export default function GridSection({
  photos,
  display = "masonry",
  photoId,
}: {
  photos: any;
  display?: "masonry" | "square";
  photoId?: string;
}) {
  const router = useRouter();

  if (!photos?.length) {
    return <ErrorMessage>No photos available.</ErrorMessage>;
  }

  return (
    <>
      {/* Display the image modal if a photo ID is provided from the search params */}
      {photoId && <ImageModal photoId={photoId} photos={photos} />}
      <div
        className={`w-full gap-8 ${display === "square" ? "grid md:grid-cols-4 grid-cols-2" : "columns-1 sm:columns-2 md:columns-3 lg:columns-4"}`}
      >
        {photos.map((photo: any) => {
          if (!photo || !photo._id) return null;
          return (
            <div
              key={photo?._id}
              className="group/photo cursor-pointer"
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("photo", photo?._id); // only updates photo param
                router.push(
                  `${window.location.pathname}?${params.toString()}`,
                  {
                    scroll: false,
                  },
                );
              }}
            >
              <div
                className={`w-full hover:opacity-75 transition-opacity duration-200 ${display === "square" ? "aspect-[2/3] border-2 border-red-700" : "mb-8 break-inside-avoid"}`}
              >
                <ImageWrapper
                  photo={photo?.mainImage?.asset}
                  altText={photo?.altText}
                  {...(display === "square" && {
                    cover: true,
                  })}
                />
              </div>
              {display === "square" && (
                <div className="m-2 text-center text-lg transition-opacity duration-200 group-hover/photo:opacity-75">
                  {photo?.title}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
