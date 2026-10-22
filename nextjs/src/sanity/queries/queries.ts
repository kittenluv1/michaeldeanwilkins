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

export const SECTION_TITLES_QUERY = defineQuery(`
  {
    "selectedWorks": coalesce(*[_type == "homepage"][0].galleries[]->{ title }, []),
    "portals": *[_type == "portalPage"]{
      title,
      "galleries": galleries[]{
        "title": gallery->title
      },
    },
    "about": *[_type == "about"][0]{
      title
    }
  }`);

export const SELECTED_WORKS_QUERY = defineQuery(`
  *[_type == "homepage"][0]{
    homepageSections[]{
      heroSlider->{
        _id,
        title,
        hero[]{
          _type,
          _type == "image" => {
            asset->{
              _id,
              url,
              metadata{lqip, dimensions}
            }
          },
          _type == "file" => {
            asset->{
              _id,
              url,
            }
          }
        }
      },
      photos[]->{
        _id,
        title,
        mainImage{
          ...,
          asset->{
            _id,
            url,
            metadata{lqip, dimensions}
          }
        },
        altText,
        relatedPhotos[]{
          asset->{
            _id,
            url,
            metadata{lqip, dimensions}
          }
        }
      }
    }
  }
`);

export const PORTAL_PAGE_QUERY = defineQuery(`
  *[_type == "portalPage"]{
    _id,
    title,
    hero->{
      _id,
      title,
      hero[]{
        _type,
        _type == "image" => {
          asset->{
            _id,
            url,
            metadata{lqip, dimensions}
          }
        },
        _type == "file" => {
          asset->{
            _id,
            url,
          }
        }
      }
    },
    galleries[]{
      gallery->{_id, title},
      galleryImage{
        ...,
        asset->{
          _id,
          url,
          metadata{lqip,dimensions}
        }
      }
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
