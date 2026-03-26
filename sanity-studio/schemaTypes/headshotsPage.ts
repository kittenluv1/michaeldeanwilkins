import {defineField, defineType} from 'sanity'
import {CgProfile} from 'react-icons/cg'

export const headshotsPage = defineType({
  name: 'headshotsPage',
  title: 'Headshots Page',
  type: 'document',
  icon: CgProfile,
  fields: [
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
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Headshots',
      }
    },
  },
})
