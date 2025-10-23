
import { urlFor, getHomePage } from "@/sanity/client";

export default async function Home() {
  const data = await getHomePage();
  const image = data?.heroImage;

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-full top-0 absolute">
        <img 
         className="m-6"
          src="/logo_white.svg"
          alt="Logo"
        />
      </div>
      <div className="w-full h-100">
        <img
          src={urlFor(image).width(8015).url()}
          alt="hero image"
          className="w-full h-full object-cover"
        />
      </div>
      {/* about section */}
      <div className="w-full flex flex-col items-center m-10 p-20">
        <h1 className="text-4xl m-10">About</h1>
        <hr className="w-full"/>
        <div className="flex p-5 gap-9">
          <div className="flex flex-col items-center justify-center my-20 ml-20 w-80 flex-none">
            <img
              src="/CHANDNI_B&W2_0000_Curves 2 copy.jpg"
              alt="About Image"
              className="object-cover"
            />
          </div>
          <p className="text-2xl flex-auto m-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </main>
  );
}
