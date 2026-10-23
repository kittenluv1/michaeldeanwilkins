import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {structure} from './structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {defineDocuments, presentationTool} from 'sanity/presentation'
// import { linkField } from "sanity-plugin-link-field";

const slugToTitle = (value: string) => value.replace(/-and-/g, ' & ').replace(/-/g, ' ')

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
            route: '/selected-works',
            filter: `_type == "homepage"`,
          },
          {
            route: '/about',
            filter: `_type == "about"`,
          },
          {
            route: '/:portal',
            filter: ({params}) =>
              `_type == "portalPage" && title match "${slugToTitle(params.portal)}"`,
          },
          {
            route: '/selected-works/:gallery',
            filter: ({params}) =>
              `_type == "gridSection" && title match "${slugToTitle(params.gallery)}"`,
          },
          {
            route: '/private/:gallery',
            filter: ({params}) =>
              `_type == "gridSection" && title match "${slugToTitle(params.gallery)}"`,
          },
          {
            route: '/:portal/:gallery',
            filter: ({params}) =>
              `_type == "gridSection" && title match "${slugToTitle(params.gallery)}"`,
          },
        ]),
      },
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    structureTool({structure}),
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
    // linkField({
    //   linkableSchemaTypes: ['homepage'],
    // }) as any,
  ],

  schema: {
    types: schemaTypes,
  },
})
