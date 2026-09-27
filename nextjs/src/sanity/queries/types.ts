export type AboutSection = {
  contact: unknown[];
  image?: { asset?: { _ref?: string; _type?: string } };
  content: unknown[];
};

export type Gallery = {
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

export type SkillsAndServicesPage = {
  hero?: {
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
        dimensions?: { width: number; height: number };
      };
    };
  };
  galleries: {
    gallery?: { _id: string; title: string };
    galleryImage?: {
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
