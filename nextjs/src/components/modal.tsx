"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

export default function Modal({
  queryParam,
  title,
  children,
  className = "",
}: {
  queryParam: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const closeModal = () => dialogRef.current?.close();

  const handleClose = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete(queryParam);
    const query = params.toString();
    router.push(`${window.location.pathname}${query ? `?${query}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className={`fixed left-0 top-[var(--site-header-height,0px)] z-[9999] m-0 h-[calc(100dvh-var(--site-header-height,0px))] max-h-none w-full max-w-none overflow-x-hidden overflow-y-auto overscroll-contain bg-white/97 px-4 pb-6 pt-2 sm:px-6 sm:pb-10 lg:px-15 lg:pb-15 backdrop:bg-transparent ${className}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
      onClose={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label={`Close ${title}`}
        className="sticky top-0 z-[10000] ml-auto block cursor-pointer"
        onClick={closeModal}
      >
        <img src="/X.svg" alt="" className="h-4 w-4 md:h-6 md:w-6" />
      </button>
      {children}
    </dialog>
  );
}
