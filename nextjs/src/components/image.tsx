"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { useEffect, useRef, useState } from "react";
import { useImageLoad } from "./ImageLoadProvider";

export default function ImageWrapper({
  photoAsset,
  altText,
  className = "transition-opacity duration-500",
}: {
  photoAsset: any;
  altText: string;
  className?: string;
}) {
  if (!photoAsset) return null;
  const imageUrl = urlFor(photoAsset).width(2000).quality(85).url();
  const width = photoAsset?.metadata?.dimensions?.width || 2000;
  const height = photoAsset?.metadata?.dimensions?.height || 2500;
  const blurDataURL = photoAsset?.metadata?.lqip || undefined;
  // The ref must be on the image so the splash loader can register it as it
  // approaches the viewport
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(false);
  const { register, markLoaded } = useImageLoad();

  useEffect(() => {
    // Only register this image for the splash when it actually enters the viewport.
    // This keeps lazy-loaded images from blocking the initial splash.
    if (!imageRef.current) return;
    const el = imageRef.current;
    let obs: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              register();
              obs?.unobserve(el);
            }
          });
        },
        { rootMargin: "200px" },
      );
      obs.observe(el);
    } else {
      // Fallback: register immediately
      register();
    }

    return () => {
      if (obs && el) obs.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Image
      src={imageUrl}
      alt={altText}
      width={width}
      height={height}
      placeholder={blurDataURL ? "blur" : undefined} // only use blur placeholder if we have a blurDataURL
      blurDataURL={blurDataURL}
      className={`${className} ${visible ? "opacity-100" : "opacity-0"}`}
      ref={imageRef}
      onLoad={() => {
        // flip state so image fades in
        setVisible(true);
        markLoaded();
      }}
    />
  );
}
