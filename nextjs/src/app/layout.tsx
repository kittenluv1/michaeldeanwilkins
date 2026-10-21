import "./globals.css";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive } from "@/sanity/live";
import { EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ImageLoadProvider } from "@/components/ImageLoadProvider";
import Splash from "@/components/Splash";
import Nav from "@/components/nav";
import { Suspense } from "react";
import { getSectionTitles } from "@/sanity/queries/fetch";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata = {
  title: "Michael Dean Wilkins",
  description:
    "Michael Dean Wilkins fashion editorial photography and full service production studio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get sections data to pass to nav
  const sections = await getSectionTitles();
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${ebGaramond.className} min-h-screen flex w-full flex-col items-center`}
      >
        <ImageLoadProvider>
          <Splash />
          <Suspense>
            <Nav sections={sections} />
          </Suspense>
          <main className="relative flex-1 w-full">{children}</main>
        </ImageLoadProvider>
        <footer className="w-full flex justify-between items-end py-10 px-8">
          <span className="font-semibold">
            Michael Dean Wilkins &copy; {currentYear}
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/michaeldean__/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/instagram-icon.svg"
                alt="Instagram"
                className="h-8 w-8"
              />
            </a>
            <a href="#top" className="h-8">
              <img src="/circle-arrow.svg" alt="Back to top" className="h-8" />
            </a>
          </div>
        </footer>
        {/* vercel and sanity tools */}
        <Analytics />
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
