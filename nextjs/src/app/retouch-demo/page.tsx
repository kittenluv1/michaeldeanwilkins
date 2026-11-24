import BeforeAfterViewer from "@/components/retouchViewer";

export default function BeforeAfterDemo() {
  return (
    <main className="flex min-h-[calc(100vh-12rem)] w-full items-center justify-center py-12">
      <BeforeAfterViewer
        beforeSrc="/assets/imgs/before.jpg"
        afterSrc="/assets/imgs/after.jpg"
        label="Beauty Retouch"
      />
    </main>
  );
}
