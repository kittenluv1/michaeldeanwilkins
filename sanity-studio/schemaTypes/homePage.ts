import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  description: 'Edit the homepage content',
  fields: [
    defineField({
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'image' }],
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