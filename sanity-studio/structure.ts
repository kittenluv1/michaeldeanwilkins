import type {StructureResolver} from 'sanity/structure'
import {FaHome, FaJenkins, FaLock} from 'react-icons/fa'
import {LuLayoutPanelTop} from 'react-icons/lu'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Studio')
    .items([
      S.divider().title('Singletons'),
      S.listItem().title('Home').icon(FaHome).child(
        S.document().schemaType('homepage').documentId('27b8827a-7dba-4c47-b9d3-86af75c01064'), // fixed ID for singletons
      ),
      S.listItem()
        .title('About')
        .icon(FaJenkins)
        .child(S.document().schemaType('about').documentId('68c59428-be74-4649-b9b6-096bbc09d3de')),

      S.divider().title('Page Builders'),

      S.listItem()
        .title('Portal Pages')
        .icon(LuLayoutPanelTop)
        .child(S.documentTypeList('portalPage').title('Portal Pages')),
      S.listItem()
        .title('Private Galleries')
        .icon(FaLock)
        .child(
          S.document().schemaType('privatePage').documentId('12345678-90ab-cdef-1234-567890abcdef'),
        ),

      S.divider().title('Page Sections'),

      S.documentTypeListItem('heroSlider').title('Hero Sliders'),
      S.documentTypeListItem('gridSection').title('Galleries'),

      S.divider().title('Items'),

      S.documentTypeListItem('photo').title('Photos'),
      S.documentTypeListItem('objectType').title('3D Objects'),
      S.documentTypeListItem('retouchType').title('Retouch'),

      S.divider(),

      // catch-all for remaining document types
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return (
          id !== undefined &&
          !['homepage'].includes(id) &&
          !['about'].includes(id) &&
          !['privatePage'].includes(id) &&
          !['heroSlider'].includes(id) &&
          !['gridSection'].includes(id) &&
          !['portalPage'].includes(id) &&
          !['photo'].includes(id) &&
          !['objectType'].includes(id) &&
          !['retouchType'].includes(id)
        )
      }),
    ])
