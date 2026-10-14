"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X, MapPin, Phone, ArrowUpRight } from "lucide-react";

import { contactInfo } from "@/app/data/contact";

const serviceLinks = [
  { label: "All Services", href: "/services" },
  { label: "Printing Services", href: "/services/printing" },
  { label: "Document Services", href: "/services/documents" },
  { label: "Online Services", href: "/services/online" },
  { label: "Graphic Design", href: "/services/design" },
  { label: "Scanning Services", href: "/services/scanning" },
  { label: "Photocopying", href: "/services/photocopying" },
  { label: "Binding & Lamination", href: "/services/binding" },
  { label: "Computer Services", href: "/services/computers" },
];

const navLinkClass =
  "text-sm font-semibold text-gray-600 transition-colors duration-200 hover:text-blue-700";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const phoneNumber = contactInfo.phone.replace(/\s/g, "");

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white font-montserrat">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center"
          aria-label="Dove Print Solutions Home"
        >
          <Image
            src="/images/dove-logo.png"
            alt="Dove Print Solutions"
            width={1172}
            height={739}
            className="h-12 w-auto object-contain sm:h-14"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="group relative">
            <Link
              href="/services"
              className={`${navLinkClass} inline-flex items-center gap-1.5 py-7`}
            >
              Services
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            <div className="invisible absolute left-0 top-full z-50 w-64 translate-y-2 border border-gray-200 bg-white opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                  What we offer
                </p>
              </div>

              {serviceLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="flex items-center justify-between border-b border-gray-100 px-4 py-3 text-sm font-medium text-gray-600 transition-colors last:border-b-0 hover:bg-gray-50 hover:text-blue-700"
                >
                  {service.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          <Link href="/pricing" className={navLinkClass}>
            Pricing
          </Link>

          <Link href="/about" className={navLinkClass}>
            About Us
          </Link>

          <Link href="/location" className={navLinkClass}>
            Location
          </Link>

          <Link href="/contact" className={navLinkClass}>
            Contact
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href={`tel:${phoneNumber}`}
            className="inline-flex items-center gap-2 bg-blue-700 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-800"
          >
            <Phone className="h-4 w-4" />
            Get in Touch
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-gray-200 bg-white lg:hidden"
        >
          <div className="max-h-[calc(100dvh-76px)] overflow-y-auto px-5 pb-6 sm:px-6">
            {/* Main Links */}
            <div className="border-b border-gray-200 py-2">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="block py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
              >
                Home
              </Link>

              {/* Services Accordion */}
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                className="flex w-full items-center justify-between py-3.5 text-left text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="mb-3 ml-3 border-l-2 border-blue-700 pl-4">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-sm text-gray-500 transition-colors hover:text-blue-700"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/pricing"
                onClick={closeMobileMenu}
                className="block py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
              >
                Pricing
              </Link>

              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="block py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
              >
                About Us
              </Link>

              <Link
                href="/location"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
              >
                <MapPin className="h-4 w-4" />
                Location
              </Link>

              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="block py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:text-blue-700"
              >
                Contact
              </Link>
            </div>

            {/* Mobile CTA */}
            <div className="pt-5">
              <a
                href={`tel:${phoneNumber}`}
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 bg-blue-700 px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-800"
              >
                <Phone className="h-4 w-4" />
                Call Dove Print Solutions
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <p className="mt-3 text-center text-xs text-gray-400">
                Need help with a print or design project?
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}