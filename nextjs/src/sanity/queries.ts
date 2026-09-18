import { defineQuery } from "next-sanity";
import { cache } from "react";
import { client } from "./client";
import { sanityFetch } from "./live";

type AboutSection = {
	contact: unknown[];
	image?: { asset?: { _ref?: string; _type?: string } };
	content: unknown[];
};

type Gallery = {
	_id: string;
	_type: string;
	title: string;
	photos: {
		_id: string;
		title: string;
		mainImage: {
			asset: {
				_id: string;
				url: string;
				metadata: {
					lqip: string;
					dimensions: {
						width: number;
						height: number;
					};
				};
			};
		}[];
		altText: string;
		relatedPhotos: {
			asset: {
				_id: string;
				url: string;
				metadata: {
					lqip: string;
					dimensions: {
						width: number;
						height: number;
					};
				};
			};
		}[];
	}[];
};

export const getSections = cache(async (): Promise<{
	selectedWorks: { title: string }[];
	skillsAndServices: { title: string }[];
}> => {
	return await client.fetch<{
		selectedWorks: { title: string }[];
		skillsAndServices: { title: string }[];
	}>(
		`{
			"selectedWorks": *[_type == "homepage"][0].subsections[]->{ title },
			"skillsAndServices": *[_type == "skillsAndServices"][0].subsections[]->{ title }
		}`
	);
});

export const getAboutSection = cache(async (): Promise<AboutSection | null> => {
	  return await client.fetch<AboutSection | null>(
		`*[_type == "about"][0]{contact, image, content}`,
	  );
});

export const getGallery = cache(async (galleryTitle: string): Promise<Gallery | null> => {
	const { data: gallery } = await sanityFetch({
		query: GALLERY_QUERY,
		params: { title: galleryTitle },
		stega: true,
	});
	return gallery as Gallery | null;
});


const GALLERY_QUERY = defineQuery(`
	*[_type == "gridSection" && title == $title][0]{
  _id,
  _type,
  title,
  photos[]->{
    _id,
    title,
    mainImage{
      asset->{
        _id,
        url,
        metadata{lqip,dimensions}
      }
    },
    altText,
    relatedPhotos[]{
      asset->{
        _id,
        url,
        metadata{lqip,dimensions}
      }
    }
  }
}`
);

export const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0]{
	subsections[]->{
	_id,
	_type,
	title,
	photos[]->{
	  _id,
	  title,
	  mainImage{
		asset->{
		  _id,
		  url,
		  metadata{lqip,dimensions}
		}
	  },
	  altText,
	  relatedPhotos[]{
		asset->{
		  _id,
		  url,
		  metadata{lqip,dimensions}
		}
	  }
	},
	content,
	image{
	  asset->{
		_id,
		url,
		metadata{lqip,dimensions}
	  }
	},
	contact,
  }
}`);

export const HEADSHOTS_QUERY = defineQuery(`*[_type == "headshotsPage"][0]
{
    photos[]->{
      _id,
      title,
      mainImage{
        asset->{
          _id,
          url,
          metadata{lqip,dimensions}
        }
      },
      altText,
      relatedPhotos[]{
        asset->{
          _id,
          url,
          metadata{lqip,dimensions}
        }
      }
    }
}`);
