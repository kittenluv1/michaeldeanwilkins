import { defineQuery } from "next-sanity";

export const GALLERY_QUERY = defineQuery(`
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
}`);

export const SKILLS_AND_SERVICES_QUERY = defineQuery(`
  *[_type == "skillsAndServices"][0]{
    hero{
      asset->{
        _id,
        url,
        metadata{lqip,dimensions}
      }
    },
    galleries[]{
      gallery->{_id, title},
      galleryImage{
        asset->{
          _id,
          url,
          metadata{lqip,dimensions}
        }
      }
    }
  }
`);

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
