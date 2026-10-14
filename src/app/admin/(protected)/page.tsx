"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  Globe2,
  Image,
  LogOut,
  Monitor,
  Settings2,
  Tag,
} from "lucide-react";
import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase-auth";
import { useAuth } from "@/lib/use-auth";
import { BusinessInformation } from "@/types/business-info";

const sections = [
  {
    title: "Services",
    description: "Manage the services and pricing displayed on the website.",
    href: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "Business information",
    description: "Update contact details, location and other business details.",
    href: "/admin/business",
    icon: Globe2,
  },
];

export default function AdminPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-black" />
          Loading dashboard
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  async function handleLogout() {
    await signOut(auth);

    router.replace("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        {/* Top bar */}
        <header className="flex flex-col gap-6 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
              <Monitor className="h-3.5 w-3.5" />
              Dove Print Solutions
              <span className="text-neutral-300">/</span>
              Admin
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-xl text-[15px] leading-6 text-neutral-500">
              Manage the information, services and content that appear on your
              website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden border-l border-neutral-200 pl-4 sm:block">
              <p className="text-xs text-neutral-400">Signed in as</p>
              <p className="mt-1 max-w-[220px] truncate text-sm font-medium">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Overview */}
        <section className="grid gap-px overflow-hidden border-x border-b border-neutral-200 bg-neutral-200 sm:grid-cols-2">
          <div className="bg-[#f7f7f5] p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
                Status
              </span>

              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Online
              </span>
            </div>

            <p className="text-2xl font-semibold tracking-tight">Website CMS</p>

            <p className="mt-1 text-sm text-neutral-500">
              Content management system
            </p>
          </div>

          <div className="bg-[#f7f7f5] p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
                Access
              </span>

              <Settings2 className="h-4 w-4 text-neutral-400" />
            </div>

            <p className="text-2xl font-semibold tracking-tight">
              Administrator
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Authenticated access
            </p>
          </div>

        </section>

        {/* Management */}
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
                Management
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Website controls
              </h2>
            </div>

            <p className="hidden text-sm text-neutral-400 sm:block">
              Choose an area to manage
            </p>
          </div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  key={section.href}
                  type="button"
                  onClick={() => router.push(section.href)}
                  className="group flex w-full items-center gap-5 py-6 text-left transition hover:bg-white"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-neutral-200 bg-white transition group-hover:border-neutral-300 group-hover:shadow-sm">
                    <Icon className="h-5 w-5 text-neutral-700" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{section.title}</h3>

                      <ArrowUpRight className="h-3.5 w-3.5 text-neutral-300 transition group-hover:text-neutral-700" />
                    </div>

                    <p className="mt-1 max-w-2xl text-sm leading-5 text-neutral-500">
                      {section.description}
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-neutral-300 transition group-hover:translate-x-1 group-hover:text-neutral-700" />
                </button>
              );
            })}
          </div>
        </section>

        {/* Quick actions */}
        <section className="mt-12 grid gap-8 border-t border-neutral-200 pt-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
              Quick actions
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              Frequently used areas of the CMS.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => router.push("/admin/services")}
              className="inline-flex items-center gap-2 rounded-md bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              Manage services
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/business")}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              <Globe2 className="h-4 w-4" />
              Business information
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 flex flex-col gap-2 border-t border-neutral-200 pt-5 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Dove Print Solutions CMS</p>

          <p>Administrator panel</p>
        </footer>
      </div>
    </main>
  );
}
