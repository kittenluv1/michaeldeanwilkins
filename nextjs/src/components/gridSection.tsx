'use client';

import { useRouter } from "next/navigation";
import ImageWrapper from "./image";
import ErrorMessage from "./ErrorMessage";

export default function GridSection({ photos }) {
    const router = useRouter();

    if (!photos?.length) {
        return <ErrorMessage>No photos available.</ErrorMessage>;
    }

    return (
        <div className="w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 px-8">
            {photos.map((photo: any) => {
                if (!photo || !photo._id) return null;
                return (
                    <div 
                        key={photo?._id} 
                        className="cursor-pointer" 
                        onClick={() => {
                            const params = new URLSearchParams(window.location.search);
                            params.set('photo', photo?._id); // only updates photo param
                            router.push(`${window.location.pathname}?${params.toString()}`);
                            }}>
                        <div className="w-full mb-8 break-inside-avoid hover:opacity-75 transition-opacity duration-200">
                            <ImageWrapper photoAsset={photo?.mainImage?.asset} altText={photo?.altText} />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}