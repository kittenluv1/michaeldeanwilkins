"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ObjectViewer from "@/app/object-demo/objectViewer";
import type { ObjectType } from "@/sanity/queries/types";

export default function ObjectModal({ object }: { object?: ObjectType }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (object && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [object]);

  if (!object) return null;

  const closeModal = () => dialogRef.current?.close();
  const handleClose = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("object");
    const query = params.toString();
    router.push(`${window.location.pathname}${query ? `?${query}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed left-0 top-[var(--site-header-height,0px)] z-[9999] m-0 h-[calc(100dvh-var(--site-header-height,0px))] max-h-none w-full max-w-none overflow-y-auto bg-white/97 p-0 backdrop:bg-transparent"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
      onClose={handleClose}
      aria-label={`${object.title} 3D viewer`}
    >
      <button
        type="button"
        aria-label="Close 3D object viewer"
        className="sticky right-4 top-4 z-10 ml-auto mr-4 block cursor-pointer"
        onClick={closeModal}
      >
        <span aria-hidden="true" className="text-3xl leading-none">
          &times;
        </span>
      </button>
      <ObjectViewer object={object} />
    </dialog>
  );
}
