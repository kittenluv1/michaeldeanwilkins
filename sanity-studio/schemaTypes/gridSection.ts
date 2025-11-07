import { defineType, defineField } from 'sanity'
import { RiLayoutGrid2Fill } from "react-icons/ri";

export const gridSection = defineType({
  name: 'gridSection',
  title: 'Galleries',
  type: 'document',
  icon: RiLayoutGrid2Fill,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'title of the section; appears as a clickable link in the nav bar', 
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'photo' }],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
})