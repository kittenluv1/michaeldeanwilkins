import {defineField, defineType} from 'sanity'
import {LuLayoutPanelTop} from 'react-icons/lu'

export const portalPage = defineType({
  name: 'portalPage',
  title: 'Portal Pages',
  type: 'document',
  icon: LuLayoutPanelTop,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'title of the portal page; appears as a clickable link in the nav bar (i.e. Skills & Services)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Slider',
      description: 'Choose a hero slider to display at the top of the portal page.',
      type: 'reference',
      to: {type: 'heroSlider'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galleries',
      title: 'Galleries',
      description:
        'These galleries will be displayed under the dropdown menu and as clickable links on the portal page.',
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
})
