import { defineQuery } from "next-sanity";

export const SECTIONS_QUERY = defineQuery(`*[_type == "homepage"][0]{
  sections[]->{
    _id,
	title
  }
}`);

export const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0]{
  sections[]->{
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
