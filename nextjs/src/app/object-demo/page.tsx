import { getObjects } from "@/sanity/queries/fetch";
import ObjectViewer from "../../components/objectViewer";

export default async function ObjectDemo() {
  const objects = await getObjects();
  const object = objects[0];

  if (!object) {
    return (
      <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center px-6 py-12 md:px-10">
        <p>No 3D object is available.</p>
      </section>
    );
  }

  return <ObjectViewer object={object} />;
}
