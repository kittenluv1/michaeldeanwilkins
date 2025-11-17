import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";

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
          normal: ({ children }) => <p className="mb-2">{children}</p>,
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

      <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <PortableTextWrapper value={content} />
        </div>

        {image && (
          <img src={urlFor(image).url()} className="w-full" />
        )}
      </div>
    </div>
  );
}