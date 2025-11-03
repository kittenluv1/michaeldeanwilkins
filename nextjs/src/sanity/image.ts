import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Client-safe Sanity client (no server-only APIs like draftMode)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-12-01",
  useCdn: true,
});

// Image URL builder - safe to use in both client and server components
const builder = imageUrlBuilder(client)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
