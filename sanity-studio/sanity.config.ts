import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {structure} from './structure';
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { presentationTool } from "sanity/presentation";
import { locate } from './presentation/locate';

export default defineConfig({
  name: 'default',
  title: 'michaeldeanwilkins',

  projectId: 'l269b46l',
  dataset: 'production',

  plugins: [
    structureTool({structure}), 
    visionTool(),
    presentationTool({
      locate,
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
