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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

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

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-[var(--site-header-height,0px)] left-0 z-[9999] m-0 h-[calc(100dvh-var(--site-header-height,0px))] max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-white/97 px-15 pb-15 backdrop:bg-transparent"
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
        <img src="/X.svg" alt="" className="h-6 w-6" />
      </button>

      <div className="flex min-h-full flex-col items-center space-y-15">
        <div
          className="max-w-5/6 lg:max-w-lg"
          onClick={(event) => event.stopPropagation()}
        >
          <ImageWrapper
            photoAsset={photo.mainImage.asset}
            altText={photo.altText}
          />
        </div>
        {photo.relatedPhotos?.map((relatedPhoto, index) => (
          <div
            key={index}
            className="max-w-5/6 lg:max-w-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <ImageWrapper
              photoAsset={relatedPhoto?.asset}
              altText={photo.altText}
            />
          </div>
        ))}
      </div>
    </dialog>
  );
}
