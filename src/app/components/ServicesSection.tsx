"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  FileText,
  Globe2,
  Laptop,
  Palette,
  Printer,
} from "lucide-react";

import { getServices } from "@/lib/services";

type PricingOption = {
  name: string;
  price: number;
  unit: string;
};

type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  group: "cyber" | "design";
  category: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  pricing: PricingOption[];
  pricingType: "fixed" | "custom";
};

function getServiceIcon(service: Service) {
  if (service.category === "documents") {
    return FileText;
  }

  if (service.category === "online") {
    return Globe2;
  }

  if (service.category === "computer") {
    return Laptop;
  }

  if (service.category === "graphic-design") {
    return Palette;
  }

  if (service.category === "photography") {
    return Camera;
  }

  if (service.category === "branding") {
    return BriefcaseBusiness;
  }

  return Printer;
}

function getStartingPrice(service: Service) {
  if (service.pricingType === "custom" || service.pricing.length === 0) {
    return null;
  }

  const lowestPrice = Math.min(
    ...service.pricing.map((option) => option.price),
  );

  return lowestPrice;
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();

        const featuredServices = (data as Service[])
          .filter((service) => service.active && service.featured)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .slice(0, 4);

        setServices(featuredServices);
      } catch (error) {
        console.error("Failed to load featured services:", error);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <section className="w-full bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col gap-6 border-b border-gray-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-1 w-8 bg-blue-700" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                What we offer
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Services built around your needs.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-gray-500 lg:pb-1">
            From everyday document services to creative design and branding, we
            provide practical solutions for individuals and businesses.
          </p>
        </div>

        {/* Featured services */}
        <div className="mt-10">
          {loading ? (
            <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-64 animate-pulse bg-gray-50" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="border border-gray-200 px-6 py-12 text-center">
              <p className="text-sm text-gray-500">
                Our featured services will appear here soon.
              </p>

              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
              >
                Browse services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => {
                const Icon = getServiceIcon(service);
                const startingPrice = getStartingPrice(service);

                return (
                  <article
                    key={service.id}
                    className="group relative flex min-h-[280px] flex-col bg-white p-6 transition-colors duration-200 hover:bg-gray-50 sm:p-7"
                  >
                    {/* Number */}
                    <div className="mb-10 flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-400">
                        0{index + 1}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center bg-gray-950 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold tracking-tight text-gray-950">
                        {service.name}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                        {service.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex items-end justify-between border-t border-gray-100 pt-4">
                      <div>
                        {startingPrice !== null ? (
                          <>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                              From
                            </p>

                            <p className="mt-0.5 text-sm font-bold text-gray-950">
                              KES {startingPrice.toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <p className="text-xs font-medium text-gray-500">
                            Pricing on request
                          </p>
                        )}
                      </div>

                      <ArrowRight className="h-4 w-4 text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-700" />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Looking for something specific?
          </p>

          <Link
            href="/services"
            className="group inline-flex w-fit items-center gap-3 bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
