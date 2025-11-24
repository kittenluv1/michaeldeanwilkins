import { PortableText } from "@portabletext/react";
import ImageWrapper from "./image";

export default function AboutSection({ contact, image, content }) {
  const PortableTextWrapper = ({ value }) => (
    <PortableText
      value={value}
      components={{
        block: {
          h1: ({ children }) => (
            <h1 className="text-4xl font-medium mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-medium mb-4">{children}</h2>
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
                className="hover:underline"
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
    <div className="w-full pt-0 p-20">
      <div className="flex flex-col w-full items-center justify-center mb-10">
        <PortableTextWrapper value={contact} />
      </div>

      <div className="grid align-top grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <PortableTextWrapper value={content} />
        </div>

        {image && (
          <ImageWrapper photoAsset={image.asset} altText="Picture of the photographer" />
        )}
      </div>
    </div>
  );
}