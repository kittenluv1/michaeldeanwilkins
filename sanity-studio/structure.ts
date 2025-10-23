import type {StructureResolver} from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homePage") // fixed ID for singleton
        ),
      // add other lists/items like Posts, Events, etc.

      S.divider(),

      // catch-all for remaining document types
      ...S.documentTypeListItems().filter((listItem) => {
            const id = listItem.getId();
            return id !== undefined && !["homepage"].includes(id);
        }),
]);