import Link from "next/link";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

import { contactInfo } from "@/app/data/contact";

export default function LocationSection() {
  const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, "");

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const directionsUrl = contactInfo.googleMapsUrl;

  return (
    <section className="w-full bg-gray-50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-blue-700" />

            <span className="text-sm font-bold tracking-[0.18em] text-blue-700">
              FIND US
            </span>

            <span className="h-px w-8 bg-blue-700" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Visit Dove Print Solutions
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Conveniently located and ready to provide professional printing,
            digital and document services.
          </p>

        </div>

        {/* =====================================================
            LOCATION CONTENT
        ====================================================== */}

        <div className="mt-14 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-100">

          <div className="grid lg:grid-cols-5">

            {/* =================================================
                MAP
            ================================================== */}

            <div className="relative min-h-[420px] bg-gray-200 lg:col-span-3 lg:min-h-[600px]">

              {/* Google Maps Embed */}
              <iframe
                title="Dove Print Solutions Location"
                src={`https://www.google.com/maps?q=${contactInfo.latitude},${contactInfo.longitude}&z=15&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map label */}
              <div className="absolute left-5 top-5 z-10 rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Dove Print Solutions
                </div>
              </div>

            </div>

            {/* =================================================
                DETAILS
            ================================================== */}

            <div className="flex flex-col justify-between p-7 sm:p-9 lg:col-span-2 lg:p-10">

              <div>

                {/* Address */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Our Location
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {contactInfo.address.line1}
                      <br />
                      {contactInfo.address.line2}
                      <br />
                      {contactInfo.address.city}
                    </p>
                  </div>

                </div>

                <div className="my-7 h-px bg-gray-100" />

                {/* Opening Hours */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Clock3 className="h-5 w-5" />
                  </div>

                  <div className="w-full">

                    <h3 className="font-bold text-gray-900">
                      Opening Hours
                    </h3>

                    <div className="mt-3 space-y-2">

                      {contactInfo.openingHours.map((item) => (
                        <div
                          key={item.day}
                          className="flex justify-between gap-4 text-sm"
                        >
                          <span className="text-gray-600">
                            {item.day}
                          </span>

                          <span className="font-medium text-gray-900">
                            {item.hours}
                          </span>
                        </div>
                      ))}

                    </div>

                  </div>

                </div>

                <div className="my-7 h-px bg-gray-100" />

                {/* Phone */}
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-4"
                >

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors duration-300 group-hover:bg-blue-700 group-hover:text-white">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Call Us
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 group-hover:text-blue-700">
                      {contactInfo.phone}
                    </p>
                  </div>

                </a>

                {/* Email */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group mt-5 flex items-center gap-4"
                >

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors duration-300 group-hover:bg-blue-700 group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email Us
                    </p>

                    <p className="mt-1 break-all font-semibold text-gray-900 group-hover:text-blue-700">
                      {contactInfo.email}
                    </p>
                  </div>

                </a>

              </div>

              {/* =================================================
                  ACTION BUTTONS
              ================================================== */}

              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                {/* Directions */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg"
                >
                  <Navigation className="h-4 w-4" />

                  Get Directions
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />

                  Chat on WhatsApp
                </a>

                {/* Contact */}
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                >
                  Contact Us
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
