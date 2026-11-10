import { defineQuery } from "next-sanity";

export const GALLERY_QUERY =
  defineQuery(`*[_type == "gridSection" && title == $title][0]{
  _id,
  title,
  galleryType,
  "items": select(
    galleryType == "photo" => photos[]->{
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
    galleryType == "object" => objects[]->{
      _id,
      title,
      altText,
      description,
      objectFile{
        asset->{
          _id,
          url,
          originalFilename,
          mimeType,
          size
        }
      },
      relatedPhotos[]{
        ...,
        asset->{
          _id,
          url,
          metadata{lqip, dimensions}
        }
      }
    }
  )
}
`);
export const SECTION_TITLES_QUERY = defineQuery(`
  {
    "homePage": *[_type == "homepage"][0]{
      "title": coalesce(title, "Home"),
      "galleries": coalesce(galleries[]->{ title }, [])
    },
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

export const SECTION_TITLES_STATIC_QUERY = defineQuery(`
  {
    "homePage": *[_type == "homepage"][0]{
      "title": coalesce(title, "Home"),
      "galleries": coalesce(galleries[defined(@->)]->{ title }, [])
    },
    "portals": *[_type == "portalPage"]{
      title,
      "galleries": galleries[defined(gallery) && defined(gallery->)]{"title": gallery->title}
    }
  }`);

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0]{
    _type,
    "title": coalesce(title, "Home"),
    "galleries": coalesce(galleries[]->{ title }, []),
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

export const OBJECT_QUERY = defineQuery(`*[_type == "objectType"] {
  _id,
  title,
  altText,
  description,
  objectFile{
    asset->{
      _id,
      url,
      originalFilename,
      mimeType,
      size
    }
  },
  relatedPhotos[]{
    ...,
    asset->{
      _id,
      url,
      metadata{lqip, dimensions}
    }
  }
}`);
