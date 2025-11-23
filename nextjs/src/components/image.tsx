import Image from 'next/image';
import { urlFor } from '@/sanity/image';

export default function ImageWrapper( {photoAsset, altText} : {photoAsset: any, altText: string} ) {
    const imageUrl = urlFor(photoAsset).width(800).url();
    const width = photoAsset?.metadata?.dimensions?.width || 800;
    const height = photoAsset?.metadata?.dimensions?.height || 1000;
    const blurDataURL = photoAsset?.metadata?.lqip || undefined;
    // console.log('imageUrl: ', imageUrl, 'blurDataURL: ', blurDataURL);

    return (
      <Image
        src={imageUrl}
        alt={altText}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="transition-opacity duration-500 opacity-0"
        onLoad={(img) => img.currentTarget.classList.remove('opacity-0')}
      />
    )
}