"use client";

import { useRouter } from "next/navigation";
import ImageWrapper from "./image";
import ErrorMessage from "./ErrorMessage";
import GridModal from "./gridModal";
import ObjectModal from "./objectModal";
import type { ObjectType, Photo, RetouchType } from "@/sanity/queries/types";

export default function galleryGrid({
  items,
  galleryType,
  display = "masonry",
  itemId,
}: {
  items: Photo[] | ObjectType[] | RetouchType[];
  galleryType: "photo" | "object" | "retouch";
  display?: "masonry" | "square";
  itemId?: string;
}) {
  const router = useRouter();

  const layoutClasses =
    display === "square"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : "columns-1 sm:columns-2 md:columns-3 lg:columns-4 px-10";

  if (!items?.length) {
    return;
  }

  return (
    <>
      {galleryType === "photo" && itemId && (
        <GridModal
          galleryType="photo"
          itemId={itemId}
          items={items as Photo[]}
        />
      )}
      {galleryType === "retouch" && itemId && (
        <GridModal
          galleryType="retouch"
          itemId={itemId}
          items={items as RetouchType[]}
        />
      )}
      {galleryType === "object" && itemId && (
        <ObjectModal
          object={(items as ObjectType[]).find((item) => item._id === itemId)}
        />
      )}
      <div className={`w-full gap-8 ${layoutClasses}`}>
        {items.map((item) => {
          if (!item?._id) return null;
          const isObject = galleryType === "object";
          const isRetouch = galleryType === "retouch";
          const mainImage = isObject
            ? (item as ObjectType).mainImage
            : isRetouch
              ? (item as RetouchType).mainImage
              : (item as Photo).mainImage;
          return (
            <button
              type="button"
              key={item._id}
              className={`group cursor-pointer text-left ${
                isObject ? "w-full" : ""
              }`}
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.delete("item");
                params.set("item", item._id);
                router.push(
                  `${window.location.pathname}?${params.toString()}`,
                  {
                    scroll: false,
                  },
                );
              }}
            >
              <div
                className={`w-full transition-opacity duration-200 group-hover:opacity-75 ${
                  display === "square"
                    ? "aspect-[2/3]"
                    : "mb-8 break-inside-avoid"
                }`}
              >
                {mainImage?.asset?.url ? (
                  <ImageWrapper
                    photo={mainImage}
                    altText={item.altText}
                    cover={display === "square"}
                  />
                ) : (
                  <div className="flex aspect-[2/3] w-full items-center justify-center bg-[#f5f3ef] p-4 text-center text-lg">
                    Image not found
                  </div>
                )}
              </div>
              {display === "square" && (
                <div className="m-2 text-center text-lg group-hover:underline">
                  {item.title}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
