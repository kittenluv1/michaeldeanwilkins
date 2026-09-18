import { defineQuery } from "next-sanity";
import { cache } from "react";
import { client } from "./client";

export type Section = {
  title: string;
};

export const getGridSections = cache(async (page: "homepage" | "headshotsPage"): Promise<Section[]> => {
	const sections = await client.fetch<({ title?: string; } | null)[]>(
		`*[_type == $page][0].subsections[]->{ title }`,
		{ page }
	);
	
	return sections.filter(
		(section): section is Section => Boolean(section?.title)
	);
});

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
