import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  BadgeCheck,
  WalletCards,
  MapPin,
  HeartHandshake,
} from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Fast & Reliable",
    description:
      "We value your time and aim to provide efficient, dependable service whenever you visit us.",
    icon: Clock3,
  },
  {
    id: 2,
    title: "Professional Service",
    description:
      "Our approach is professional, friendly and focused on making your experience simple and convenient.",
    icon: BadgeCheck,
  },
  {
    id: 3,
    title: "Affordable Pricing",
    description:
      "Competitive pricing designed to give individuals, students and businesses excellent value.",
    icon: WalletCards,
  },
  {
    id: 4,
    title: "Quality Results",
    description:
      "We pay attention to detail to ensure your documents and printed materials look their best.",
    icon: CheckCircle2,
  },
  {
    id: 5,
    title: "Convenient Location",
    description:
      "Easy access to the digital, printing and document services you need in one convenient place.",
    icon: MapPin,
  },
  {
    id: 6,
    title: "Customer-Focused",
    description:
      "We listen to what you need and strive to provide practical solutions that meet your expectations.",
    icon: HeartHandshake,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gray-50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ===================================================
              IMAGE SIDE
          ==================================================== */}

          <div className="relative">

            {/* Main image */}
            <div className="relative min-h-[500px] overflow-hidden rounded-3xl shadow-2xl sm:min-h-[560px]">

              <Image
                src="/images/why-choose-us.jpg"
                alt="Dove Print Solutions"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Image caption */}
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                  DOVE PRINT SOLUTIONS
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Your Trusted Digital & Printing Partner
                </h3>

              </div>
            </div>

            {/* =================================================
                FLOATING STAT CARD
            ================================================== */}

            <div className="absolute -bottom-6 right-5 rounded-2xl border border-white/50 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:-right-6 sm:p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <CheckCircle2 className="h-6 w-6 text-blue-700" />
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    Quality
                  </p>

                  <p className="text-sm text-gray-500">
                    You can count on
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* ===================================================
              CONTENT SIDE
          ==================================================== */}

          <div>

            {/* Section label */}
            <div className="mb-4 flex items-center gap-3">

              <span className="h-px w-8 bg-blue-700" />

              <span className="text-sm font-bold tracking-[0.18em] text-blue-700">
                WHY CHOOSE US
              </span>

            </div>

            {/* Heading */}
            <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Why Choose{" "}
              <span className="text-blue-700">
                Dove Print Solutions?
              </span>
            </h2>

            {/* Introduction */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              We combine professional service, quality results and
              convenience to provide reliable digital, printing and
              document solutions for individuals and businesses.
            </p>

            {/* =================================================
                BENEFITS
            ================================================== */}

            <div className="mt-9 grid gap-6 sm:grid-cols-2">

              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.id}
                    className="group flex gap-4"
                  >

                    {/* Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-blue-700 group-hover:text-white group-hover:shadow-md">
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                        {benefit.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-gray-600">
                        {benefit.description}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

            {/* =================================================
                CTA
            ================================================== */}

            <div className="mt-10">

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg"
              >
                Learn More About Us

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM STATS
        ====================================================== */}

        <div className="mt-20 grid overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 sm:grid-cols-3">

          {/* Stat 1 */}
          <div className="border-b border-gray-100 p-7 text-center sm:border-b-0 sm:border-r">
            <p className="text-3xl font-bold text-blue-700">
              100%
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Customer Focus
            </p>
          </div>

          {/* Stat 2 */}
          <div className="border-b border-gray-100 p-7 text-center sm:border-b-0 sm:border-r">
            <p className="text-3xl font-bold text-blue-700">
              Quality
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Professional Results
            </p>
          </div>

          {/* Stat 3 */}
          <div className="p-7 text-center">
            <p className="text-3xl font-bold text-blue-700">
              Reliable
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Service You Can Trust
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
