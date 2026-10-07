"use client";

import { useEffect, useState } from "react";
import ImageWrapper from "./image";
import ErrorMessage from "./ErrorMessage";
import type { HeroSlider as HeroSlide } from "@/sanity/queries/types";

const AUTO_FADE_INTERVAL = 8000;

export default function HeroSlider({
  slides,
}: {
  slides?: HeroSlide[] | null;
}) {
  const heroSlides = (slides ?? []).slice(0, 3);
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoFadeActive, setAutoFadeActive] = useState(true);

  const mediaTypes = new Set(heroSlides.map((slide) => slide._type));
  const hasMixedMedia = mediaTypes.size > 1;
  const isImageBlock = mediaTypes.has("image");
  const currentSlide = heroSlides[index];

  useEffect(() => {
    setIndex(0);
    setPreviousIndex(null);
    setIsTransitioning(false);
    setAutoFadeActive(true);
  }, [slides]);

  useEffect(() => {
    if (!isImageBlock || !autoFadeActive || heroSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setPreviousIndex(index);
      setIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
      setIsTransitioning(false);
      requestAnimationFrame(() => setIsTransitioning(true));
    }, AUTO_FADE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [autoFadeActive, heroSlides.length, index, isImageBlock]);

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
  const goToSlide = (nextIndex: number) => {
    if (nextIndex === index) {
      return;
    }

    stopAutoFade();
    setPreviousIndex(index);
    setIndex(nextIndex);
    setIsTransitioning(false);
    requestAnimationFrame(() => setIsTransitioning(true));
    window.setTimeout(() => setPreviousIndex(null), 1800);
  };
  const showPrevious = () => {
    goToSlide(
      index === 0 ? heroSlides.length - 1 : index - 1,
    );
  };
  const showNext = () => {
    goToSlide((index + 1) % heroSlides.length);
  };

  return (
    <div
      className="relative h-[90vh] min-h-[28rem] w-full overflow-hidden"
      onClick={stopAutoFade}
    >
      {previousIndex !== null && (
        <div className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-[1800ms] ease-in-out">
          <SlideMedia slide={heroSlides[previousIndex]} />
        </div>
      )}
      <div
        className={`absolute inset-0 h-full w-full transition-opacity duration-[1800ms] ease-in-out ${
          previousIndex === null || isTransitioning
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        <SlideMedia slide={currentSlide} />
      </div>

      {heroSlides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={showPrevious}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 px-3 py-2 text-3xl text-white drop-shadow-md transition-opacity hover:opacity-70"
          >
            &lt;
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={showNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 px-3 py-2 text-3xl text-white drop-shadow-md transition-opacity hover:opacity-70"
          >
            &gt;
          </button>
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
    <ImageWrapper
      photoAsset={slide.asset}
      altText="Selected Works"
      className="h-full w-full object-cover"
    />
  );
}
