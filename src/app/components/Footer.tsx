import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { contactInfo } from "@/app/data/contact";

export default function Footer() {
  const phoneNumber = contactInfo.phone.replace(/\s/g, "");
  const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, "");

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Company */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <span className="text-xl font-bold text-white">D</span>
                </div>

                <div>
                  <p className="text-lg font-bold leading-tight">
                    Dove Print
                  </p>
                  <p className="text-sm font-medium text-blue-400">
                    Solutions
                  </p>
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Your trusted partner for printing, document preparation,
              photocopying, scanning, graphic design and digital services.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/location"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Our Services
            </h3>

            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/services/printing"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Printing
                </Link>
              </li>

              <li>
                <Link
                  href="/services/photocopying"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Photocopying
                </Link>
              </li>

              <li>
                <Link
                  href="/services/scanning"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Scanning
                </Link>
              </li>

              <li>
                <Link
                  href="/services/documents"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Document Services
                </Link>
              </li>

              <li>
                <Link
                  href="/services/design"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Graphic Design
                </Link>
              </li>

              <li>
                <Link
                  href="/services/online"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Online Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">

              {/* Phone */}
              <a
                href={`tel:${phoneNumber}`}
                className="group flex items-start gap-3"
              >
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-slate-300 transition-colors group-hover:text-white">
                    {contactInfo.phone}
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-sm text-slate-300 transition-colors group-hover:text-white">
                    Chat With Us
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-start gap-3"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-slate-300 transition-colors group-hover:text-white">
                    {contactInfo.email}
                  </p>
                </div>
              </a>

              {/* Location */}
              <a
                href={contactInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-300 transition-colors group-hover:text-white">
                    {contactInfo.address.line1}
                    <br />
                    {contactInfo.address.line2},{" "}
                    {contactInfo.address.city}
                  </p>
                </div>
              </a>

            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="mt-14 border-t border-slate-800 pt-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Opening Hours
                </h3>

                <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:gap-6">
                  {contactInfo.openingHours.map((item) => (
                    <div key={item.day}>
                      <span className="font-medium text-slate-300">
                        {item.day}:
                      </span>{" "}
                      {item.hours}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
            >
              Contact Dove Print Solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Dove Print Solutions. All Rights Reserved.
          </p>

          <div className="flex items-center justify-center gap-5 text-sm text-slate-500 md:justify-end">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <span className="text-slate-700">|</span>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
