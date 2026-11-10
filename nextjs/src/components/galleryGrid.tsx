"use client";

import { createElement, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ImageWrapper from "./image";
import ErrorMessage from "./ErrorMessage";
import ImageModal from "./imageModal";
import ObjectModal from "./objectModal";
import type { ObjectType, Photo } from "@/sanity/queries/types";

const MODEL_VIEWER_SCRIPT =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";

function ObjectThumbnail({ object }: { object: ObjectType }) {
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!document.querySelector(`script[src="${MODEL_VIEWER_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = MODEL_VIEWER_SCRIPT;
      document.head.appendChild(script);
    }
  }, []);

  return createElement("model-viewer", {
    ref: viewerRef,
    src: object.objectFile.asset.url,
    alt: object.altText,
    "auto-rotate": false,
    "camera-controls": false,
    "disable-zoom": true,
    "interaction-prompt": "none",
    "shadow-intensity": "1",
    className: "h-full w-full",
  });
}

export default function GridSection({
  items,
  galleryType,
  display = "masonry",
  photoId,
  objectId,
}: {
  items: Photo[] | ObjectType[];
  galleryType: "photo" | "object";
  display?: "masonry" | "square";
  photoId?: string;
  objectId?: string;
}) {
  const router = useRouter();

  if (!items.length) {
    return <ErrorMessage>No gallery items available.</ErrorMessage>;
  }

  return (
    <>
      {galleryType === "photo" && photoId && (
        <ImageModal photoId={photoId} photos={items as Photo[]} />
      )}
      {galleryType === "object" && objectId && (
        <ObjectModal
          object={(items as ObjectType[]).find((item) => item._id === objectId)}
        />
      )}
      <div
        className={`w-full gap-8 ${
          display === "square" || galleryType === "object"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "columns-1 sm:columns-2 md:columns-3 lg:columns-4"
        }`}
      >
        {items.map((item) => {
          if (!item?._id) return null;
          const isObject = galleryType === "object";
          return (
            <button
              type="button"
              key={item._id}
              className={`group cursor-pointer text-left ${
                isObject ? "w-full" : ""
              }`}
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set(isObject ? "object" : "photo", item._id);
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
                  isObject
                    ? "aspect-square overflow-hidden"
                    : display === "square"
                      ? "aspect-[2/3]"
                      : "mb-8 break-inside-avoid"
                }`}
              >
                {isObject ? (
                  <ObjectThumbnail object={item as ObjectType} />
                ) : (
                  <ImageWrapper
                    photo={(item as Photo).mainImage}
                    altText={(item as Photo).altText}
                    {...(display === "square" && { cover: true })}
                  />
                )}
              </div>
              {(display === "square" || isObject) && (
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
