'use client'

import { useRouter } from "next/navigation";
import ImageWrapper from "./image";
import { useState } from "react";

export default function ImagePopup({ photoId, photos }) {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

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
    <div className={`relative z-[9999] flex flex-col space-y-15 items-center p-8 lg:p-15 transition-opacity duration-600 min-h-screen bg-white/97 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <button 
        className="absolute top-0 right-0 mr-8 z-[10000] cursor-pointer"
        onClick={() => {
          // don't set timeout before removing params bcs it lowkey lags
          removeParam('photo');
          setFadeOut(true);
        }}
      >
        <img src="/X.svg" className="h-6 w-6"/>
      </button>
      <div className="max-w-5/6 lg:max-w-lg max-h-lg">
        <ImageWrapper photoAsset={photo.mainImage.asset} altText={photo.altText} />
      </div>
        {photo.relatedPhotos?.map((relatedPhoto, index) => {
          return (
            <div key={index} className="max-w-5/6 lg:max-w-lg max-h-lg" >
              <ImageWrapper photoAsset={relatedPhoto?.asset} altText={photo.altText} />
            </div>
          )
        })}
    </div>
  )
}