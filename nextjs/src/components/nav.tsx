"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { slugify } from "@/lib/utils";

const SCROLL_THRESHOLD = 50;

export default function Nav({
  sections: { selectedWorks, skillsAndServices, portals },
}: {
  sections: {
    selectedWorks: { title: string }[];
    skillsAndServices: { title: string }[];
    portals: { title: string; galleries: { title: string }[] }[];
  };
}) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const portalPaths = portals.map((portal) => `/${slugify(portal.title)}`);
  // reusable classes for nav text color based on scroll position and page type
  const isLandingPage =
    pathname === "/selected-works" ||
    pathname === "/skills-and-services" ||
    portalPaths.includes(pathname);
  const navTextColor =
    isLandingPage && !hasScrolled ? "text-white" : "text-black";

  useEffect(() => {
    if (!isLandingPage) {
      setHasScrolled(false);
      return;
    }

    const handleScroll = () =>
      setHasScrolled(window.scrollY >= SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLandingPage]);

  // Update CSS variable for header height so modal can be positioned below it
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.offsetHeight}px`,
      );
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);

  const navigation = [
    {
      label: "Selected Works",
      href: "/selected-works",
      items: selectedWorks.map((gallery) => ({
        label: gallery.title,
        slug: slugify(gallery.title),
      })),
    },
    {
      label: "Skills & Services",
      href: "/skills-and-services",
      items: skillsAndServices.map((gallery) => ({
        label: gallery.title,
        slug: slugify(gallery.title),
      })),
    },
    ...portals.map((portal) => ({
      label: portal.title,
      href: `/${slugify(portal.title)}`,
      items: portal.galleries.map((gallery) => ({
        label: gallery.title,
        slug: slugify(gallery.title),
      })),
    })),
  ];

  function colorChangeSvg({
    url = "/logo.svg",
    color = "white",
    className = "h-6 w-full",
  }: {
    url?: string;
    color?: string;
    className?: string;
  }) {
    return (
      <div
        className={`pointer-events-none transition-colors duration-1000 ${className}`}
        style={{
          maskImage: `url(${url})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskImage: `url(${url})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          backgroundColor: color,
        }}
      />
    );
  }

  return (
    <header
      ref={headerRef}
      className={`${isLandingPage ? "fixed" : "sticky"} top-0 z-10 py-6 flex w-full flex-wrap justify-center transition-[background-color,color] duration-1000 ${
        isLandingPage && !hasScrolled
          ? "left-0 bg-transparent text-white"
          : "bg-white/95 text-black"
      }`}
    >
      {/* Scrim overlay */}
      <div
        className={`absolute inset-0 pointer-events-none h-full transition-opacity duration-1000 ${
          isLandingPage && !hasScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 100%)",
        }}
      />
      <Link className="relative z-10 max-w-3/4 w-80 p-4" href="/" id="#top">
        {colorChangeSvg({
          color: isLandingPage && !hasScrolled ? "white" : "black",
        })}
      </Link>
      <nav className="relative z-10 flex w-full flex-wrap justify-center gap-x-7 gap-y-2 px-6 font-light transition-colors duration-1000">
        {navigation.map((item) => {
          const isSectionActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <div
              key={item.href}
              className="group relative"
              onMouseEnter={() => setOpenMenu(item.href)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div className="flex items-end gap-2">
                <Link
                  href={item.href}
                  className={`text-base ${navTextColor} transition-colors duration-1000 ease-in-out hover:underline ${isSectionActive ? "font-bold" : ""}`}
                >
                  {item.label}
                </Link>
                {item.items.length > 0 && (
                  <button
                    type="button"
                    aria-expanded={openMenu === item.href}
                    aria-label={`Toggle ${item.label} menu`}
                    className="inline-flex items-center justify-center"
                    onClick={() =>
                      setOpenMenu(openMenu === item.href ? null : item.href)
                    }
                  >
                    {colorChangeSvg({
                      url: "/>.svg",
                      color: isLandingPage && !hasScrolled ? "white" : "black",
                      className: "block h-3 w-3 rotate-90",
                    })}
                  </button>
                )}
              </div>
              {/* DROPDOWN MENU */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 min-w-full top-full z-20 bg-white px-2 py-2 shadow-sm ${
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
                      className={`block whitespace-nowrap px-2 py-1 text-sm text-black transition-colors duration-100 hover:underline ${
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
          className={`text-base ${navTextColor} transition-colors duration-1000 ease-in-out hover:underline ${pathname === "/contact" ? "font-bold" : ""}`}
        >
          Contact & Info
        </Link>
      </nav>
    </header>
  );
}
