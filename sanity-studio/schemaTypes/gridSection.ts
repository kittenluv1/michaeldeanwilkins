import { defineType, defineField } from 'sanity'
import { RiLayoutGrid2Fill } from "react-icons/ri";

export const gridSection = defineType({
  name: 'gridSection',
  title: 'Grid Section',
  type: 'document',
  icon: RiLayoutGrid2Fill,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // optional for cropping
          },
        },
      ],
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'slug', 
      description: 'Optional slug or external URL for this section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
  },
})