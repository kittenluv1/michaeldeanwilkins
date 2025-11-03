import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { defineQuery } from "next-sanity";
import { draftMode } from "next/headers";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-12-01",
  useCdn: true,
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
});

// Image URL builder
const builder = imageUrlBuilder(client)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Homepage fetch function
export async function getHomePage() {
  const query = defineQuery(`*[_type == "homepage"][0]{images}`);
  const { isEnabled } = await draftMode();

  return client.fetch(
    query, 
    undefined,
    isEnabled ? {
      perspective: "drafts",
      useCdn: false,
      stega: true,
    } : undefined
  );
}