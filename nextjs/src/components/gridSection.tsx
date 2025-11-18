'use client';

import { urlFor } from "@/sanity/image";
import { useRouter } from "next/navigation";

export default function GridSection({ photos }) {
    const router = useRouter();

    return (
        <div className="w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 p-8 pt-0">
            {photos.map((photo: any) => (
                <div 
                    key={photo._id} 
                    className="cursor-pointer" 
                    onClick={() => {
                          const params = new URLSearchParams(window.location.search);
                          params.set('photo', photo._id); // only updates photo param
                          router.push(`${window.location.pathname}?${params.toString()}`);
                        }}>
                    <img
                        src={urlFor(photo.mainImage).url()}
                        className="w-full mb-8 break-inside-avoid hover:opacity-75 transition-opacity duration-100"
                        alt={photo.altText}
                    />
                </div>
            ))}
        </div>
    )
}