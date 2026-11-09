"use client";

import ObjectViewer from "@/components/objectViewer";
import type { ObjectType } from "@/sanity/queries/types";
import ImageWrapper from "./image";
import Modal from "./modal";

export default function ObjectModal({ object }: { object?: ObjectType }) {
  if (!object) return null;

  const relatedPhotos = object.relatedPhotos ?? [];

  return (
    <Modal
      queryParam="object"
      title={`${object.title} 3D viewer`}
      openKey={object._id}
      className="p-0"
    >
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:px-10">
        <ObjectViewer object={object} />
        {relatedPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        )}
      </section>
    </Modal>
  );
}
