
import { urlFor, getHomePage } from "@/sanity/client";

export default async function Home() {
  const data = await getHomePage();
  if (!data) {
    return <p>Homepage data not found.</p>;
  }
  const heroImage = data.heroImage;
  const sections = data.sections;

  return (
    <main className="w-full flex flex-col items-center justify-center">
      {/* header */}
      <div className="w-full top-0 absolute">
        <img 
         className="m-6"
          src="/logo_white.svg"
          alt="Logo"
        />
      </div>
      <div className="w-full h-100">
        <img
          src={urlFor(heroImage).url()}
          alt="hero image"
          className="w-full h-full object-cover"
        />
      </div>
      {/* sections */}
      {sections?.map((section: any) => (
        <div key={section._id} className="w-full flex flex-col items-center m-10 p-20">
          <h1 className="text-4xl m-10">{section.title}</h1>
          <hr className="w-full" />
          <div className="flex p-5 gap-9">
            <div className="flex flex-col items-center justify-center my-20 ml-20 w-80 flex-none">
              <img
                src={urlFor(section.image).url()}
                className="object-cover"
              />
            </div>
            <p className="text-2xl flex-auto m-20">{section.text}</p>
          </div>
        </div>
      ))}
    </main>
  );
}
