import {defineType, defineField} from 'sanity'
import {RiLayoutMasonryLine} from 'react-icons/ri'

export const gridSection = defineType({
  name: 'gridSection',
  title: 'Galleries',
  type: 'document',
  icon: RiLayoutMasonryLine,
  description:
    'Galleries display a grid of photos, 3D objects, or retouch work. Add galleries to the homepage or portal pages to display them in the navigation bar.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'title of the section; appears as a clickable link in the nav bar',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galleryType',
      type: 'string',
      description:
        'Type of gallery to display. Once any content is added, the type cannot be changed.',
      options: {
        list: [
          {title: 'Photos', value: 'photo'},
          {title: '3D Objects', value: 'object'},
          {title: 'Retouch', value: 'retouch'},
        ],
        layout: 'radio',
      },
      initialValue: 'photo',
      validation: (rule) => rule.required(),
      // lock once content exists so the type can't be flipped under it
      readOnly: ({document}) =>
        Boolean(
          (document?.photos as any[])?.length ||
          (document?.objects as any[])?.length ||
          (document?.retouches as any[])?.length,
        ),
    }),
    defineField({
      name: 'photos',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'photo'}]}],
      hidden: ({document}) => document?.galleryType !== 'photo',
    }),
    defineField({
      name: 'objects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'objectType'}]}],
      hidden: ({document}) => document?.galleryType !== 'object',
    }),
    defineField({
      name: 'retouches',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'retouchType'}]}],
      hidden: ({document}) => document?.galleryType !== 'retouch',
    }),
  ],
})
