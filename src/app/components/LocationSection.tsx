"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

import {
  getBusinessInformation,
  type BusinessInformation,
} from "@/lib/business";

type LocationBusinessInformation = BusinessInformation & {
  latitude?: number | string;
  longitude?: number | string;
  googleMapsUrl?: string;
};

const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export default function LocationSection() {
  const [business, setBusiness] = useState<LocationBusinessInformation | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadBusinessInformation() {
      try {
        const data = await getBusinessInformation();

        if (mounted && data) {
          setBusiness(data as LocationBusinessInformation);
        }
      } catch (error) {
        console.error("Failed to load business information:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadBusinessInformation();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl animate-pulse px-5 sm:px-8">
          <div className="h-3 w-20 bg-gray-200" />
          <div className="mt-5 h-10 max-w-md bg-gray-100" />
          <div className="mt-4 h-5 max-w-lg bg-gray-100" />
          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            <div className="min-h-[380px] bg-gray-100 lg:col-span-3" />
            <div className="space-y-6 lg:col-span-2">
              <div className="h-24 bg-gray-100" />
              <div className="h-32 bg-gray-100" />
              <div className="h-24 bg-gray-100" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!business) return null;

  const address = business.address?.trim() || "";
  const latitude = business.latitude;
  const longitude = business.longitude;

  const normalizedLatitude =
    latitude !== undefined && latitude !== null ? String(latitude).trim() : "";

  const normalizedLongitude =
    longitude !== undefined && longitude !== null
      ? String(longitude).trim()
      : "";

  const hasCoordinates =
    normalizedLatitude !== "" &&
    normalizedLongitude !== "" &&
    !Number.isNaN(Number(normalizedLatitude)) &&
    !Number.isNaN(Number(normalizedLongitude));

  const mapQuery = hasCoordinates
    ? `${normalizedLatitude},${normalizedLongitude}`
    : address;

  const directionsUrl =
    business.googleMapsUrl ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      mapQuery || business.name,
    )}`;

  const mapEmbedUrl = mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        mapQuery,
      )}&z=15&output=embed`
    : null;

  const whatsappNumber = (business.whatsapp || "").replace(/\D/g, "");

  const whatsappUrl =
    business.whatsappUrl ||
    (whatsappNumber ? `https://wa.me/${whatsappNumber}` : null);

  const phoneUrl = business.phone
    ? `tel:${business.phone.replace(/[^\d+]/g, "")}`
    : null;

  const openingHours = business.openingHours as unknown as
    | Record<string, string>
    | undefined;

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Find us
            </p>

            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Visit {business.name || "Our Business"}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-gray-600 sm:text-base">
            {business.description ||
              "Visit us for professional printing, digital and document services."}
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="relative min-h-[350px] overflow-hidden bg-gray-100 sm:min-h-[450px] lg:min-h-[560px]">
              {mapEmbedUrl ? (
                <iframe
                  title={`${business.name || "Business"} location map`}
                  src={mapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex min-h-[350px] items-center justify-center p-8 text-center sm:min-h-[450px] lg:min-h-[560px]">
                  <div>
                    <MapPin className="mx-auto h-7 w-7 text-blue-700" />
                    <p className="mt-4 font-semibold text-gray-900">
                      Location not available
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      The business address has not been configured yet.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 border-b border-gray-200 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                <div>
                  <p className="text-sm font-semibold text-gray-950">
                    {business.name || "Our Location"}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-600">
                    {address || "Address not yet provided"}
                  </p>
                </div>
              </div>

              {mapQuery && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900"
                >
                  Get directions
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            {/* Opening hours */}
            <div className="border-b border-gray-200 pb-7">
              <div className="mb-5 flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-blue-700" />
                <h3 className="text-lg font-bold text-gray-950">
                  Opening hours
                </h3>
              </div>

              <div className="space-y-0">
                {weekdays.map((day) => {
                  const hours = openingHours?.[day];

                  return (
                    <div
                      key={day}
                      className="flex items-start justify-between gap-4 border-b border-gray-100 py-3 text-sm last:border-0"
                    >
                      <span className="capitalize text-gray-600">{day}</span>
                      <span className="text-right font-medium text-gray-950">
                        {hours || "Not specified"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact details */}
            <div className="border-b border-gray-200 py-7">
              <h3 className="mb-5 text-lg font-bold text-gray-950">
                Get in touch
              </h3>

              {business.phone && (
                <a
                  href={phoneUrl!}
                  className="group flex items-start gap-3 py-3"
                >
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Phone
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-700">
                      {business.phone}
                    </p>
                  </div>
                </a>
              )}

              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="group flex items-start gap-3 py-3"
                >
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-700">
                      {business.email}
                    </p>
                  </div>
                </a>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col items-start gap-4 pt-7">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 bg-blue-700 px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                  <ArrowUpRight className="ml-auto h-4 w-4" />
                </a>
              )}

              {mapQuery && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-700"
                >
                  <Navigation className="h-4 w-4" />
                  Open in Google Maps
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
