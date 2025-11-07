import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Order sections by dragging; used for site navigation and preview',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'gridSection' }, { type: 'about' }],
        },
      ],
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