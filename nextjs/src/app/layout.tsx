import "./globals.css";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { sanityFetch, SanityLive } from "@/sanity/live";
import { EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import { ImageLoadProvider } from "@/components/ImageLoadProvider";
import Splash from "@/components/Splash";
import Nav from "@/components/nav";
import { SECTIONS_QUERY } from "@/sanity/queries";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata = {
  title: "Michael Dean Wilkins",
  description: "Michael Dean Wilkins fashion editorial photography",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get sections data to pass to nav
  const sections = await sanityFetch({
    query: SECTIONS_QUERY,
    stega: true,
  }).then((res) => res.data?.sections ?? []);

  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={ebGaramond.className}>
        <ImageLoadProvider>
          <Splash />
          <main className="w-full flex flex-col items-center">
            <Link className="max-w-3/4 mt-10 p-4" href={`/`} id="#top">
              <img
                className="w-full h-6 pointer-events-none"
                src="/logo.svg"
                alt="Michael Dean Wilkins logo"
              />
            </Link>
            <Nav sections={sections} />
            {children}
          </main>
        </ImageLoadProvider>
        <footer className="w-full flex justify-between items-end pb-10 px-8">
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
