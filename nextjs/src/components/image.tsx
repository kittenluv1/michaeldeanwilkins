 'use client'

import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import { useEffect, useRef } from 'react';
import { useImageLoad } from './ImageLoadProvider';

export default function ImageWrapper( {photoAsset, altText} : {photoAsset: any, altText: string} ) {
    const imageUrl = urlFor(photoAsset).width(800).url();
    const width = photoAsset?.metadata?.dimensions?.width || 800;
    const height = photoAsset?.metadata?.dimensions?.height || 1000;
    const blurDataURL = photoAsset?.metadata?.lqip || undefined;
    const imgRef = useRef<HTMLImageElement | null>(null);
    const { register, markLoaded } = useImageLoad();

    useEffect(() => {
      // register this image for the splash tracking (client-side only)
      register();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Image
        src={imageUrl}
        alt={altText}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="transition-opacity duration-500 opacity-0"
        ref={imgRef}
        onLoadingComplete={() => {
          // remove opacity class so image fades in
          try {
            if (imgRef.current) imgRef.current.classList.remove('opacity-0');
          } catch (e) {}
          markLoaded();
        }}
      />
    )
}