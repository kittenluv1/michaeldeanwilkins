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
      name: 'slug',
      title: 'Slug',
      type: 'slug', 
      description: 'appears in the URL when this section is selected',
      options: { 
        source: 'title', 
        maxLength: 50,
        slugify: (input: string) => input
          .toLowerCase()
          .replace(/\s+/g, '-')     // Replace spaces with -
          .replace(/[&]/g, '-and-')   // Replace & with 'and'
          .replace(/[^\w\-]+/g, '') // Remove all non-word chars except hyphens
          .replace(/\-\-+/g, '-')   // Replace multiple - with single -
          .replace(/^-+/, '')       // Trim - from start
          .replace(/-+$/, '')       // Trim - from end
      },
      validation: (rule) => rule.required().custom((slug: any) => {
        if (!slug?.current) return true;
        // Only allow lowercase letters, numbers, and hyphens
        if (!/^[a-z0-9-]+$/.test(slug.current)) {
          return 'slug can only contain lowercase letters, numbers, and hyphens';
        }
        return true;
      }),
      hidden: ({ document }) => !document?.title, // Hide until title exists
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, 
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
  },
})