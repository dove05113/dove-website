"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0"
          aria-label="Dove Print Solutions"
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

          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-700"
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 transition hover:text-blue-700">
              Services
              <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
            </button>

            <div className="invisible absolute left-0 top-full mt-3 w-64 rounded-xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">

              <Link
                href="/services/printing"
                className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-700"
              >
                Printing & Photocopy
              </Link>

              <Link
                href="/services/online-services"
                className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-700"
              >
                Online Government Services
              </Link>

              <Link
                href="/services/cv"
                className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-700"
              >
                CV & Document Services
              </Link>

              <Link
                href="/services/scanning"
                className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-700"
              >
                Scanning & Lamination
              </Link>

              <Link
                href="/services"
                className="mt-1 block rounded-lg border-t px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                View All Services →
              </Link>
            </div>
          </div>

          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-700"
          >
            Pricing
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-700"
          >
            About Us
          </Link>

          <Link
            href="/track-request"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-700"
          >
            Track Request
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-700"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            href="/get-started"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle menu"
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
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">

            <Link
              href="/"
              className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/services"
              className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>

            <Link
              href="/pricing"
              className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>

            <Link
              href="/about"
              className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              About Us
            </Link>

            <Link
              href="/track-request"
              className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Track Request
            </Link>

            <Link
              href="/contact"
              className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>

            <div className="mt-3 border-t border-gray-100 pt-3">
              <Link
                href="/login"
                className="block rounded-lg px-4 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/get-started"
                className="mt-2 block rounded-lg bg-blue-700 px-4 py-3 text-center font-semibold text-white hover:bg-blue-800"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}