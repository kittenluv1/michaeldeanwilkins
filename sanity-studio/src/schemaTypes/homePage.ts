import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the landing page; appears as a clickable link in the navigation bar.',
      validation: (rule) => rule.required(),
    }),
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
              validation: (rule) => rule.required(),
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
      description:
        'These galleries will be displayed under the dropdown menu for the home page in the navigation bar.',
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
        title: 'Home Page',
      }
    },
  },
})
