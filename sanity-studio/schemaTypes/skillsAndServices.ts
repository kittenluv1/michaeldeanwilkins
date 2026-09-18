import {defineField, defineType} from 'sanity'

export const skillsAndServices = defineType({
  name: 'skillsAndServices',
  title: 'Skills & Services',
  type: 'document',
  fields: [
    defineField({
      name: 'subsections',
      title: 'Subsections',
      description: 'These subsections will be displayed under the "Skills & Services" dropdown menu',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'gridSection' }],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Skills & Services",
      }
    }
  }
})