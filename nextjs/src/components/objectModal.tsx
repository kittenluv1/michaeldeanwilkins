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
        <div className="flex justify-center p-10">
          <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-4">
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
