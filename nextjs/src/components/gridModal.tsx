"use client";

import { stegaClean } from "next-sanity";
import type { Photo, RetouchType } from "@/sanity/queries/types";
import ErrorMessage from "./ErrorMessage";
import ImageWrapper from "./image";
import RetouchViewer from "./retouchViewer";
import Modal from "./modal";

type GridModalProps =
  | {
      galleryType: "photo";
      itemId: string;
      items: Photo[];
    }
  | {
      galleryType: "retouch";
      itemId: string;
      items: RetouchType[];
    };

export default function GridModal(props: GridModalProps) {
  const item = props.items.find(
    (entry) => stegaClean(entry?._id) === stegaClean(props.itemId),
  );
  const objects = !item
    ? []
    : props.galleryType === "photo"
      ? [(item as Photo).mainImage, ...((item as Photo).relatedPhotos ?? [])]
      : ((item as RetouchType).relatedPhotos ?? []).map((comparison) => ({
          beforePhoto: comparison.beforePhoto,
          afterPhoto: comparison.afterPhoto,
          label: comparison.label,
        }));

  const largeGridColumns =
    objects.length === 1
      ? "lg:grid-cols-1"
      : objects.length === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-3";

  const medGridColumns =
    objects.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2";

  return (
    <Modal
      title={
        (props.galleryType === "retouch" ? "Retouch" : "Photo") + " gallery"
      }
      openKey={props.itemId}
    >
      <div className="flex w-full flex-col">
        {!item ? (
          <ErrorMessage>
            {props.galleryType === "retouch" ? "Retouch" : "Photo"} not found.
          </ErrorMessage>
        ) : (
          <div
            className={`mx-auto grid w-full grid-cols-1 gap-6 px-4 sm:gap-8 sm:px-6 md:px-8 lg:gap-12 lg:px-12 justify-items-center place-items-center  ${medGridColumns} ${largeGridColumns}`}
          >
            {objects.map((object, index) => (
              <div
                key={index}
                className={"w-full sm:max-w-5/6 md:max-w-lg"}
                onClick={(event) => event.stopPropagation()}
              >
                {props.galleryType === "photo" ? (
                  <ImageWrapper
                    photo={"asset" in object ? object.asset : object}
                    altText={(item as Photo).altText}
                  />
                ) : (
                  <RetouchViewer
                    beforePhoto={
                      "beforePhoto" in object ? object.beforePhoto : null
                    }
                    afterPhoto={
                      "afterPhoto" in object ? object.afterPhoto : null
                    }
                    label={
                      "label" in object
                        ? object.label || (item as RetouchType).title
                        : (item as RetouchType).title
                    }
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
