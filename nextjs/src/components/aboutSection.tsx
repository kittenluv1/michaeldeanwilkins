import { urlFor } from "@/sanity/image";

export default function AboutSection({ image, text }) {
    return (
        <div className="flex items-center space-y-10 p-10 flex-col">
        {image && (
            <img
            src={urlFor(image).url()}
            className="w-1/4"
            />
        )}
        {text && <p>{text}</p>}
        </div>
    )
}