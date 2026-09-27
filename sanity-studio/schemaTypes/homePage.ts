import {defineField, defineType} from 'sanity'

// the _type of this document is still 'homepage' in the studio because it was initially registered that way. the name is now 'selectedWorks' to reflect the purpose of this document type
export const selectedWorks = defineType({
  name: 'selectedWorks',
  title: 'Selected Works',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Slider',
      description: 'Images and videos for the hero slider on the Selected Works landing page',
      type: 'array',
      of: [
        {
          type: 'image',
        },
        {
          type: 'file',
          title: 'Video',
          options: {
            accept: 'video/*',
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'galleries',
      title: 'Galleries',
      description: 'These galleries will be displayed under the "Selected Works" dropdown menu',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'gridSection'}],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Selected Works',
      }
    },
  },
})
