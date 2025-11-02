import {defineField, defineType} from 'sanity'

export const section = defineType({
  name: 'section',
  title: 'Sections',
  type: 'document',
  description: 'A content section',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'text',
        title: 'Text',
        type: 'text',
    })
  ],
});