"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

import { carouselSlides } from "@/app/data/carousel";

const AUTOPLAY_DURATION = 5000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slide = carouselSlides[current];

  /*
   * Move to next slide
   */
  const nextSlide = useCallback(() => {
    setCurrent((previous) =>
      previous === carouselSlides.length - 1 ? 0 : previous + 1
    );
  }, []);

  /*
   * Move to previous slide
   */
  const previousSlide = useCallback(() => {
    setCurrent((previous) =>
      previous === 0 ? carouselSlides.length - 1 : previous - 1
    );
  }, []);

  /*
   * Go directly to a slide
   */
  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  /*
   * Automatic slideshow - 5 seconds
   */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================================
          MAIN CAROUSEL
      ====================================================== */}

      <div className="relative min-h-[650px] w-full overflow-hidden sm:min-h-[700px] lg:min-h-[720px]">

        {/* =====================================================
            BACKGROUND IMAGE
        ====================================================== */}

        <div
          key={`image-${slide.id}`}
          className="absolute inset-0 animate-carousel-image"
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority={current === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* =====================================================
            DARK IMAGE OVERLAY
        ====================================================== */}

        <div className="absolute inset-0 bg-black/35" />

        {/* Extra gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

        {/* =====================================================
            SLIDE NUMBER
        ====================================================== */}

        <div className="absolute right-6 top-6 z-20 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-md sm:right-10 sm:top-10">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(carouselSlides.length).padStart(2, "0")}
        </div>

        {/* =====================================================
            PREVIOUS BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20 sm:left-8 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* =====================================================
            NEXT BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20 sm:right-8 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* =====================================================
            DESCRIPTION / GLASS PANEL
        ====================================================== */}

        <div className="relative z-20 flex min-h-[650px] items-center px-6 py-20 sm:min-h-[700px] sm:px-12 lg:min-h-[720px] lg:px-24">

          <div
            key={`content-${slide.id}`}
            className="w-full max-w-2xl animate-carousel-content"
          >
            {/* =================================================
                GLASS DESCRIPTION BOX
            ================================================== */}

            <div className="rounded-3xl border border-white/20 bg-white/15 p-7 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-12">

              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-white" />

                <span className="text-xs font-bold tracking-[0.2em] text-white sm:text-sm">
                  {slide.eyebrow}
                </span>
              </div>

              {/* Heading */}
              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                {slide.description}
              </p>

              {/* Features */}
              <div className="mt-7 space-y-3">
                {slide.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-white sm:text-base"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Check className="h-4 w-4 text-white" />
                    </span>

                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  href={slide.buttonLink}
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl"
                >
                  {slide.buttonText}

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SLIDE INDICATORS
        ====================================================== */}

        <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
          {carouselSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === current
                  ? "w-10 bg-white"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
