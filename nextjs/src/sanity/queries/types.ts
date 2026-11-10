export type AboutSection = {
  contact: unknown[];
  image?: { asset?: { _ref?: string; _type?: string } };
  content: unknown[];
};

export type SectionTitle = {
  title: string;
};

export type SectionTitles = {
  homePage: {
    title: string;
    galleries: SectionTitle[];
  };
  portals: (SectionTitle & {
    galleries: SectionTitle[];
  })[];
  about: SectionTitle;
};

export type Gallery = PhotoGallery | ObjectGallery;

export type PhotoGallery = {
  _id: string;
  _type: "gridSection";
  title: string;
  galleryType: "photo";
  items: Photo[];
};

export type ObjectGallery = {
  _id: string;
  _type: "gridSection";
  title: string;
  galleryType: "object";
  items: ObjectType[];
};

export type HomePage = {
  _type: "homepage";
  title: string;
  galleries: SectionTitle[];
  homepageSections: HomepageSection[];
};

export type HomepageSection = {
  heroSlider: {
    _id: string;
    title: string;
    hero: HeroSlider[];
  };
  photos: Photo[];
};

export type Photo = {
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
  };
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
};

export type PortalPage = {
  _id: string;
  title: string;
  hero: {
    _id: string;
    title: string;
    hero: HeroSlider[];
  };
  galleries: {
    gallery?: { _id: string; title: string };
    galleryImage?: {
      _type?: string;
      crop?: unknown;
      hotspot?: unknown;
      asset?: {
        _id: string;
        url: string;
        metadata?: {
          lqip?: string;
          dimensions?: { width: number; height: number };
        };
      };
    };
  }[];
};

export type HeroSlider =
  | {
      _type: "image";
      asset: {
        _id: string;
        url: string;
        metadata?: {
          lqip?: string;
          dimensions?: { width: number; height: number };
        };
      };
    }
  | {
      _type: "file";
      asset: {
        _id: string;
        url: string;
      };
    };

export type ObjectType = {
  _id: string;
  _type: "objectType";
  title: string;
  altText: string;
  description?: string;
  objectFile: {
    asset: {
      _id: string;
      url: string;
      originalFilename?: string;
      mimeType?: string;
      size?: number;
    };
  };
  relatedPhotos?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
  }[];
};
