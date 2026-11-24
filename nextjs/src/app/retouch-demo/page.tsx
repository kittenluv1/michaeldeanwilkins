import BeforeAfterViewer from "@/components/retouchViewer";
import { getRetouches } from "@/sanity/queries/fetch";
import ErrorMessage from "@/components/ErrorMessage";

export default async function BeforeAfterDemo() {
  const retouches = await getRetouches();

  if (!retouches?.length) {
    return <ErrorMessage>No retouch photos found.</ErrorMessage>;
  }

  return (
    <main className="flex min-h-[calc(100vh-12rem)] w-full flex-col items-center justify-center gap-12 py-12">
      {retouches.flatMap((retouch) =>
        (retouch.relatedPhotos ?? []).map((comparison, index) => (
          <BeforeAfterViewer
            key={`${retouch._id}-${index}`}
            beforePhoto={comparison.beforePhoto}
            afterPhoto={comparison.afterPhoto}
            label={comparison.label || retouch.title}
          />
        )),
      )}
    </main>
  );
}
