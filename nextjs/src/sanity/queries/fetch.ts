import { cache } from "react";
import { client } from "../client";
import { sanityFetch } from "../live";
import type {
  AboutSection,
  Gallery,
  SelectedWorksPage,
  PortalPage,
  SectionTitles,
} from "./types";
import {
  GALLERY_QUERY,
  SECTION_TITLES_QUERY,
  SELECTED_WORKS_QUERY,
  PORTAL_PAGE_QUERY,
} from "./queries";

export const getSectionTitles = cache(
  async (): Promise<SectionTitles> => {
    return await client.fetch<SectionTitles>(SECTION_TITLES_QUERY);
  },
);

export const getPortalPages = cache(async (): Promise<PortalPage[]> => {
  return await client.fetch<PortalPage[]>(PORTAL_PAGE_QUERY);
});

export const getPortalPage = cache(
  async (title: string): Promise<PortalPage | null> => {
    const pages = await getPortalPages();
    return pages.find((page) => page.title === title) ?? null;
  },
);

export const getPrivateSectionTitles = cache(
  async (): Promise<{ title: string }[]> => {
    return await client.fetch<{ title: string }[]>(
      `*[_type == "privatePage"][0].galleries[]->{ title }`,
    );
  },
);

export const getAboutSection = cache(async (): Promise<AboutSection | null> => {
  return await client.fetch<AboutSection | null>(
    `*[_type == "about"	][0]{contact, image, content}`,
  );
});

export const getGallery = cache(
  async (galleryTitle: string): Promise<Gallery | null> => {
    const { data: gallery } = await sanityFetch({
      query: GALLERY_QUERY,
      params: { title: galleryTitle },
      stega: true,
    });
    return gallery as Gallery | null;
  },
);

export const getSelectedWorksPage = cache(
  async (): Promise<SelectedWorksPage | null> => {
    const { data: page } = await sanityFetch({
      query: SELECTED_WORKS_QUERY,
      stega: true,
    });

    return page as SelectedWorksPage | null;
  },
);
