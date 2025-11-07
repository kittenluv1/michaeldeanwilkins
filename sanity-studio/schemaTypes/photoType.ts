import { defineField, defineType} from 'sanity'
import { IoMdPhotos } from "react-icons/io";

export const photoType = defineType({
    name: 'photo',
    title: 'Photos',
    type: 'document',
    icon: IoMdPhotos,
    fields: [
    defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'For your reference, to make it easier to find photos and add them to your galleries',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'mainImage',
        title: 'Image',
        type: 'image',
        description: 'This is the main image that will show up in the gallery you add it to',
        options: {
            hotspot: true
        },
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'altText',
        title: 'Alt Text',
        type: 'string',
        description: 'Important for SEO and accessibility. Describe what is in the image.',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'relatedPhotos',
        title: 'Related Photos',
        type: 'array',
        description: 'Related photos will be shown when the main image is clicked in the gallery view.',
        of: [
            {
                type: 'image',
                options: {
                    hotspot: true
                }       
            },
        ],
    }),
    ],
        preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
        prepare({ title, media }) {
            return {
                title,
                media: media,
            };
        },
    },
})