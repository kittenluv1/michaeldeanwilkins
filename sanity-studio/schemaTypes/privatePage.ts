import {defineField, defineType} from 'sanity'
import {FaLock} from 'react-icons/fa'

export const privatePage = defineType({
  name: 'privatePage',
  title: 'Private Pages',
  type: 'document',
  icon: FaLock,
  fields: [
    defineField({
      name: 'galleries',
      title: 'Galleries',
      description:
        'These galleries are not displayed in the main navigation bar and are only accessible via a direct link.',
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
        title: 'Private Pages',
      }
    },
  },
})
