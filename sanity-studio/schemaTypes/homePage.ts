import {defineField, defineType} from 'sanity'
import { FaHome } from "react-icons/fa";

export const homePage = defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  icon: FaHome,
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Order sections by dragging; used for site navigation and preview',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'gridSection' }],
        },
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
})