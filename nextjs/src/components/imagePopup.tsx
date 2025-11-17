'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { urlFor } from "@/sanity/image";

export default function ImagePopup({ photoId, photos }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const removeParam = (key: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    router.push(`${window.location.pathname}?${params.toString()}`);
  }

  const photo = photos.find(p => p._id === photoId);
  if (!photo) {
    return null;
  }

    return (
      <div className="flex flex-col space-y-15 items-center p-15 min-h-screen">
        <button 
          className="absolute top-0 right-0 m-8 mr-15 cursor-pointer"
          onClick={() => removeParam('photo')}
        >
          <object data="/close.svg" type="image/svg+xml" className="w-3 pointer-events-none"/>
        </button>
          <img 
            className="max-w-lg max-h-lg" 
            src={urlFor(photo.mainImage).url()} 
            alt={photo.altText}              
          />
          {photo.relatedPhotos?.map((relatedPhoto, index) => (
            <img key={index} className="max-w-lg max-h-lg" src={urlFor(relatedPhoto).url()} />
          ))}
      </div>
    )
}