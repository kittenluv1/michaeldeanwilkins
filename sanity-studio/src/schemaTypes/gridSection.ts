import {defineType, defineField} from 'sanity'
import {RiLayoutMasonryLine} from 'react-icons/ri'

export const gridSection = defineType({
  name: 'gridSection',
  title: 'Galleries',
  type: 'document',
  icon: RiLayoutMasonryLine,
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
      options: {
        list: [
          {title: 'Photos', value: 'photo'},
          {title: '3D Objects', value: 'object'},
        ],
        layout: 'radio',
      },
      initialValue: 'photo',
      validation: (rule) => rule.required(),
      // lock once content exists so the type can't be flipped under it
      // readOnly: ({document}) =>
      //   Boolean((document?.photos as any[])?.length || (document?.objects as any[])?.length),
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
  ],
})
