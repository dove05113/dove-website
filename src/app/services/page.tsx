"use client";

import { useEffect, useMemo, useState } from "react";
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
import Link from "next/link";

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

const groupInfo = {
  cyber: {
    title: "Cyber Services",
    description:
      "Reliable digital, document and computer services for everyday personal and business needs.",
  },

  design: {
    title: "Design & Branding",
    description:
      "Creative design, photography and branding services to help your business stand out.",
  },
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

function getCategoryName(service: Service) {
  const categories: Record<string, string> = {
    documents: "Document Services",
    online: "Online Services",
    computer: "Computer Services",
    "graphic-design": "Graphic Design",
    photography: "Photography & Photos",
    branding: "Branding",
  };

  return categories[service.category] ?? service.category;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const data = await getServices();

        const activeServices = (data as Service[])
          .filter((service) => service.active)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        setServices(activeServices);
      } catch (error) {
        console.error("Failed to load services:", error);
        setError("Unable to load our services right now.");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  const cyberServices = useMemo(
    () => services.filter((service) => service.group === "cyber"),
    [services],
  );

  const designServices = useMemo(
    () => services.filter((service) => service.group === "design"),
    [services],
  );

  return (
    <main className="min-h-screen bg-white text-gray-950 font-montserrat">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="border-b border-gray-200 bg-gray-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1 w-8 bg-blue-500" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                What we offer
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              Services for work,
              <br />
              business & everyday life.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
              From printing and document services to creative design, branding
              and digital assistance, we provide practical solutions tailored to
              your needs.
            </p>
          </div>

          {/* Small summary */}
          {!loading && !error && (
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 text-sm">
              <div>
                <span className="font-bold text-white">{services.length}</span>{" "}
                <span className="text-gray-400">
                  {services.length === 1 ? "service" : "services"}
                </span>
              </div>

              <div>
                <span className="font-bold text-white">
                  {cyberServices.length}
                </span>{" "}
                <span className="text-gray-400">cyber services</span>
              </div>

              <div>
                <span className="font-bold text-white">
                  {designServices.length}
                </span>{" "}
                <span className="text-gray-400">creative services</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {loading ? (
          <div className="space-y-12">
            {[1, 2].map((group) => (
              <section key={group}>
                <div className="mb-8 h-8 w-48 animate-pulse bg-gray-100" />

                <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="h-72 animate-pulse bg-gray-50" />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : error ? (
          <div className="border border-red-200 bg-red-50 px-6 py-10 text-center">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="border border-gray-200 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-gray-950">
              No services available
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Please check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Cyber */}
            {cyberServices.length > 0 && (
              <ServiceGroup
                title={groupInfo.cyber.title}
                description={groupInfo.cyber.description}
                services={cyberServices}
              />
            )}

            {/* Design */}
            {designServices.length > 0 && (
              <ServiceGroup
                title={groupInfo.design.title}
                description={groupInfo.design.description}
                services={designServices}
              />
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                Need something else?
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
                Let us help you find the right solution.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Get in touch with us if you have a specific request or need a
                service that is not listed above.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex w-fit shrink-0 items-center gap-3 bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Contact us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   SERVICE GROUP
============================================================ */

function ServiceGroup({
  title,
  description,
  services,
}: {
  title: string;
  description: string;
  services: Service[];
}) {
  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-1 w-6 bg-blue-700" />

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
              Services
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-950">
            {title}
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-6 text-gray-500 lg:text-right">
          {description}
        </p>
      </div>

      <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = getServiceIcon(service);

          return (
            <article
              key={service.id}
              className="group flex min-h-[300px] flex-col bg-white p-6 transition-colors duration-200 hover:bg-gray-50 sm:p-7"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex h-10 w-10 items-center justify-center bg-gray-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Category */}
              <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700">
                {getCategoryName(service)}
              </p>

              {/* Main content */}
              <h3 className="mt-2 text-xl font-bold tracking-tight text-gray-950">
                {service.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {service.description}
              </p>

              {/* Pricing */}
              <div className="mt-auto border-t border-gray-100 pt-5">
                {service.pricingType === "custom" ? (
                  <p className="text-sm font-semibold text-gray-950">
                    Pricing available on request
                  </p>
                ) : service.pricing.length > 0 ? (
                  <div className="space-y-2">
                    {service.pricing.map((option, index) => (
                      <div
                        key={`${option.name}-${index}`}
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <span className="text-gray-500">{option.name}</span>

                        <span className="shrink-0 font-bold text-gray-950">
                          KES {option.price.toLocaleString()}{" "}
                          <span className="font-normal text-gray-400">
                            / {option.unit}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    Contact us for pricing
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
