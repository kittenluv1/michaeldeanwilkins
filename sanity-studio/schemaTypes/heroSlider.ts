import {defineField, defineType} from 'sanity'
import {MdOutlineViewCarousel} from 'react-icons/md'

export const heroSlider = defineType({
  name: 'heroSlider',
  title: 'Hero Sliders',
  type: 'document',
  icon: MdOutlineViewCarousel,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Slider',
      description:
        'Add either images or videos to the hero slider. These can be added to hero sections on landing pages.',
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
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(3) // max 3 slides per block
          .custom<Array<{_type: string}>>((slides) => {
            if (!slides || slides.length === 0) return true

            const hasImage = slides.some((s) => s._type === 'image')
            const hasVideo = slides.some((s) => s._type === 'file')

            if (hasImage && hasVideo) {
              return 'A block can contain only photos or only videos — not both.'
            }

            return true
          }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Hero Slider',
      }
    },
  },
})
