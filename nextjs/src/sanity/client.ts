import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: "l269b46l",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Image URL builder
const builder = imageUrlBuilder(client)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// 🏠 Homepage fetch function
export async function getHomePage() {
  const query = `
    *[_type == "homepage"][0]{
      ...,
      sections[]->{
        _id,
        title,
        text,
        image{ asset-> }
      }
    }{heroImage, sections}
  `;
  return client.fetch(query);
}