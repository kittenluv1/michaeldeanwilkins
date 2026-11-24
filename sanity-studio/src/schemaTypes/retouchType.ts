import {defineField, defineType} from 'sanity'
import {MdFaceRetouchingNatural} from 'react-icons/md'

export const retouchType = defineType({
  name: 'retouchType',
  title: 'Retouch',
  type: 'document',
  icon: MdFaceRetouchingNatural,
  description: 'Add retouch photos to your galleries to display them on the site.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the retouch photo. This will not be displayed on the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'This is the thumbnail image, which is displayed in galleries',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description:
        'Important for SEO and accessibility. Describe the retouch photo for screen readers.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedPhotos',
      title: 'Retouch Photos',
      type: 'array',
      description:
        'Retouch photos to be shown in the display modal, with a before/after comparison and a text label.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'beforePhoto',
              title: 'Before Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'afterPhoto',
              title: 'After Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description:
                'A label for the before/after comparison. This will be displayed under the comparison in the display modal.',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare({title, media}) {
      return {
        title,
        media: media,
      }
    },
  },
})
