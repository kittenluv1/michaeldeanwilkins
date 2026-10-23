import {defineField, defineType} from 'sanity'
import {MdFormatColorText} from 'react-icons/md'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: MdFormatColorText,
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title,
        media: MdFormatColorText,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the about section; appears as a clickable link in the nav bar',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Normal', value: 'normal'},
          ],
          marks: {
            decorators: [],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Normal', value: 'normal'},
          ],
          marks: {
            decorators: [],
          },
          lists: [],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
})
