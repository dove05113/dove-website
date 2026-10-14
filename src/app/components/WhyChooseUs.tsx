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
    <section className="w-full bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative">
            <div className="relative min-h-[420px] overflow-hidden bg-gray-100 sm:min-h-[520px] lg:min-h-[600px]">
              <Image
                src="/images/why-choose-us.jpg"
                alt="Dove Print Solutions"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  DOVE PRINT SOLUTIONS
                </p>

                <h3 className="mt-3 max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Your trusted digital and printing partner.
                </h3>

                <div className="mt-5 flex items-center gap-3 border-t border-white/30 pt-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-white" />
                  <p className="text-sm font-medium text-white">
                    Quality service you can count on
                  </p>
                </div>
              </div>
            </div>

            {/* Image caption */}
            <p className="mt-3 text-xs uppercase tracking-wider text-gray-500">
              Printing · Digital services · Document solutions
            </p>
          </div>

          {/* Content */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-1 w-8 bg-blue-700" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Why choose us
              </span>
            </div>

            <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Good service.
              <span className="block text-blue-700">Quality results.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              We combine professional service, quality results and convenience
              to provide reliable digital, printing and document solutions for
              individuals and businesses.
            </p>

            {/* Benefits */}
            <div className="mt-9 grid gap-x-8 sm:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.id}
                    className={`group border-t border-gray-200 py-5 ${
                      index < 2 ? "sm:border-t-0 sm:pt-0" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-blue-700 transition-transform duration-200 group-hover:scale-110" />

                      <h3 className="font-bold text-gray-950 transition-colors group-hover:text-blue-700">
                        {benefit.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-7">
              <Link
                href="/about"
                className="group inline-flex min-h-12 items-center gap-4 bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-20 grid border-y border-gray-200 sm:grid-cols-3">
          <div className="border-b border-gray-200 py-7 sm:border-b-0 sm:border-r sm:pr-8 sm:text-left">
            <p className="text-2xl font-bold tracking-tight text-blue-700 sm:text-3xl">
              100%
            </p>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Customer Focus
            </p>
          </div>

          <div className="border-b border-gray-200 py-7 sm:border-b-0 sm:px-8">
            <p className="text-2xl font-bold tracking-tight text-blue-700 sm:text-3xl">
              Quality
            </p>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Professional Results
            </p>
          </div>

          <div className="py-7 sm:pl-8">
            <p className="text-2xl font-bold tracking-tight text-blue-700 sm:text-3xl">
              Reliable
            </p>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Service You Can Trust
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
