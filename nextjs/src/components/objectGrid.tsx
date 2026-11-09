"use client";

import { useRouter } from "next/navigation";
import ImageWrapper from "./image";
import ObjectModal from "./objectModal";
import type { ObjectType } from "@/sanity/queries/types";

export default function ObjectGrid({
  objects,
  objectId,
}: {
  objects: ObjectType[];
  objectId?: string;
}) {
  const router = useRouter();

  if (!objects.length) return null;

  return (
    <>
      {objectId && (
        <ObjectModal object={objects.find((item) => item._id === objectId)} />
      )}
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {objects.map((object) => {
          const thumbnail = object.relatedPhotos?.[0];
          if (!thumbnail) return null;

          return (
            <button
              type="button"
              key={object._id}
              className="group cursor-pointer text-left"
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("object", object._id);
                router.push(`${window.location.pathname}?${params.toString()}`, {
                  scroll: false,
                });
              }}
            >
              <div className="aspect-square overflow-hidden transition-opacity duration-200 group-hover:opacity-75">
                <ImageWrapper
                  photo={thumbnail}
                  altText={object.altText}
                  cover
                />
              </div>
              <div className="m-2 text-center text-lg group-hover:underline">
                {object.title}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
