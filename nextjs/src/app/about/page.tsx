import { getAboutSection } from "@/sanity/queries/fetch";
import ErrorMessage from "@/components/ErrorMessage";
import { PortableText } from "@portabletext/react";
import ImageWrapper from "@/components/image";

export default async function AboutPage() {
  const about = await getAboutSection();
  if (!about) {
    return <ErrorMessage>About page content is unavailable.</ErrorMessage>;
  }

  const PortableTextWrapper = ({ value }) => (
    <PortableText
      value={value}
      components={{
        block: {
          h1: ({ children }) => (
            <h1 className="text-4xl font-medium mb-4 text-center">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-medium mb-4 text-center">
              {children}
            </h2>
          ),
          normal: ({ children }) => <p className="text-center">{children}</p>,
        },
        marks: {
          link: ({ children, value }) => {
            return (
              <a
                href={value.href}
                target="_blank"
                rel="noreferrer"
                className="underline hover:opacity-70"
              >
                {children}
              </a>
            );
          },
        },
      }}
    />
  );

  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center justify-center mb-10">
        <PortableTextWrapper value={about?.contact} />
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-10 px-10 sm:px-20 md:px-30 lg:px-40">
        <div className="min-w-1/2">
          <PortableTextWrapper value={about?.content} />
        </div>

        {about.image && (
          <ImageWrapper
            photo={about.image.asset}
            altText="Picture of the photographer"
            className="min-w-1/2 h-auto object-contain"
          />
        )}
      </div>
    </div>
  );
}
