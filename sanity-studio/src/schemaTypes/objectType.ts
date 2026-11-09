import {defineField, defineType} from 'sanity'
import {FaCube} from 'react-icons/fa6'

export const objectType = defineType({
  name: 'objectType',
  title: '3D Objects',
  type: 'document',
  icon: FaCube,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the object. This will be displayed on the object display modal.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'objectFile',
      title: 'Object File',
      type: 'file',
      description:
        'Upload the 3D object as a .glb or .gltf file. This is the main file that will be displayed in the object viewer.',
      options: {
        accept: '.glb,.gltf',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Important for SEO and accessibility. Describe the 3D object.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        'A brief description of the 3D object. This will be displayed on the object display modal.',
    }),
    defineField({
      name: 'relatedPhotos',
      title: 'Related Photos',
      type: 'array',
      description: 'Related photos to be shown in the display modal along with the 3D object.',
      of: [
        {
          type: 'image',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'relatedPhotos.0', // Use the first related photo as the preview image
    },
    prepare({title, media}) {
      return {
        title,
        media: media,
      }
    },
  },
})
