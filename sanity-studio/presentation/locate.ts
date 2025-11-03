import { DocumentLocationResolver } from 'sanity/presentation'

export const locate: DocumentLocationResolver = (doc, context) => {
  if (doc.type === 'homepage') {
    return {
      locations: [
        {
          title: 'Homepage',
          href: '/',
        },
      ],
    }
  }

  return null
}
