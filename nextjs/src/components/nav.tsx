"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { slugify } from "@/lib/utils";

export default function Nav({ sections }: { sections?: any[] }) {
  // get active section
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  return (
    <nav className="bg-white/95 w-full p-6 flex flex-wrap gap-4 justify-center sticky top-0 z-10 backdrop-blur-md font-light overflow-wrap">
      {sections.map((s: any) => (
        <Link
          key={s._id}
          href={`/?section=${slugify(s.title)}`}
          //   className={`text-lg hover:underline`}
          className={`text-lg hover:underline ${slugify(s.title) === section && "font-bold"}`}
        >
          {s.title}
        </Link>
      ))}
    </nav>
  );
}
