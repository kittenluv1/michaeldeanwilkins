import {defineField, defineType} from 'sanity'

export const skillsAndServices = defineType({
  name: 'skillsAndServices',
  title: 'Skills & Services',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Slider',
      description:
        'Choose a hero slider to display at the top of the Skills & Services landing page. ',
      type: 'reference',
      to: {type: 'heroSlider'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galleries',
      title: 'Galleries',
      description: 'These galleries will be displayed under the "Skills & Services" dropdown menu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryEntry',
          fields: [
            defineField({
              name: 'gallery',
              title: 'Gallery',
              type: 'reference',
              to: [{type: 'gridSection'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'galleryImage',
              title: 'Thumbnail Image',
              type: 'image',
              options: {
                hotspot: {
                  previews: [{title: 'Thumbnail', aspectRatio: 5 / 3}],
                },
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'gallery.title',
              media: 'customImage',
            },
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Skills & Services',
      }
    },
  },
})
