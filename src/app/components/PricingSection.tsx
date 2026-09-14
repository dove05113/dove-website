import Link from "next/link";
import {
  ArrowRight,
  Check,
  Printer,
  Copy,
  Palette,
  FileText,
  BookOpen,
  ScanLine,
} from "lucide-react";
import { pricingItems } from "@/app/data/pricing";
const icons = [Printer, Palette, Copy, BookOpen, FileText, ScanLine];
export default function PricingSection() {
  return (
    <section className="w-full bg-white py-20 sm:py-24 lg:py-28">
      {" "}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {" "}
        {/* ===================================================== SECTION HEADER ====================================================== */}{" "}
        <div className="mx-auto max-w-3xl text-center">
          {" "}
          {/* Label */}{" "}
          <div className="mb-4 flex items-center justify-center gap-3">
            {" "}
            <span className="h-px w-8 bg-blue-700" />{" "}
            <span className="text-sm font-bold tracking-[0.18em] text-blue-700">
              {" "}
              SIMPLE & TRANSPARENT{" "}
            </span>{" "}
            <span className="h-px w-8 bg-blue-700" />{" "}
          </div>{" "}
          {/* Heading */}{" "}
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {" "}
            Popular Services & Prices{" "}
          </h2>{" "}
          {/* Description */}{" "}
          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {" "}
            Quality services at competitive prices. Here are some of our popular
            services to give you an idea of what to expect.{" "}
          </p>{" "}
        </div>{" "}
        {/* ===================================================== PRICING CARDS ====================================================== */}{" "}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {" "}
          {pricingItems.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-7"
              >
                {" "}
                {/* Decorative circle */}{" "}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50 transition-transform duration-500 group-hover:scale-150" />{" "}
                {/* Icon */}{" "}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-all duration-300 group-hover:bg-blue-700 group-hover:text-white">
                  {" "}
                  <Icon className="h-6 w-6" />{" "}
                </div>{" "}
                {/* Service name */}{" "}
                <h3 className="relative mt-6 text-lg font-bold text-gray-900">
                  {" "}
                  {item.service}{" "}
                </h3>{" "}
                {/* Description */}{" "}
                <p className="relative mt-2 min-h-[48px] text-sm leading-6 text-gray-600">
                  {" "}
                  {item.description}{" "}
                </p>{" "}
                {/* Divider */} <div className="my-5 h-px bg-gray-100" />{" "}
                {/* Price */}{" "}
                <div className="relative flex items-end justify-between gap-4">
                  {" "}
                  <div>
                    {" "}
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {" "}
                      Starting from{" "}
                    </p>{" "}
                    <p className="mt-1 text-2xl font-bold text-blue-700">
                      {" "}
                      {item.price}{" "}
                    </p>{" "}
                  </div>{" "}
                  <span className="pb-1 text-xs text-gray-500">
                    {" "}
                    {item.unit}{" "}
                  </span>{" "}
                </div>{" "}
              </div>
            );
          })}{" "}
        </div>{" "}
        {/* ===================================================== PRICE NOTE ====================================================== */}{" "}
        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
          {" "}
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />{" "}
          <p>
            {" "}
            Prices shown are indicative starting prices. Final pricing may vary
            depending on document size, quantity, material and
            requirements.{" "}
          </p>{" "}
        </div>{" "}
        {/* ===================================================== CTA ====================================================== */}{" "}
        <div className="mt-10 text-center">
          {" "}
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg"
          >
            {" "}
            View Full Price List{" "}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
