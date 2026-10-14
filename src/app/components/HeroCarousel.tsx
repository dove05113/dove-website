"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";

import { carouselSlides } from "@/app/data/carousel";

const AUTOPLAY_DURATION = 5000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slide = carouselSlides[current];

  const nextSlide = useCallback(() => {
    setCurrent((previous) =>
      previous === carouselSlides.length - 1 ? 0 : previous + 1,
    );
  }, []);

  const previousSlide = useCallback(() => {
    setCurrent((previous) =>
      previous === 0 ? carouselSlides.length - 1 : previous - 1,
    );
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (isPaused || carouselSlides.length <= 1) return;

    const timer = setInterval(nextSlide, AUTOPLAY_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  if (carouselSlides.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      aria-roledescription="carousel"
      aria-label="Featured services"
    >
      <div className="relative min-h-[650px] w-full sm:min-h-[700px] lg:min-h-[720px]">
        {/* Background image */}
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

        {/* Contrast overlay */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/45 to-transparent" />

        {/* Slide counter */}
        <div className="absolute right-6 top-6 z-30 flex items-center gap-2 text-sm font-medium tabular-nums text-white sm:right-10 sm:top-10">
          <span className="text-lg font-bold">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-white/50">/</span>
          <span className="text-white/70">
            {String(carouselSlides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main content */}
        <div className="relative z-20 flex min-h-[650px] items-center px-6 py-24 sm:min-h-[700px] sm:px-12 lg:min-h-[720px] lg:px-24 xl:px-32">
          <div
            key={`content-${slide.id}`}
            className="w-full max-w-3xl animate-carousel-content"
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1 w-10 bg-blue-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white sm:text-sm">
                {slide.eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              {slide.description}
            </p>

            {/* Features */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {slide.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm font-medium text-white sm:text-base"
                >
                  <Check className="h-4 w-4 shrink-0 text-blue-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9">
              <Link
                href={slide.buttonLink}
                className="group inline-flex min-h-12 items-center gap-4 bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {slide.buttonText}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Previous / next controls */}
        {carouselSlides.length > 1 && (
          <div className="absolute bottom-8 right-6 z-30 flex items-center gap-2 sm:right-10 lg:right-12">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Slide indicators */}
        {carouselSlides.length > 1 && (
          <div className="absolute bottom-12 left-6 z-30 flex items-center gap-2 sm:left-12 lg:left-24 xl:left-32">
            {carouselSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
                className={`h-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  index === current
                    ? "w-10 bg-blue-500"
                    : "w-5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
