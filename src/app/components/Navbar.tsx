"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X, MapPin, Phone } from "lucide-react";

import { contactInfo } from "@/app/data/contact";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const phoneNumber = contactInfo.phone.replace(/\s/g, "");

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Dove Print Solutions Home"
        >
          <Image
            src="/images/dove-logo.png"
            alt="Dove Print Solutions"
            width={1172}
            height={739}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">

          {/* Home */}
          <Link
            href="/"
            className="text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
              aria-haspopup="true"
            >
              Services
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>

            {/* Dropdown */}
            <div className="invisible absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">

              <Link
                href="/services/printing"
                className="group/item flex items-center rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover/item:text-blue-700">
                    Printing Services
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Black & white and colour printing
                  </p>
                </div>
              </Link>

              <Link
                href="/services/documents"
                className="group/item flex items-center rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover/item:text-blue-700">
                    Document Services
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Typing, CVs, editing & formatting
                  </p>
                </div>
              </Link>

              <Link
                href="/services/online"
                className="group/item flex items-center rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover/item:text-blue-700">
                    Online Services
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    eCitizen, KRA & digital services
                  </p>
                </div>
              </Link>

              <Link
                href="/services/design"
                className="group/item flex items-center rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover/item:text-blue-700">
                    Graphic Design
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Posters, flyers & business branding
                  </p>
                </div>
              </Link>

              <Link
                href="/services/scanning"
                className="group/item flex items-center rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover/item:text-blue-700">
                    Scanning Services
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Physical documents to digital files
                  </p>
                </div>
              </Link>

              <Link
                href="/services/photocopying"
                className="group/item flex items-center rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover/item:text-blue-700">
                    Photocopying
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Fast and affordable photocopying
                  </p>
                </div>
              </Link>

              <Link
                href="/services/binding"
                className="group/item flex items-center rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover/item:text-blue-700">
                    Binding & Lamination
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Protect and present your documents
                  </p>
                </div>
              </Link>

              <Link
                href="/services/computers"
                className="group/item flex items-center rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover/item:text-blue-700">
                    Computer Services
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Computer access & digital assistance
                  </p>
                </div>
              </Link>

              {/* View All */}
              <div className="mt-1 border-t border-gray-100 pt-2">
                <Link
                  href="/services"
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
                >
                  View All Services
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <Link
            href="/pricing"
            className="text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
          >
            Pricing
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
          >
            About Us
          </Link>

          {/* Location */}
          <Link
            href="/location"
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
          >
            <MapPin className="h-4 w-4" />
            Location
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className="text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center lg:flex">
          <a
            href={`tel:${phoneNumber}`}
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-blue-800 hover:shadow-lg"
          >
            <Phone className="h-4 w-4 transition-transform group-hover:scale-110" />
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2.5 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white shadow-xl lg:hidden">
          <div className="max-h-[calc(100vh-80px)] overflow-y-auto px-4 py-5 sm:px-6">

            {/* Home */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block rounded-xl px-4 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              Home
            </Link>

            {/* Services Heading */}
            <div className="mt-1">
              <p className="px-4 pb-2 pt-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                Services
              </p>

              <Link
                href="/services"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
              >
                All Services
              </Link>

              <Link
                href="/services/printing"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700"
              >
                Printing Services
              </Link>

              <Link
                href="/services/documents"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700"
              >
                Document Services
              </Link>

              <Link
                href="/services/online"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700"
              >
                Online Services
              </Link>

              <Link
                href="/services/design"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700"
              >
                Graphic Design
              </Link>

              <Link
                href="/services/scanning"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700"
              >
                Scanning Services
              </Link>

              <Link
                href="/services/photocopying"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700"
              >
                Photocopying
              </Link>

              <Link
                href="/services/binding"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700"
              >
                Binding & Lamination
              </Link>

              <Link
                href="/services/computers"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700"
              >
                Computer Services
              </Link>
            </div>

            {/* Other Pages */}
            <div className="mt-3 border-t border-gray-100 pt-3">

              <Link
                href="/pricing"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                Pricing
              </Link>

              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                About Us
              </Link>

              <Link
                href="/location"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 rounded-xl px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <MapPin className="h-4 w-4" />
                Location
              </Link>

              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                Contact
              </Link>
            </div>

            {/* Mobile CTA */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <a
                href={`tel:${phoneNumber}`}
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3.5 text-center font-bold text-white transition-colors hover:bg-blue-800"
              >
                <Phone className="h-5 w-5" />
                Call Dove Print Solutions
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
