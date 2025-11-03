import { client } from "@/sanity/image";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});