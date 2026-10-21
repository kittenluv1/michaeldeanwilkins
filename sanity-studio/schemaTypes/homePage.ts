import {defineField, defineType} from 'sanity'

// the _type of this document is still 'homepage' in the studio because it was initially registered that way. the name is now 'selectedWorks' to reflect the purpose of this document type
export const selectedWorks = defineType({
  name: 'selectedWorks',
  title: 'Selected Works',
  type: 'document',
  fields: [
    defineField({
      name: 'homepageSections',
      title: 'Homepage Sections',
      description:
        'Homepage sections include a hero slider and custom photo galleries. These sections will be displayed on the homepage of the website.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'homepageSectionItem',
          title: 'Homepage Section',
          fields: [
            defineField({
              name: 'heroSlider',
              title: 'Hero Slider',
              type: 'reference',
              to: [{type: 'heroSlider'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'photos',
              title: 'Photos',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'photo'}],
                },
              ],
              validation: (rule) => rule.required().min(8).max(8),
            }),
          ],
          validation: (rule) => rule.required(),
          preview: {
            select: {
              title: 'heroSlider.title',
            },
            prepare({title}) {
              return {
                title: title || 'Homepage Section',
              }
            },
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
