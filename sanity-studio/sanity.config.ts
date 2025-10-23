import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {structure} from './structure';
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'michaeldeanwilkins',

  projectId: 'l269b46l',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
