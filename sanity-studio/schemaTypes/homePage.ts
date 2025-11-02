import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  description: 'Edit the homepage content',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'sections',
        title: 'Sections',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'section' } }],
    })
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
})