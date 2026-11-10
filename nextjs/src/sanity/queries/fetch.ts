import { cache } from "react";
import { draftMode } from "next/headers";
import { client } from "../client";
import { sanityFetch } from "../live";
import type {
  AboutSection,
  Gallery,
  PortalPage,
  SectionTitles,
  HomePage,
  ObjectType,
} from "./types";
import {
  GALLERY_QUERY,
  SECTION_TITLES_QUERY,
  HOMEPAGE_QUERY,
  PORTAL_PAGE_QUERY,
  OBJECT_QUERY,
} from "./queries";

export const getSectionTitles = cache(async (): Promise<SectionTitles | null> => {
  return await client.fetch<SectionTitles | null>(
    SECTION_TITLES_QUERY,
    {},
    { cache: "no-store" },
  );
});

export const getPortalPages = cache(async (): Promise<PortalPage[] | null> => {
  return await client.fetch<PortalPage[] | null>(
    PORTAL_PAGE_QUERY,
    {},
    { cache: "no-store" },
  );
});

export const getPortalPage = cache(
  async (title: string): Promise<PortalPage | null> => {
    const pages = await getPortalPages();
    return pages?.find((page) => page.title === title) ?? null;
  },
);

export const getPrivateSectionTitles = cache(
  async (): Promise<{ title: string }[]> => {
    return await client.fetch<{ title: string }[] | null>(
      `*[_type == "privatePage"][0].galleries[]->{ title }`,
      {},
      { cache: "no-store" },
    );
  },
);

export const getAboutSection = cache(async (): Promise<AboutSection | null> => {
  return await client.fetch<AboutSection | null>(
    `*[_type == "about"	][0]{contact, image, content}`,
    {},
    { cache: "no-store" },
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

export const getHomepage = cache(async (): Promise<HomePage | null> => {
  if (!(await draftMode()).isEnabled) {
    return await client.fetch<HomePage | null>(
      HOMEPAGE_QUERY,
      {},
      { cache: "no-store" },
    );
  }

  const { data: page } = await sanityFetch({
    query: HOMEPAGE_QUERY,
    stega: true,
  });

  return page as HomePage | null;
});

export const getObjects = cache(async (): Promise<ObjectType[] | null> => {
  return await client.fetch<ObjectType[] | null>(OBJECT_QUERY);
});
