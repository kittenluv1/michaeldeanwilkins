import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

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
        <Image 
          src="/AMBER_0007_AMBER_0006_Group 10.jpg"
          alt="Fashion Editorial"
          className="object-cover w-full h-full"
          width={8015}
          height={5017}
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
      {/* posts */}
      <div>
        <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </main>
  );
}
