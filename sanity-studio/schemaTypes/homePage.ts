import {defineField, defineType} from 'sanity'

// enforce that there should only be one homePage
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