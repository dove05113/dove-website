"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Building2,
  Check,
  Clock3,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
} from "lucide-react";

import {
  getBusinessInformation,
  updateBusinessInformation,
  type BusinessInformation,
} from "@/lib/business";

const emptyBusinessInformation: BusinessInformation = {
  name: "Dove Print Solutions",
  tagline: "",
  description: "",

  phone: "",
  email: "",
  whatsapp: "",

  address: "",
  location: "",

  openingHours: {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },

  logoUrl: "",
  faviconUrl: "",

  googleMapsUrl: "",
  latitude: 0,
  longitude: 0,

  facebookUrl: "",
  instagramUrl: "",
  tiktokUrl: "",
  whatsappUrl: "",
};

const days: {
  key: keyof BusinessInformation["openingHours"];
  label: string;
}[] = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

export default function BusinessPage() {
  const [form, setForm] = useState<BusinessInformation>(
    emptyBusinessInformation,
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function loadBusinessInformation() {
    try {
      setLoading(true);
      setError("");

      const data = await getBusinessInformation();

      if (data) {
        setForm({
          ...emptyBusinessInformation,
          ...data,
          openingHours: {
            ...emptyBusinessInformation.openingHours,
            ...data.openingHours,
          },
        });
      }
    } catch (error) {
      console.error("Failed to load business information:", error);
      setError("Failed to load business information.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBusinessInformation();
  }, []);

  function handleChange(field: keyof BusinessInformation, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSuccess(false);
  }

  function handleOpeningHoursChange(
    day: keyof BusinessInformation["openingHours"],
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      openingHours: {
        ...current.openingHours,
        [day]: value,
      },
    }));

    setSuccess(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess(false);
    setSaving(true);

    try {
      await updateBusinessInformation({
        ...form,
        name: form.name.trim(),
        tagline: form.tagline.trim(),
        description: form.description.trim(),

        phone: form.phone.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim(),

        address: form.address.trim(),
        location: form.location.trim(),

        logoUrl: form.logoUrl.trim(),
        faviconUrl: form.faviconUrl.trim(),

        googleMapsUrl: form.googleMapsUrl.trim(),
        latitude: form.latitude,
        longitude: form.longitude,

        facebookUrl: form.facebookUrl.trim(),
        instagramUrl: form.instagramUrl.trim(),
        tiktokUrl: form.tiktokUrl.trim(),
        whatsappUrl: form.whatsappUrl.trim(),
      });

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to save business information:", error);
      setError("Failed to save business information.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="space-y-6">
        <div>
          <div className="h-8 w-56 animate-pulse bg-gray-100" />

          <div className="mt-2 h-4 w-80 animate-pulse bg-gray-100" />
        </div>

        <div className="h-[500px] animate-pulse border border-gray-200 bg-gray-50" />
      </main>
    );
  }

  return (
    <main className="bg-white pb-12 text-gray-950 min-w-7xl sm:mx-auto sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-6 border-b border-gray-300 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 flex h-10 w-10 items-center justify-center bg-gray-950 text-white">
            <Building2 size={18} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
            Business information
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
            Manage the business details displayed throughout the website.
          </p>
        </div>

        <button
          type="submit"
          form="business-form"
          disabled={saving}
          className="inline-flex h-11 items-center justify-center gap-2 bg-gray-950 px-5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            "Saving..."
          ) : success ? (
            <>
              <Check size={16} />
              Saved
            </>
          ) : (
            <>
              <Save size={16} />
              Save changes
            </>
          )}
        </button>
      </div>

      <form
        id="business-form"
        onSubmit={handleSubmit}
        className="mt-8 space-y-8"
      >
        {/* Business details */}
        <section className="border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-50 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-gray-950 text-white">
                <Building2 size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-950">
                  Business details
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Basic information about your business.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Business name
              </label>

              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
                required
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="Dove Print Solutions"
              />
            </div>

            <div>
              <label
                htmlFor="tagline"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Tagline
              </label>

              <input
                id="tagline"
                type="text"
                value={form.tagline}
                onChange={(event) =>
                  handleChange("tagline", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="Your printing & digital solutions partner"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Business description
              </label>

              <textarea
                id="description"
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                rows={5}
                className="w-full resize-y border border-gray-300 bg-gray-50 px-3 py-3 text-sm leading-6 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="Describe your business and the services you provide..."
              />

              <p className="mt-2 text-xs leading-5 text-gray-500">
                This can be used on the homepage, about section and SEO
                metadata.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-50 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-gray-950 text-white">
                <Phone size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-950">
                  Contact information
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Contact details customers can use to reach the business.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Phone number
              </label>

              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  className="h-11 w-full border border-gray-300 bg-gray-50 pl-9 pr-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  className="h-11 w-full border border-gray-300 bg-gray-50 pl-9 pr-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="whatsapp"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                WhatsApp number
              </label>

              <input
                id="whatsapp"
                type="tel"
                value={form.whatsapp}
                onChange={(event) =>
                  handleChange("whatsapp", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="+254 700 000 000"
              />
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-50 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-gray-950 text-white">
                <MapPin size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-950">
                  Location
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Where customers can find the business.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Address
              </label>

              <input
                id="address"
                type="text"
                value={form.address}
                onChange={(event) =>
                  handleChange("address", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="Street, building or landmark"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="location"
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    handleChange("location", event.target.value)
                  }
                  className="h-11 w-full border border-gray-300 bg-gray-50 pl-9 pr-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                  placeholder="Nairobi, Kenya"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Opening hours */}
        <section className="border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-50 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-gray-950 text-white">
                <Clock3 size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-950">
                  Opening hours
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Set the hours displayed on the website.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {days.map((day) => (
              <div
                key={day.key}
                className="grid items-center gap-3 px-5 py-4 sm:grid-cols-[160px_1fr] sm:px-6"
              >
                <label
                  htmlFor={day.key}
                  className="text-sm font-semibold text-gray-900"
                >
                  {day.label}
                </label>

                <input
                  id={day.key}
                  type="text"
                  value={form.openingHours[day.key]}
                  onChange={(event) =>
                    handleOpeningHoursChange(day.key, event.target.value)
                  }
                  className="h-10 w-full max-w-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                  placeholder="8:00 AM – 6:00 PM"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Map coordinates */}
        <section className="border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-50 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-gray-950 text-white">
                <MapPin size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-950">
                  Google Maps
                </h2>
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Add a map link and coordinates for your business location.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="googleMapsUrl"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Google Maps URL
              </label>
              <input
                id="googleMapsUrl"
                type="url"
                value={form.googleMapsUrl}
                onChange={(event) =>
                  handleChange("googleMapsUrl", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="https://maps.google.com/..."
              />
            </div>

            <div>
              <label
                htmlFor="latitude"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Latitude
              </label>
              <input
                id="latitude"
                type="number"
                step="any"
                value={form.latitude}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    latitude:
                      event.target.value === ""
                        ? 0
                        : Number(event.target.value),
                  }));
                  setSuccess(false);
                }}
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="-1.2921"
              />
            </div>

            <div>
              <label
                htmlFor="longitude"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Longitude
              </label>
              <input
                id="longitude"
                type="number"
                step="any"
                value={form.longitude}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    longitude:
                      event.target.value === ""
                        ? 0
                        : Number(event.target.value),
                  }));
                  setSuccess(false);
                }}
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="36.8219"
              />
            </div>
          </div>
        </section>

        {/* Branding */}
        <section className="border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-50 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-gray-950 text-white">
                <Globe size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-950">
                  Branding & social
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Logo and social media links used across the website.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <label
                htmlFor="logoUrl"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Logo URL
              </label>

              <input
                id="logoUrl"
                type="url"
                value={form.logoUrl}
                onChange={(event) =>
                  handleChange("logoUrl", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="https://..."
              />

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Image uploads can be connected to Firebase Storage later.
              </p>
            </div>

            <div>
              <label
                htmlFor="faviconUrl"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Favicon URL
              </label>

              <input
                id="faviconUrl"
                type="url"
                value={form.faviconUrl}
                onChange={(event) =>
                  handleChange("faviconUrl", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="https://..."
              />
            </div>

            <div>
              <label
                htmlFor="facebookUrl"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Facebook
              </label>

              <input
                id="facebookUrl"
                type="url"
                value={form.facebookUrl}
                onChange={(event) =>
                  handleChange("facebookUrl", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label
                htmlFor="instagramUrl"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Instagram
              </label>

              <input
                id="instagramUrl"
                type="url"
                value={form.instagramUrl}
                onChange={(event) =>
                  handleChange("instagramUrl", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label
                htmlFor="tiktokUrl"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                TikTok
              </label>

              <input
                id="tiktokUrl"
                type="url"
                value={form.tiktokUrl}
                onChange={(event) =>
                  handleChange("tiktokUrl", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="https://tiktok.com/@..."
              />
            </div>

            <div>
              <label
                htmlFor="whatsappUrl"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                WhatsApp link
              </label>

              <input
                id="whatsappUrl"
                type="url"
                value={form.whatsappUrl}
                onChange={(event) =>
                  handleChange("whatsappUrl", event.target.value)
                }
                className="h-11 w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
                placeholder="https://wa.me/..."
              />
            </div>
          </div>
        </section>

        {/* Bottom save */}
        <div className="flex flex-col-reverse gap-4 border-t border-gray-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Changes are saved directly to your website content.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center justify-center gap-2 bg-gray-950 px-5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              "Saving..."
            ) : success ? (
              <>
                <Check size={16} />
                Changes saved
              </>
            ) : (
              <>
                <Save size={16} />
                Save changes
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {error}
          </div>
        )}
      </form>
    </main>
  );
}
