"use client";

import ObjectViewer from "@/components/objectViewer";
import type { ObjectType } from "@/sanity/queries/types";
import ImageWrapper from "./image";
import Modal from "./modal";
import { stegaClean } from "next-sanity";

export default function ObjectModal({ object }: { object?: ObjectType }) {
  if (!object) return null;

  const relatedPhotos = object.relatedPhotos ?? [];

  return (
    <Modal
      title={`${stegaClean(object.title)} 3D viewer`}
      openKey={stegaClean(object._id)}
      className="p-0"
    >
      <ObjectViewer object={object} />
      {relatedPhotos.length > 0 && (
        <div className="flex justify-center px-4 pb-6 sm:px-6 sm:pb-10 md:px-10 lg:px-12">
          <div className="grid w-full max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6 md:gap-8">
            {relatedPhotos.map((photo, index) => (
              <div key={index} className="aspect-[2/3] overflow-hidden">
                <ImageWrapper
                  photo={photo}
                  altText={`${object.title} related photo`}
                  cover
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
