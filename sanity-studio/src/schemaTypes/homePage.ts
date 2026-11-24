import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  description: 'The home page of the website that users will see when they first visit the site.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the landing page; appears as a clickable link in the navigation bar.',
      validation: (rule) =>
        rule.required().custom(async (title, context) => {
          if (!title) return true

          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document?._id ?? '').replace(/^drafts\./, '')

          const conflicts = await client.fetch(
            `count(*[
              _type == "portalPage" &&
              lower(title) == lower($title) &&
              !(_id in [$id, "drafts." + $id])
            ])`,
            {title, id},
          )

          return conflicts === 0
            ? true
            : 'A portal page already uses this title. Please choose a different title.'
        }),
    }),
    defineField({
      name: 'homepageSections',
      title: 'Homepage Sections',
      description:
        'The homepage consists of one or more homepage sections. Homepage sections include a hero slider and a square grid photo gallery.',
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
