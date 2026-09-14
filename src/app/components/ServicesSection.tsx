import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/app/data/services";

export default function ServicesSection() {
  return (
    <section className="w-full bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          {/* Small label */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-blue-700" />

            <span className="text-sm font-bold tracking-[0.18em] text-blue-700">
              WHAT WE OFFER
            </span>

            <span className="h-px w-8 bg-blue-700" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Our Services
          </h2>

          {/* Description */}
          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Professional printing, digital, document and creative services
            designed to meet your everyday business and personal needs.
          </p>

        </div>

        {/* =====================================================
            SERVICES GRID
        ====================================================== */}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.id}
                href={service.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >

                {/* Decorative background circle */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50 transition-transform duration-500 group-hover:scale-150" />

                {/* Icon */}
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-all duration-300 group-hover:bg-blue-700 group-hover:text-white">
                  <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Service title */}
                <h3 className="relative text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative mt-3 text-sm leading-6 text-gray-600">
                  {service.description}
                </p>

                {/* Learn more */}
                <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <span>Learn More</span>

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>

              </Link>
            );
          })}

        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 hover:text-white hover:shadow-md"
          >
            View All Services

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}

