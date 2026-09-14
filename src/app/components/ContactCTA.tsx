import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { contactInfo } from "@/app/data/contact";

export default function ContactCTA() {
  const phoneNumber = contactInfo.phone.replace(/\s/g, "");
  const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, "");

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <section className="relative w-full overflow-hidden bg-blue-700 py-20 sm:py-24 lg:py-28">

      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}

      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-black/10 blur-3xl" />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-700 to-blue-900" />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div>

            {/* Label */}
            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-10 bg-white/70" />

              <span className="text-sm font-bold tracking-[0.18em] text-white/80">
                GET IN TOUCH
              </span>

            </div>

            {/* Heading */}
            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Need Printing, Digital or Document Services?
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              We're ready to help. Visit Dove Print Solutions or get in
              touch with us today and let us know what you need.
            </p>

            {/* =================================================
                LOCATION
            ================================================== */}

            <div className="mt-8 flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Visit Us
                </p>

                <p className="mt-1 text-sm leading-6 text-blue-100">
                  {contactInfo.address.line1}
                  <br />
                  {contactInfo.address.line2},{" "}
                  {contactInfo.address.city}
                </p>
              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE - CONTACT CARD
          ================================================== */}

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
              Let's Talk
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Choose how you'd like to reach us
            </h3>

            <div className="mt-7 space-y-3">

              {/* =================================================
                  CALL BUTTON
              ================================================== */}

              <a
                href={`tel:${phoneNumber}`}
                className="group flex items-center justify-between rounded-2xl bg-white p-4 text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Call Us
                    </p>

                    <p className="mt-1 font-bold">
                      {contactInfo.phone}
                    </p>
                  </div>

                </div>

                <ArrowRight className="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-700" />

              </a>

              {/* =================================================
                  WHATSAPP BUTTON
              ================================================== */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 sm:p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                    <MessageCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                      WhatsApp
                    </p>

                    <p className="mt-1 font-bold">
                      Chat With Us
                    </p>
                  </div>

                </div>

                <ArrowRight className="h-5 w-5 text-white/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />

              </a>

              {/* =================================================
                  DIRECTIONS BUTTON
              ================================================== */}

              <a
                href={contactInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 sm:p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                      Find Us
                    </p>

                    <p className="mt-1 font-bold">
                      Get Directions
                    </p>
                  </div>

                </div>

                <ArrowRight className="h-5 w-5 text-white/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />

              </a>

            </div>

            {/* Contact page */}
            <div className="mt-6 border-t border-white/10 pt-6">

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors duration-300 hover:text-blue-100"
              >
                View our contact page

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
