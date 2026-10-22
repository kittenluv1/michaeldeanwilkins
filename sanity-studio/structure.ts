import type {StructureResolver} from 'sanity/structure'
import {FaHome, FaTools, FaJenkins, FaLock} from 'react-icons/fa'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Selected Works').icon(FaHome).child(
        S.document().schemaType('homepage').documentId('27b8827a-7dba-4c47-b9d3-86af75c01064'), // fixed ID for singleton
      ),
      S.listItem()
        .title('Skills & Services')
        .icon(FaTools)
        .child(
          S.document()
            .schemaType('skillsAndServices')
            .documentId('0c3568da-fca3-4c4b-8a60-39ec6eb0ff85'),
        ),
      S.listItem()
        .title('About')
        .icon(FaJenkins)
        .child(S.document().schemaType('about').documentId('68c59428-be74-4649-b9b6-096bbc09d3de')),
      S.listItem()
        .title('Private Pages')
        .icon(FaLock)
        .child(
          S.document().schemaType('privatePage').documentId('12345678-90ab-cdef-1234-567890abcdef'),
        ),

      S.divider(),

      // catch-all for remaining document types
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return (
          id !== undefined &&
          !['homepage'].includes(id) &&
          !['skillsAndServices'].includes(id) &&
          !['about'].includes(id) &&
          !['privatePage'].includes(id)
        )
      }),
    ])
