import { cache } from "react";
import { staticClient, client } from "../client";
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
  SECTION_TITLES_STATIC_QUERY,
} from "./queries";
import { draftMode } from "next/headers";

export const getSectionTitles = cache(
  async (): Promise<SectionTitles | null> => {
    const { data } = await sanityFetch({
      query: SECTION_TITLES_QUERY,
    });
    return data as SectionTitles | null;
  },
);

export const getPortalPages = cache(async (): Promise<PortalPage[] | null> => {
  const { data } = await sanityFetch({
    query: PORTAL_PAGE_QUERY,
  });
  return data as PortalPage[] | null;
});

export const getPortalPagesForStaticParams = cache(
  async (): Promise<
    { title: string; galleries: { gallery?: { title: string } }[] }[] | null
  > => {
    return await staticClient.fetch(
      `*[_type == "portalPage"]{title, "galleries": galleries[defined(gallery)]{"gallery": gallery->{title}}}`,
    );
  },
);

export const getSectionTitlesForStaticParams = cache(
  async (): Promise<Pick<SectionTitles, "homePage" | "portals"> | null> => {
    return await staticClient.fetch(SECTION_TITLES_STATIC_QUERY);
  },
);

export const getPortalPage = cache(
  async (title: string): Promise<PortalPage | null> => {
    const pages = await getPortalPages();
    return pages?.find((page) => page.title === title) ?? null;
  },
);

export const getPrivateSectionTitles = cache(
  async (): Promise<{ title: string }[]> => {
    const { data } = await sanityFetch({
      query: `*[_type == "privatePage"][0].galleries[]->{ title }`,
    });
    return (data as { title: string }[] | null) ?? [];
  },
);

export const getPrivateSectionTitlesForStaticParams = cache(
  async (): Promise<{ title: string }[]> => {
    return (
      (await staticClient.fetch<{ title: string }[] | null>(
        `*[_type == "privatePage"][0].galleries[]->{ title }`,
      )) ?? []
    );
  },
);

export const getAboutSection = cache(async (): Promise<AboutSection | null> => {
  const { data } = await sanityFetch({
    query: `*[_type == "about"][0]{contact, image, content}`,
  });
  return data as AboutSection | null;
});

export const getGallery = cache(
  async (galleryTitle: string): Promise<Gallery | null> => {
    const { data } = await sanityFetch({
      query: GALLERY_QUERY,
      params: { title: galleryTitle },
    });
    return data as Gallery | null;
  },
);

export const getHomepage = cache(async (): Promise<HomePage | null> => {
  // if (!(await draftMode()).isEnabled) {
  //   return await client.fetch<HomePage | null>(
  //     HOMEPAGE_QUERY,
  //     {},
  //     { cache: "no-store" },
  //   );
  // }

  const { data: page } = await sanityFetch({
    query: HOMEPAGE_QUERY,
  });
  return page as HomePage | null;
});

export const getObjects = cache(async (): Promise<ObjectType[] | null> => {
  const { data } = await sanityFetch({
    query: OBJECT_QUERY,
  });
  return data as ObjectType[] | null;
});
