import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { contactInfo } from "@/app/data/contact";

export default function ContactCTA() {
  const phoneNumber = contactInfo.phone.replace(/\s/g, "");
  const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, "");

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <section className="relative w-full overflow-hidden bg-blue-700 text-white">
      {/* Decorative accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[48px] border-white/[0.06]"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          {/* Introduction */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-blue-200" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                Get in touch
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Let's get your next project started.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              From printing and document services to creative design, Dove Print
              Solutions is ready to help. Contact us or visit our location to
              get started.
            </p>

            <div className="mt-9 flex items-start gap-4 border-t border-white/20 pt-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-blue-700">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  Visit our premises
                </p>

                <p className="mt-1 text-sm leading-6 text-blue-100">
                  {contactInfo.address.line1}
                  <br />
                  {contactInfo.address.line2}, {contactInfo.address.city}
                </p>

                <a
                  href={contactInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 transition hover:decoration-white"
                >
                  Get directions
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact options */}
          <div className="bg-white p-5 text-gray-950 sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                  Contact us
                </p>

                <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  How can we help?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Choose the most convenient way to reach our team.
                </p>
              </div>

              <div className="hidden h-11 w-11 shrink-0 items-center justify-center bg-blue-50 text-blue-700 sm:flex">
                <MessageCircle size={21} />
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {/* Phone */}
              <a
                href={`tel:${phoneNumber}`}
                className="group flex items-center gap-4 py-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gray-100 text-gray-900 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                  <Phone size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Call us
                  </p>
                  <p className="mt-1 break-words font-bold text-gray-950">
                    {contactInfo.phone}
                  </p>
                </div>

                <ArrowRight
                  size={19}
                  className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                />
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-green-50 text-green-700 transition-colors group-hover:bg-green-700 group-hover:text-white">
                  <MessageCircle size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    WhatsApp
                  </p>
                  <p className="mt-1 font-bold text-gray-950">
                    Chat with our team
                  </p>
                </div>

                <ArrowRight
                  size={19}
                  className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
                />
              </a>

              {/* Directions */}
              <a
                href={contactInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                  <MapPin size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Find us
                  </p>
                  <p className="mt-1 font-bold text-gray-950">Get directions</p>
                </div>

                <ArrowRight
                  size={19}
                  className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                />
              </a>
            </div>

            <div className="mt-2 border-t border-gray-200 pt-5">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
