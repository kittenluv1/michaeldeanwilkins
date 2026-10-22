"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { useEffect, useRef, useState } from "react";
import { useImageLoad } from "./ImageLoadProvider";

export default function ImageWrapper({
  photo,
  altText,
  cover = false,
}: {
  photo: any; // This can be either a Sanity image object or an asset object
  altText: string;
  cover?: boolean;
}) {
  if (!photo) return null;
  const asset = photo?.asset ?? photo;
  const width = asset?.metadata?.dimensions?.width || 2000;
  const height = asset?.metadata?.dimensions?.height || 2500;
  const blurDataURL = asset?.metadata?.lqip || undefined;
  const imageUrl = urlFor(photo).width(2000).quality(85).url();
  // The ref must be on the image so the splash loader can register it as it approaches the viewport
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
      className={`${cover ? "h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-80" : ""} transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      ref={imageRef}
      onLoad={() => {
        // flip state so image fades in
        setVisible(true);
        markLoaded();
      }}
    />
  );
}
