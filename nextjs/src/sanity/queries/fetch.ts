import { cache } from "react";
import { client } from "../client";
import { sanityFetch } from "../live";
import type {
  AboutSection,
  Gallery,
  SelectedWorksPage,
  PortalPage,
} from "./types";
import {
  GALLERY_QUERY,
  SELECTED_WORKS_QUERY,
  PORTAL_PAGE_QUERY,
} from "./queries";

export const getSectionTitles = cache(
  async (): Promise<{
    selectedWorks: { title: string }[];
    portals: { title: string; galleries: { title: string }[] }[];
  }> => {
    return await client.fetch<{
      selectedWorks: { title: string }[];
      portals: { title: string; galleries: { title: string }[] }[];
    }>(
      `{
			"selectedWorks": coalesce(*[_type == "homepage"][0].galleries[]->{ title }, []),
      "portals": *[_type == "portalPage"]{
        title,
        "galleries": galleries[]{
          "title": gallery->title
        }
      }
		}`,
    );
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
