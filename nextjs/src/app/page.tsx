
import { urlFor, getHomePage } from "@/sanity/client";

export default async function Home() {
  const data = await getHomePage();
  if (!data) {
    return <p>Homepage data not found.</p>;
  }
  const images = data.images;

  return (
    <main className="w-full flex flex-col items-center justify-center">
      {/* title */}
      <div className="w-full flex flex-col items-center justify-center">
        <img 
         className="h-7 m-20 mb-15"
          src="/logo.svg"
          alt="Michael Dean Wilkins logo"
        />
        <nav>
          <ul className="flex space-x-10 text-lg">
            <li><a href="#" className="hover:underline">Selected Work</a></li>
            <li><a href="#" className="hover:underline">Fashion</a></li>
            <li><a href="#" className="hover:underline">Editorial</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
      <div className="w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 p-8">
        {images.map((image) => (
          <img
            key={image._key}
            src={urlFor(image).url()}
            className="w-full mb-8 break-inside-avoid"
            alt=""
          />
        ))}
      </div>
    </main>
  );
}
