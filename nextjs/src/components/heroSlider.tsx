"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageWrapper from "./image";
import ErrorMessage from "./ErrorMessage";
import type { HeroSlider } from "@/sanity/queries/types";

export default function HeroSlider({
  slides,
}: {
  slides?: HeroSlider[] | null;
}) {
  const heroSlides = slides ?? [];
  const [index, setIndex] = useState(0);

  // Auto-advance loop
  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  if (heroSlides.length === 0) {
    return (
      <ErrorMessage>
        Skills and services hero: no media provided. Please add images or videos
        to the hero field in the Sanity CMS for this page.
      </ErrorMessage>
    );
  }

  const currentSlide = heroSlides[index];

  if (heroSlides.length === 1) {
    return (
      <div className="aspect-[16/7] w-full overflow-hidden">
        {currentSlide._type === "image" ? (
          <ImageWrapper
            photoAsset={currentSlide.asset}
            altText="Skills and services"
            className="h-full w-full object-cover transition-opacity duration-500"
          />
        ) : (
          <video
            src={currentSlide.asset.url}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative h-[90vh] min-h-[28rem] w-full overflow-hidden">
      {/* AnimatePresence handles the fading out of the unmounted element */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {currentSlide._type === "file" ? (
            <video
              src={currentSlide.asset.url}
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
            />
          ) : (
            <ImageWrapper
              photoAsset={currentSlide.asset}
              altText="Skills and services"
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
