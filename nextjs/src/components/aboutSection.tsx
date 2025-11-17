import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";

export default function AboutSection({ image, content, contact }) {
    return (
        <div className="grid align-top items-start grid-cols-2 gap-20 m-20 mt-10">
            <div>
                <PortableText 
                    value={content} 
                    components={{
                        block: {
                            h1: ({children}) => 
                                <h1 className="text-4xl font-bold">
                                    {children}
                                </h1>,
                            h2: ({children}) => 
                                <h2 className="text-3xl font-semibold mb-4">
                                    {children},
                                </h2>,
                            normal: ({children}) => <p className="mb-4">{children}</p>,
                        },
                        marks: {
                            link: ({ children, value }) => (
                                <a href={value.href} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                {children}
                                </a>
                            ),
                        },
                    }}
                />
            </div>
            {image && (
                <img
                src={urlFor(image).url()}
                className="w-full"
                />
            )}
            <div>
                <PortableText 
                    value={contact} 
                    components={{
                        block: {
                            h1: ({children}) => 
                                <h1 className="text-4xl font-bold">
                                    {children}
                                </h1>,
                            h2: ({children}) => 
                                <h2 className="text-3xl font-semibold mb-4">
                                    {children},
                                </h2>,
                            normal: ({children}) => <p className="mb-4">{children}</p>,
                        },
                        marks: {
                            link: ({ children, value }) => (
                                <a href={value.href} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                {children}
                                </a>
                            ),
                        },
                    }}
                />
            </div>
        </div>
    )
}