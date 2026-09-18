"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { slugify } from "@/lib/utils";
import type { Section } from "@/sanity/queries";

export default function Nav({ sections }: { sections: Section[] }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigation = [
    {
      label: "Selected Works",
      href: "/selected-works",
      items: sections.map((section) => ({
        label: section.title,
        slug: slugify(section.title),
      })),
    },
  ];

  return (
    <nav className="sticky top-0 z-10 flex w-full flex-wrap justify-center gap-x-7 gap-y-2 bg-white/95 px-6 py-4 font-light backdrop-blur-md">
      {navigation.map((item) => {
        const isSectionActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <div
            key={item.href}
            className="group relative"
            onMouseEnter={() => setOpenMenu(item.href)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="flex items-center gap-1">
              <Link
                href={item.href}
                className={`text-base hover:underline ${isSectionActive ? "font-bold" : ""}`}
              >
                {item.label}
              </Link>
              <button
                type="button"
                aria-expanded={openMenu === item.href}
                aria-label={`Toggle ${item.label} menu`}
                className="p-1 text-sm md:hidden"
                onClick={() => setOpenMenu(openMenu === item.href ? null : item.href)}
              >
                &#x2304;
              </button>
            </div>
            {/* DROPDOWN MENU */}
            <div
              className={`absolute left-0 top-full z-20 min-w-36 bg-white px-2 py-2 shadow-sm ${
                openMenu === item.href ? "block" : "hidden"
              } group-hover:block`}
            >
              {item.items.map((subsection) => {
                const href = `${item.href}/${subsection.slug}`;
                const isActive = pathname === href;

                return (
                  <Link
                    key={subsection.slug}
                    href={href}
                    className={`block whitespace-nowrap px-2 py-1 text-sm hover:underline ${
                      isActive ? "font-bold" : ""
                    }`}
                    onClick={() => setOpenMenu(null)}
                  >
                    {subsection.label}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
      <Link
        href="/contact"
        className={`text-base hover:underline ${pathname === "/contact" ? "font-bold" : ""}`}
      >
        Contact & Info
      </Link>
    </nav>
  );
}
