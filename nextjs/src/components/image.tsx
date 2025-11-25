 'use client'

import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import { useEffect, useRef, useState } from 'react';
import { useImageLoad } from './ImageLoadProvider';

export default function ImageWrapper( {photoAsset, altText} : {photoAsset: any, altText: string} ) {
  if (!photoAsset) return null;
    const imageUrl = urlFor(photoAsset).width(2000).quality(85).url();
    const width = photoAsset?.metadata?.dimensions?.width || 2000;
    const height = photoAsset?.metadata?.dimensions?.height || 2500;
    const blurDataURL = photoAsset?.metadata?.lqip || undefined;
    const imgRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    const { register, markLoaded } = useImageLoad();

    useEffect(() => {
      // Only register this image for the splash when it actually enters the viewport.
      // This keeps lazy-loaded images from blocking the initial splash.
      if (!containerRef.current) return;
      const el = containerRef.current;
      let obs: IntersectionObserver | null = null;
      if ('IntersectionObserver' in window) {
        obs = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              register();
              obs?.unobserve(el);
            }
          });
        }, { rootMargin: '200px' });
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
      <div ref={containerRef}>
        <Image
          src={imageUrl}
          alt={altText}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
          ref={imgRef}
          onLoad={() => {
            // flip state so image fades in
            setVisible(true);
            markLoaded();
          }}
        />
      </div>
    )
}