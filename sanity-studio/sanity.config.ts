import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {structure} from './structure';
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { defineDocuments, presentationTool } from "sanity/presentation";

export default defineConfig({
  name: 'default',
  title: 'michaeldeanwilkins',

  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_API_DATASET!,

  plugins: [
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "homepage"`,
          },
        ]),
      },
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    structureTool({structure}), 
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },
})
