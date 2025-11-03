import type {StructureResolver} from 'sanity/structure';
import { FaHome } from "react-icons/fa";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .icon(FaHome)
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("27b8827a-7dba-4c47-b9d3-86af75c01064") // fixed ID for singleton
        ),
      // add other lists/items like Posts, Events, etc.

      S.divider(),

      // catch-all for remaining document types
      ...S.documentTypeListItems().filter((listItem) => {
            const id = listItem.getId();
            return id !== undefined && !["homepage"].includes(id);
        }),
]);