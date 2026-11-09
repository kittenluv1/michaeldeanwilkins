"use client";

import ImageWrapper from "./image";
import ErrorMessage from "./ErrorMessage";
import Modal from "./modal";

export default function ImageModal({ photoId, photos }) {
  const photo = photos.find((item) => item?._id === photoId);
  if (!photo) {
    return <ErrorMessage>Photo not found.</ErrorMessage>;
  }

  const imageCount = 1 + (photo.relatedPhotos?.length ?? 0);
  const largeGridColumns =
    imageCount === 1
      ? "lg:grid-cols-1"
      : imageCount === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-3";

  return (
    <Modal queryParam="photo" title="Image gallery">
      <div className="flex w-full flex-col items-center justify-center">
        <div
          className={`grid grid-cols-1 justify-items-center gap-6 auto-rows-auto sm:gap-8 md:grid-cols-2 lg:gap-20 px-6 md:px-8 lg:px-15 ${largeGridColumns}`}
        >
          <div
            className="w-full max-w-full sm:max-w-5/6 lg:max-w-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <ImageWrapper
              photo={photo.mainImage.asset}
              altText={photo.altText}
            />
          </div>
          {photo.relatedPhotos?.map((relatedPhoto, index) => (
            <div
              key={index}
              className="w-full max-w-full sm:max-w-5/6 lg:max-w-lg"
              onClick={(event) => event.stopPropagation()}
            >
              <ImageWrapper
                photo={relatedPhoto?.asset}
                altText={photo.altText}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
