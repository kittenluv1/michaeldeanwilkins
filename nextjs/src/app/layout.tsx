import "./globals.css";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive } from "@/sanity/live";

export const metadata = {
  title: "Michael Dean Wilkins",
  description: "Michael Dean Wilkins fashion editorial photography",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
