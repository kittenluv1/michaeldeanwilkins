"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import ImageWrapper from "./image";
import ErrorMessage from "./ErrorMessage";

export default function ImageModal({ photoId, photos }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // use native dialog element to handle modal behavior and accessibility
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();
  }, [photoId]);

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handleClose = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("photo");
    const query = params.toString();
    router.push(`${window.location.pathname}${query ? `?${query}` : ""}`, {
      scroll: false,
    });
  };

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
    <dialog
      ref={dialogRef}
      className="fixed top-[var(--site-header-height,0px)] left-0 z-[9999] m-0 h-[calc(100dvh-var(--site-header-height,0px))] max-h-none w-full max-w-none overflow-x-hidden overflow-y-auto overscroll-contain bg-white/97 px-4 pb-6 pt-2 sm:px-6 sm:pb-10 lg:px-15 lg:pb-15 backdrop:bg-transparent"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
      onClose={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <button
        type="button"
        aria-label="Close image gallery"
        className="sticky top-0 z-[10000] ml-auto block cursor-pointer"
        onClick={closeModal}
      >
        <img src="/X.svg" alt="" className="h-4 w-4 md:h-6 md:w-6" />
      </button>

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
    </dialog>
  );
}
