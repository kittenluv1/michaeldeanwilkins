"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import ImageWrapper from "./image";
import ErrorMessage from "./ErrorMessage";
import type { HeroSlider as HeroSlide } from "@/sanity/queries/types";

const AUTO_FADE_INTERVAL = 8000;
const FADE_DURATION = 1800;

export default function HeroSlider({
  slides,
}: {
  slides?: HeroSlide[] | null;
}) {
  const heroSlides = (slides ?? []).slice(0, 3);
  const [index, setIndex] = useState(0);
  const [autoFadeActive, setAutoFadeActive] = useState(true);

  const mediaTypes = new Set(heroSlides.map((slide) => slide._type));
  const hasMixedMedia = mediaTypes.size > 1;
  const isImageBlock = mediaTypes.has("image");
  const currentSlide = heroSlides[index];

  const changeSlide = useCallback(
    (nextIndex: number, pauseAutoFade = false) => {
      if (nextIndex === index) {
        return;
      }

      if (pauseAutoFade) {
        setAutoFadeActive(false);
      }
      setIndex(nextIndex);
    },
    [index],
  );

  useEffect(() => {
    setIndex(0);
    setAutoFadeActive(true);
  }, [slides]);

  useEffect(() => {
    if (!isImageBlock || !autoFadeActive || heroSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      changeSlide((index + 1) % heroSlides.length);
    }, AUTO_FADE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [autoFadeActive, changeSlide, heroSlides.length, index, isImageBlock]);

  if (heroSlides.length === 0) {
    return (
      <ErrorMessage>
        Hero slider: no media provided. Please add images or videos to the hero
        field in Sanity.
      </ErrorMessage>
    );
  }

  if (hasMixedMedia) {
    return (
      <ErrorMessage>
        Hero slider: images and videos cannot be mixed in the same block.
      </ErrorMessage>
    );
  }

  const stopAutoFade = () => setAutoFadeActive(false);
  const showPrevious = () => {
    changeSlide(index === 0 ? heroSlides.length - 1 : index - 1, true);
  };
  const showNext = () => {
    changeSlide((index + 1) % heroSlides.length, true);
  };

  return (
    <div
      className="relative h-[90vh] min-h-[28rem] w-full overflow-hidden"
      onClick={stopAutoFade}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={currentSlide.asset._id}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION / 1000, ease: "easeInOut" }}
        >
          <SlideMedia slide={currentSlide} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons and indicators */}
      {heroSlides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={showPrevious}
            className="absolute left-4 top-1/2 z-9 -translate-y-1/2 px-3 py-2 text-3xl text-white drop-shadow-md transition-opacity hover:opacity-70 hover:cursor-pointer"
          >
            <img
              src="/>.svg"
              alt="Previous"
              className="h-8 w-8 -scale-x-100 drop-shadow-[0_0_10px_rgba(0,0,0,1)]"
            />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={showNext}
            className="absolute right-4 top-1/2 z-9 -translate-y-1/2 px-3 py-2 text-3xl text-white drop-shadow-md transition-opacity hover:opacity-70 hover:cursor-pointer"
          >
            <img
              src="/>.svg"
              alt="Next"
              className="h-8 w-8 drop-shadow-[0_0_10px_rgba(0,0,0,1)]"
            />
          </button>
          {/* Slide indicators (circles) */}
          <div className="absolute bottom-6 left-1/2 flex z-9 -translate-x-1/2 gap-3">
            {heroSlides.map((slide, slideIndex) => (
              <button
                key={slide.asset._id}
                type="button"
                aria-label={`Go to slide ${slideIndex + 1}`}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={(event) => {
                  event.stopPropagation();
                  changeSlide(slideIndex, true);
                }}
                className={`h-2 w-2 rounded-full border border-white transition-colors drop-shadow-[0_0_10px_rgba(0,0,0,1)] ${
                  slideIndex === index
                    ? "bg-white"
                    : "bg-transparent hover:bg-white/50 hover:cursor-pointer"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SlideMedia({ slide }: { slide: HeroSlide }) {
  return slide._type === "file" ? (
    <video
      src={slide.asset.url}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
    />
  ) : (
    <ImageWrapper photo={slide.asset} altText="Selected Works" cover={true} />
  );
}
