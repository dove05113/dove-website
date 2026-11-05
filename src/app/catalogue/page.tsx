"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Monitor,
  Phone,
  Printer,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import {
  getCatalogueItems,
  type CatalogueItem,
  type CatalogueCategory,
} from "@/lib/catalogue";

import { getServices } from "@/lib/services";
import { contactInfo } from "@/app/data/contact";

interface CatalogueService {
  id: string;
  name: string;
  description: string;
  group: "cyber" | "design";
  category: string;
  imageUrl?: string;
  featured?: boolean;
  active?: boolean;
  sortOrder?: number;
  pricing?: {
    name: string;
    price: number;
    unit: string;
  }[];
  pricingType?: "fixed" | "custom";
}

const categories: {
  label: string;
  value: "all" | CatalogueCategory;
}[] = [
  { label: "All Designs", value: "all" },
  { label: "Graphic Design", value: "graphic-design" },
  { label: "Branding", value: "branding" },
  { label: "Marketing Materials", value: "marketing-materials" },
  { label: "Photography", value: "photography" },
];

const categoryLabels: Record<CatalogueCategory, string> = {
  "graphic-design": "Graphic Design",
  branding: "Branding",
  "marketing-materials": "Marketing Materials",
  photography: "Photography",
};

function getCategoryLabel(category: string) {
  return (
    categoryLabels[category as CatalogueCategory] ?? category.replace(/-/g, " ")
  );
}

function getServiceIcon(category: string) {
  switch (category) {
    case "documents":
      return FileText;
    case "online":
      return Monitor;
    case "computer":
      return Monitor;
    default:
      return Printer;
  }
}

function getServiceGroupLabel(category: string) {
  if (category === "documents") {
    return "Document Services";
  }

  return "Online & Computer Services";
}

function createWhatsAppLink(message: string) {
  const number = contactInfo.phone.replace(/\D/g, "");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export default function CataloguePage() {
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [services, setServices] = useState<CatalogueService[]>([]);
  const [serviceIdFilter, setServiceIdFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState<
    "all" | CatalogueCategory
  >("all");

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    async function loadCatalogue() {
      try {
        setLoading(true);
        setError("");

        const [catalogueData, serviceData] = await Promise.all([
          getCatalogueItems(),
          getServices(),
        ]);

        setItems(catalogueData);
        setServices(serviceData as CatalogueService[]);
      } catch (err) {
        console.error("Failed to load catalogue:", err);
        setError("We couldn't load the catalogue. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadCatalogue();
  }, []);

  const activeItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.active &&
          item.imageUrl &&
          (!serviceIdFilter || item.serviceId === serviceIdFilter),
      ),
    [items, serviceIdFilter],
  );

  const featuredItems = useMemo(
    () => activeItems.filter((item) => item.featured).slice(0, 4),
    [activeItems],
  );

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    return activeItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.subcategory.toLowerCase().includes(term) ||
        getCategoryLabel(item.category).toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [activeItems, activeCategory, search]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("serviceId") ?? "";

    setServiceIdFilter(serviceId);
    setVisibleCount(9);
  }, []);

  const galleryItems = useMemo(() => {
    // Featured work is already displayed above the main gallery.
    // When a specific category is selected, include featured items too.
    if (activeCategory === "all" && !search.trim()) {
      return filteredItems.filter((item) => !item.featured);
    }

    return filteredItems;
  }, [filteredItems, activeCategory, search]);

  const visibleItems = galleryItems.slice(0, visibleCount);

  const cyberServices = useMemo(
    () =>
      services
        .filter(
          (service) => service.active !== false && service.group === "cyber",
        )
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    [services],
  );

  const documentServices = cyberServices.filter(
    (service) => service.category === "documents",
  );

  const onlineServices = cyberServices.filter(
    (service) =>
      service.category === "online" || service.category === "computer",
  );

  const selectedService = services.find(
    (service) => service.id === serviceIdFilter,
  );

  const lightboxImages = useMemo(() => {
    if (!selectedItem) return [];

    return [
      selectedItem.imageUrl,
      ...(selectedItem.galleryImages ?? []),
    ].filter(Boolean);
  }, [selectedItem]);

  const openLightbox = useCallback((item: CatalogueItem) => {
    setSelectedItem(item);
    setSelectedImageIndex(0);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedItem(null);
    setSelectedImageIndex(0);
  }, []);

  const showPreviousImage = useCallback(() => {
    setSelectedImageIndex((current) =>
      current === 0 ? lightboxImages.length - 1 : current - 1,
    );
  }, [lightboxImages.length]);

  const showNextImage = useCallback(() => {
    setSelectedImageIndex((current) =>
      current === lightboxImages.length - 1 ? 0 : current + 1,
    );
  }, [lightboxImages.length]);

  useEffect(() => {
    if (!selectedItem) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem, closeLightbox, showPreviousImage, showNextImage]);

  function renderService(service: CatalogueService) {
    const Icon = getServiceIcon(service.category);

    const pricingLabel =
      service.pricingType === "custom"
        ? "Pricing available on request"
        : service.pricing?.length
          ? `From KES ${service.pricing[0].price.toLocaleString()}`
          : "Contact us for pricing";

    return (
      <div
        key={service.id}
        className="group flex flex-col border-t border-gray-200 py-5 transition-colors hover:border-blue-700"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <Icon className="mt-1 h-5 w-5 shrink-0 text-blue-700" />

            <div>
              <h4 className="font-semibold text-gray-900">{service.name}</h4>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {service.description}
              </p>

              <p className="mt-2 text-xs font-semibold text-gray-500">
                {pricingLabel}
              </p>
            </div>
          </div>

          <a
            href={createWhatsAppLink(
              `Hello Dove Print Solutions, I would like to enquire about ${service.name}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${service.name}`}
            className="mt-1 shrink-0 text-gray-400 transition-colors hover:text-blue-700"
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-montserrat">
      {/* Hero */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            Dove Print Solutions
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Ideas made visible.
                <span className="block text-blue-700">
                  Services made simple.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-500">
                Explore our creative designs, branding solutions, printing work
                and professional cyber services.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 bg-blue-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800"
              >
                <Phone className="h-4 w-4" />
                Get in Touch
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 transition-colors hover:border-blue-700 hover:text-blue-700"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      {featuredItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                Selected work
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Featured designs
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                document
                  .getElementById("design-gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 sm:inline-flex"
            >
              Explore all work
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {featuredItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openLightbox(item)}
                className={`group relative block w-full overflow-hidden bg-gray-100 text-left ${
                  index === 0 ? "col-span-2 row-span-2" : "col-span-1"
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    index === 0
                      ? "aspect-[4/3] h-full min-h-[260px] md:aspect-auto md:min-h-[430px]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90" />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/75">
                      {getCategoryLabel(item.category)}
                    </p>

                    <h3 className="mt-1 text-base font-bold text-white sm:text-lg">
                      {item.title}
                    </h3>

                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white/90">
                      View design
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Design Gallery */}
      <section
        id="design-gallery"
        className="border-y border-gray-200 bg-gray-50/70"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Creative portfolio
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              {selectedService
                ? `Catalogue: ${selectedService.name}`
                : "Design & Branding"}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
              From promotional artwork to complete brand identities, explore
              some of the creative work we offer.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {categories.map((category) => {
                const active = activeCategory === category.value;

                return (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category.value);
                      setVisibleCount(9);
                    }}
                    className={`shrink-0 border px-4 py-2.5 text-xs font-semibold transition-colors ${
                      active
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-gray-300 bg-white text-gray-600 hover:border-blue-700 hover:text-blue-700"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(9);
                }}
                placeholder="Search designs..."
                className="h-11 w-full border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-700"
              />
            </div>
            {serviceIdFilter && (
              <button
                type="button"
                onClick={() => {
                  setServiceIdFilter("");
                  setVisibleCount(9);

                  const url = new URL(window.location.href);
                  url.searchParams.delete("serviceId");
                  window.history.replaceState({}, "", url);
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                <X className="h-3.5 w-3.5" />
                Clear service filter
              </button>
            )}
          </div>

          {/* Gallery */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] animate-pulse bg-gray-200"
                />
              ))}
            </div>
          ) : error ? (
            <div className="border border-red-200 bg-red-50 px-5 py-8 text-center text-sm text-red-700">
              {error}
            </div>
          ) : visibleItems.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
                {visibleItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openLightbox(item)}
                    className="group text-left"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                        <span className="flex h-11 w-11 items-center justify-center bg-white text-gray-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2 pt-3">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 transition-colors group-hover:text-blue-700">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-gray-500">
                          {getCategoryLabel(item.category)}
                        </p>
                      </div>

                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-blue-700" />
                    </div>
                  </button>
                ))}
              </div>

              {visibleItems.length < galleryItems.length && (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + 9)}
                    className="border border-gray-300 bg-white px-7 py-3 text-sm font-bold text-gray-700 transition-colors hover:border-blue-700 hover:text-blue-700"
                  >
                    Load More Designs
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="border border-gray-200 bg-white px-5 py-16 text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-gray-300" />

              <h3 className="mt-4 font-bold text-gray-900">No designs found</h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another category or search term.
              </p>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setSearch("");
                }}
                className="mt-5 text-sm font-bold text-blue-700 hover:text-blue-900"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cyber & Document Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            More than printing
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            Cyber & Document Services
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            Get assistance with everyday document, computer and online services,
            all in one place.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-12 md:grid-cols-2">
            {[1, 2].map((group) => (
              <div key={group} className="animate-pulse">
                <div className="h-6 w-48 bg-gray-200" />
                <div className="mt-6 h-20 bg-gray-100" />
                <div className="mt-4 h-20 bg-gray-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {/* Document Services */}
            <div>
              <div className="mb-5 flex items-center gap-3 border-b border-gray-200 pb-4">
                <FileText className="h-5 w-5 text-blue-700" />

                <div>
                  <h3 className="font-bold text-gray-950">Document Services</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Professional document preparation and finishing.
                  </p>
                </div>
              </div>

              {documentServices.length > 0 ? (
                documentServices.map(renderService)
              ) : (
                <p className="py-5 text-sm text-gray-500">
                  No document services are currently listed.
                </p>
              )}
            </div>

            {/* Online & Computer Services */}
            <div>
              <div className="mb-5 flex items-center gap-3 border-b border-gray-200 pb-4">
                <Monitor className="h-5 w-5 text-blue-700" />

                <div>
                  <h3 className="font-bold text-gray-950">
                    Online & Computer Services
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Online applications and computer assistance.
                  </p>
                </div>
              </div>

              {onlineServices.length > 0 ? (
                onlineServices.map(renderService)
              ) : (
                <p className="py-5 text-sm text-gray-500">
                  No online or computer services are currently listed.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-10 border-t border-gray-200 pt-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition-colors hover:text-blue-900"
          >
            Explore all our services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="bg-blue-700">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <Sparkles className="mb-4 h-6 w-6 text-blue-200" />

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Have a project in mind?
            </h2>

            <p className="mt-3 text-sm leading-7 text-blue-100">
              Let's bring your ideas to life. Talk to us about your next design,
              branding or printing project.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Contact Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <a
              href={createWhatsAppLink(
                "Hello Dove Print Solutions, I would like to enquire about your services.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/50 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              WhatsApp Us
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.title} image preview`}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-white transition-colors hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative flex max-h-full w-full max-w-6xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              <img
                src={lightboxImages[selectedImageIndex]}
                alt={selectedItem.title}
                className="max-h-[72vh] max-w-full object-contain"
              />

              {lightboxImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="Previous image"
                    className="absolute left-0 flex h-11 w-11 items-center justify-center bg-black/50 text-white transition-colors hover:bg-black/80 sm:-left-14"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Next image"
                    className="absolute right-0 flex h-11 w-11 items-center justify-center bg-black/50 text-white transition-colors hover:bg-black/80 sm:-right-14"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            <div className="mx-auto w-full max-w-3xl pt-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">
                {getCategoryLabel(selectedItem.category)}
              </p>

              <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                {selectedItem.title}
              </h3>

              {selectedItem.description && (
                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/65">
                  {selectedItem.description}
                </p>
              )}

              {lightboxImages.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {lightboxImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      className={`h-1.5 transition-all ${
                        index === selectedImageIndex
                          ? "w-8 bg-blue-400"
                          : "w-4 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}

              <a
                href={createWhatsAppLink(
                  `Hello Dove Print Solutions, I am interested in ${selectedItem.title}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 bg-white px-5 py-3 text-xs font-bold text-gray-900 transition-colors hover:bg-blue-50"
              >
                Enquire About This Design
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
