import { cache } from "react";
import { client } from "../client";
import { sanityFetch } from "../live";
import type {
  AboutSection,
  Gallery,
  SkillsAndServicesPage,
  SelectedWorksPage,
} from "./types";
import {
  GALLERY_QUERY,
  SKILLS_AND_SERVICES_QUERY,
  SELECTED_WORKS_QUERY,
} from "./queries";

export const getSectionTitles = cache(
  async (): Promise<{
    selectedWorks: { title: string }[];
    skillsAndServices: { title: string }[];
  }> => {
    return await client.fetch<{
      selectedWorks: { title: string }[];
      skillsAndServices: { title: string }[];
    }>(
      `{
			"selectedWorks": *[_type == "homepage"][0].galleries[]->{ title },
			"skillsAndServices": *[_type == "skillsAndServices"][0].galleries[]{
				"title": gallery->title
			}
		}`,
    );
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

export const getSkillsAndServicesPage = cache(
  async (): Promise<SkillsAndServicesPage | null> => {
    const { data: page } = await sanityFetch({
      query: SKILLS_AND_SERVICES_QUERY,
      stega: true,
    });

    return page as SkillsAndServicesPage | null;
  },
);
