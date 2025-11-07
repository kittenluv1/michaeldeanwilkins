import {defineField, defineType} from 'sanity'
import { MdFormatColorText } from 'react-icons/md';

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: MdFormatColorText,
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title,
        media: MdFormatColorText,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
    }),
    defineField({
        name: 'text',
        title: 'Text',
        type: 'text',
    })
  ],
});