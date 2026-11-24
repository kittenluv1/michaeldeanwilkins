"use client";

import { useEffect, useRef, useState } from "react";
import ImageWrapper from "./image";

type RetouchViewerProps = {
  beforePhoto: any;
  afterPhoto: any;
  label: string;
};

export default function RetouchViewer({
  beforePhoto,
  afterPhoto,
  label,
}: RetouchViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setPosition(50);
  }, []);

  const setPositionFromPointer = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const nextPosition = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, nextPosition)));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setPositionFromPointer(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPositionFromPointer(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <figure className="mx-auto w-full">
      <div
        ref={containerRef}
        role="slider"
        aria-label="Before and after image comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        className={`relative w-full overflow-hidden select-none bg-[#e8e6e2] ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setPosition((current) => Math.max(0, current - 2));
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setPosition((current) => Math.min(100, current + 2));
          }
          if (event.key === "Home") {
            event.preventDefault();
            setPosition(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            setPosition(100);
          }
        }}
      >
        <div className="block h-auto w-full">
          <ImageWrapper
            photo={afterPhoto}
            altText="After retouch"
            className="block h-auto w-full"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition: isDragging
              ? "none"
              : "clip-path 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <ImageWrapper
            photo={beforePhoto}
            altText="Before retouch"
            cover
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
            transition: isDragging
              ? "none"
              : "left 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="h-full w-[3px] bg-white shadow-[0_0_2px_rgba(0,0,0,0.25)]" />
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-white/95 shadow-[0_2px_12px_rgba(0,0,0,0.25)]" />
        </div>
      </div>
      <figcaption className="pt-4 text-center text-lg">{label}</figcaption>
    </figure>
  );
}
