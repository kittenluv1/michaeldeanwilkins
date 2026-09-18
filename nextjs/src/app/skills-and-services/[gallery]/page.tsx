import { notFound } from "next/navigation";
import GalleryPage from "@/components/galleryPage";

export default async function SkillsAndServicesGallery({
  params,
  searchParams,
}: {
  params: Promise<{ gallery: string }>;
  searchParams: Promise<{ photo?: string }>;
}) {
  const { gallery } = await params;
  const allowedGalleries = [
    "retouching",
    "color-grading",
    "3d-modeling",
    "custom-prop-making",
    "cgi",
    "movement-direction",
  ];

  if (!allowedGalleries.includes(gallery)) notFound();

  return <GalleryPage gallery={gallery} searchParams={searchParams} />;
}