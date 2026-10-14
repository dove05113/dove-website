"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  CirclePlus,
  Image as ImageIcon,
  Pencil,
  Plus,
  Settings2,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "@/lib/services";

type PricingOption = {
  name: string;
  price: number;
  unit: string;
};

type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  group: "cyber" | "design";
  category: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  pricing: PricingOption[];
  pricingType: "fixed" | "custom";
  createdAt?: Date;
  updatedAt?: Date;
};

type ModalType = "create" | "edit" | "delete" | null;

type ServiceForm = {
  name: string;
  description: string;
  group: "cyber" | "design";
  category: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  sortOrder: string;
  pricingType: "fixed" | "custom";
  pricing: PricingOption[];
};

const serviceGroups = {
  cyber: {
    name: "Cyber Services",
    shortName: "Cyber",
    categories: [
      {
        id: "documents",
        name: "Document Services",
      },
      {
        id: "online",
        name: "Online Services",
      },
      {
        id: "computer",
        name: "Computer Services",
      },
    ],
  },

  design: {
    name: "Design & Branding",
    shortName: "Design",
    categories: [
      {
        id: "graphic-design",
        name: "Graphic Design",
      },
      {
        id: "photography",
        name: "Photography & Photos",
      },
      {
        id: "branding",
        name: "Branding",
      },
    ],
  },
};

const emptyPricingOption = (): PricingOption => ({
  name: "",
  price: 0,
  unit: "",
});

const emptyForm: ServiceForm = {
  name: "",
  description: "",
  group: "cyber",
  category: "documents",
  imageUrl: "",
  featured: false,
  active: true,
  sortOrder: "0",
  pricingType: "fixed",
  pricing: [emptyPricingOption()],
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState<ModalType>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(
    null,
  );

  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadServices() {
    try {
      setLoading(true);

      const data = await getServices();

      setServices(data as Service[]);
    } catch (error) {
      console.error("Failed to load services:", error);
      setError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  function closeModal() {
    if (saving) return;

    setModal(null);
    setSelectedService(null);
    setForm(emptyForm);
    setError("");
  }

  function openCreateModal() {
    setSelectedService(null);

    setForm({
      ...emptyForm,
      pricing: [emptyPricingOption()],
    });

    setError("");
    setModal("create");
  }

  function openEditModal(service: Service) {
    setSelectedService(service);

    setForm({
      name: service.name,
      description: service.description,
      group: service.group,
      category: service.category,
      imageUrl: service.imageUrl,
      featured: service.featured,
      active: service.active,
      sortOrder: String(service.sortOrder),
      pricingType: service.pricingType,
      pricing:
        service.pricing.length > 0
          ? service.pricing.map((option) => ({
              name: option.name,
              price: option.price,
              unit: option.unit,
            }))
          : [emptyPricingOption()],
    });

    setError("");
    setModal("edit");
  }

  function openDeleteModal(service: Service) {
    setSelectedService(service);
    setError("");
    setModal("delete");
  }

  function handleChange<K extends keyof ServiceForm>(
    field: K,
    value: ServiceForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleGroupChange(group: "cyber" | "design") {
    const firstCategory = serviceGroups[group].categories[0].id;

    setForm((current) => ({
      ...current,
      group,
      category: firstCategory,
    }));
  }

  function handlePricingChange(
    index: number,
    field: keyof PricingOption,
    value: string,
  ) {
    setForm((current) => {
      const pricing = [...current.pricing];

      pricing[index] = {
        ...pricing[index],
        [field]: field === "price" ? Number(value) : value,
      };

      return {
        ...current,
        pricing,
      };
    });
  }

  function addPricingOption() {
    setForm((current) => ({
      ...current,
      pricing: [...current.pricing, emptyPricingOption()],
    }));
  }

  function removePricingOption(index: number) {
    setForm((current) => {
      if (current.pricing.length === 1) {
        return current;
      }

      return {
        ...current,
        pricing: current.pricing.filter((_, i) => i !== index),
      };
    });
  }

  function getPricingData() {
    return form.pricingType === "fixed"
      ? form.pricing
          .filter(
            (option) =>
              option.name.trim() !== "" && option.unit.trim() !== "",
          )
          .map((option) => ({
            name: option.name.trim(),
            price: Number(option.price),
            unit: option.unit.trim(),
          }))
      : [];
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      await createService({
        name: form.name.trim(),
        slug: createSlug(form.name),
        description: form.description.trim(),
        group: form.group,
        category: form.category,
        imageUrl: form.imageUrl.trim(),
        featured: form.featured,
        active: form.active,
        sortOrder: Number(form.sortOrder),
        pricingType: form.pricingType,
        pricing: getPricingData(),
      });

      await loadServices();
      closeModal();
    } catch (error) {
      console.error("Failed to create service:", error);
      setError("Failed to create service.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedService) return;

    setError("");
    setSaving(true);

    try {
      await updateService(selectedService.id, {
        name: form.name.trim(),
        slug: createSlug(form.name),
        description: form.description.trim(),
        group: form.group,
        category: form.category,
        imageUrl: form.imageUrl.trim(),
        featured: form.featured,
        active: form.active,
        sortOrder: Number(form.sortOrder),
        pricingType: form.pricingType,
        pricing: getPricingData(),
      });

      await loadServices();
      closeModal();
    } catch (error) {
      console.error("Failed to update service:", error);
      setError("Failed to update service.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedService) return;

    setError("");
    setSaving(true);

    try {
      await deleteService(selectedService.id);

      await loadServices();
      closeModal();
    } catch (error) {
      console.error("Failed to delete service:", error);
      setError("Failed to delete service.");
    } finally {
      setSaving(false);
    }
  }

  function getGroupName(group: Service["group"]) {
    return serviceGroups[group].name;
  }

  function getCategoryName(group: Service["group"], categoryId: string) {
    return (
      serviceGroups[group].categories.find(
        (category) => category.id === categoryId,
      )?.name ?? categoryId
    );
  }

  const activeCount = services.filter((service) => service.active).length;
  const featuredCount = services.filter((service) => service.featured).length;

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        {/* Header */}
        <header className="flex flex-col gap-6 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Content
              <ChevronRight className="h-3 w-3" />
              Services
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Services
            </h1>

            <p className="mt-3 max-w-xl text-[15px] leading-6 text-neutral-500">
              Manage the services, categories and pricing displayed on the
              website.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex w-fit items-center gap-2 rounded-md bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <Plus className="h-4 w-4" />
            Add service
          </button>
        </header>

        {/* Overview */}
        <section className="grid gap-px overflow-hidden border-x border-b border-neutral-200 bg-neutral-200 sm:grid-cols-3">
          <div className="bg-[#f7f7f5] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
              Total services
            </p>

            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-[-0.04em]">
                {services.length}
              </span>

              <BriefcaseBusiness className="mb-1 h-5 w-5 text-neutral-300" />
            </div>
          </div>

          <div className="bg-[#f7f7f5] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
              Active
            </p>

            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-[-0.04em]">
                {activeCount}
              </span>

              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Visible
              </span>
            </div>
          </div>

          <div className="bg-[#f7f7f5] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
              Featured
            </p>

            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-[-0.04em]">
                {featuredCount}
              </span>

              <Star className="mb-1 h-5 w-5 text-neutral-300" />
            </div>
          </div>
        </section>

        {/* Service list */}
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
                Catalogue
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                All services
              </h2>
            </div>

            {!loading && services.length > 0 && (
              <p className="hidden text-sm text-neutral-400 sm:block">
                {services.length}{" "}
                {services.length === 1 ? "service" : "services"}
              </p>
            )}
          </div>

          {loading ? (
            <div className="border-y border-neutral-200 py-16 text-center">
              <div className="mx-auto flex w-fit items-center gap-3 text-sm text-neutral-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-400" />
                Loading services
              </div>
            </div>
          ) : services.length === 0 ? (
            <div className="border-y border-neutral-200 py-20 text-center">
              <BriefcaseBusiness className="mx-auto h-8 w-8 text-neutral-300" />

              <h3 className="mt-4 font-medium">No services yet</h3>

              <p className="mt-1 text-sm text-neutral-500">
                Add your first service to start building the catalogue.
              </p>

              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white"
              >
                <Plus className="h-4 w-4" />
                Add service
              </button>
            </div>
          ) : (
            <div className="border-y border-neutral-200">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col gap-5 border-b border-neutral-200 py-6 last:border-b-0 lg:flex-row lg:items-center lg:justify-between"
                >
                  {/* Service information */}
                  <div className="flex min-w-0 gap-4">
                    {/* Image */}
                    <div className="hidden h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-neutral-200 bg-white sm:flex">
                      {service.imageUrl ? (
                        <img
                          src={service.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-neutral-300" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium">{service.name}</h3>

                        <span
                          className={`inline-flex items-center gap-1.5 text-xs ${
                            service.active
                              ? "text-emerald-700"
                              : "text-neutral-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              service.active
                                ? "bg-emerald-500"
                                : "bg-neutral-300"
                            }`}
                          />

                          {service.active ? "Active" : "Hidden"}
                        </span>

                        {service.featured && (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-700">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs font-medium text-neutral-400">
                        {getGroupName(service.group)}
                        <span className="mx-1.5 text-neutral-300">/</span>
                        {getCategoryName(service.group, service.category)}
                      </p>

                      {service.description && (
                        <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-5 text-neutral-500">
                          {service.description}
                        </p>
                      )}

                      {/* Pricing */}
                      <div className="mt-3">
                        {service.pricingType === "custom" ? (
                          <span className="text-sm font-medium text-neutral-700">
                            Pricing available on request
                          </span>
                        ) : service.pricing.length > 0 ? (
                          <div className="flex flex-wrap gap-x-5 gap-y-1">
                            {service.pricing.map((option, index) => (
                              <span
                                key={index}
                                className="text-sm text-neutral-600"
                              >
                                <span className="font-medium text-neutral-900">
                                  {option.name}
                                </span>{" "}
                                · KES {option.price.toLocaleString()} /{" "}
                                {option.unit}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-neutral-400">
                            No pricing options
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2 lg:pl-6">
                    <button
                      type="button"
                      onClick={() => openEditModal(service)}
                      className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium transition hover:border-neutral-300 hover:bg-neutral-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => openDeleteModal(service)}
                      className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-red-600 transition hover:border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Create / Edit Modal */}
        {(modal === "create" || modal === "edit") && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl">
              {/* Modal header */}
              <div className="flex items-start justify-between border-b border-neutral-200 px-6 py-5">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
                    <Settings2 className="h-3.5 w-3.5" />
                    Service
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight">
                    {modal === "create" ? "Add service" : "Edit service"}
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    {modal === "create"
                      ? "Create a service for the website catalogue."
                      : "Update the information and pricing for this service."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  aria-label="Close modal"
                  className="rounded-md p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-40"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal body */}
              <div className="overflow-y-auto">
                <form
                  onSubmit={modal === "create" ? handleCreate : handleUpdate}
                >
                  <div className="space-y-8 p-6">
                    {/* Basic information */}
                    <section>
                      <div className="mb-4 border-b border-neutral-100 pb-3">
                        <h3 className="text-sm font-semibold">
                          Basic information
                        </h3>

                        <p className="mt-1 text-xs text-neutral-400">
                          The core information customers will see.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium">
                            Service name
                          </label>

                          <input
                            type="text"
                            value={form.name}
                            onChange={(event) =>
                              handleChange("name", event.target.value)
                            }
                            required
                            placeholder="e.g. Printing"
                            className="w-full border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-neutral-300 focus:border-neutral-500"
                          />

                          {form.name && (
                            <p className="mt-1.5 text-xs text-neutral-400">
                              URL slug:{" "}
                              <span className="font-mono">
                                {createSlug(form.name)}
                              </span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium">
                            Description
                          </label>

                          <textarea
                            value={form.description}
                            onChange={(event) =>
                              handleChange(
                                "description",
                                event.target.value,
                              )
                            }
                            rows={3}
                            placeholder="Describe this service..."
                            className="w-full resize-none border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-neutral-300 focus:border-neutral-500"
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium">
                              Service group
                            </label>

                            <div className="relative">
                              <select
                                value={form.group}
                                onChange={(event) =>
                                  handleGroupChange(
                                    event.target.value as
                                      | "cyber"
                                      | "design",
                                  )
                                }
                                className="w-full appearance-none border border-neutral-200 bg-white px-3.5 py-2.5 pr-9 text-sm outline-none focus:border-neutral-500"
                              >
                                <option value="cyber">
                                  Cyber Services
                                </option>
                                <option value="design">
                                  Design & Branding
                                </option>
                              </select>

                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            </div>
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-medium">
                              Category
                            </label>

                            <div className="relative">
                              <select
                                value={form.category}
                                onChange={(event) =>
                                  handleChange(
                                    "category",
                                    event.target.value,
                                  )
                                }
                                className="w-full appearance-none border border-neutral-200 bg-white px-3.5 py-2.5 pr-9 text-sm outline-none focus:border-neutral-500"
                              >
                                {serviceGroups[form.group].categories.map(
                                  (category) => (
                                    <option
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </option>
                                  ),
                                )}
                              </select>

                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Pricing */}
                    <section>
                      <div className="mb-4 border-b border-neutral-100 pb-3">
                        <h3 className="text-sm font-semibold">Pricing</h3>

                        <p className="mt-1 text-xs text-neutral-400">
                          Define how this service is charged.
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="grid gap-2 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleChange("pricingType", "fixed")
                            }
                            className={`border p-4 text-left transition ${
                              form.pricingType === "fixed"
                                ? "border-neutral-950 bg-neutral-950 text-white"
                                : "border-neutral-200 bg-white hover:border-neutral-300"
                            }`}
                          >
                            <p className="text-sm font-medium">
                              Fixed pricing
                            </p>

                            <p
                              className={`mt-1 text-xs ${
                                form.pricingType === "fixed"
                                  ? "text-white/60"
                                  : "text-neutral-400"
                              }`}
                            >
                              Show specific prices to customers.
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleChange("pricingType", "custom")
                            }
                            className={`border p-4 text-left transition ${
                              form.pricingType === "custom"
                                ? "border-neutral-950 bg-neutral-950 text-white"
                                : "border-neutral-200 bg-white hover:border-neutral-300"
                            }`}
                          >
                            <p className="text-sm font-medium">
                              Custom pricing
                            </p>

                            <p
                              className={`mt-1 text-xs ${
                                form.pricingType === "custom"
                                  ? "text-white/60"
                                  : "text-neutral-400"
                              }`}
                            >
                              Price varies by customer requirements.
                            </p>
                          </button>
                        </div>

                        {form.pricingType === "fixed" && (
                          <div>
                            <div className="mb-3 flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">
                                  Pricing options
                                </p>

                                <p className="mt-0.5 text-xs text-neutral-400">
                                  Add different options such as colour,
                                  paper size or quantity.
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={addPricingOption}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-950"
                              >
                                <CirclePlus className="h-4 w-4" />
                                Add option
                              </button>
                            </div>

                            <div className="space-y-2">
                              {form.pricing.map((option, index) => (
                                <div
                                  key={index}
                                  className="border border-neutral-200 bg-neutral-50/50 p-3"
                                >
                                  <div className="grid gap-3 sm:grid-cols-[1fr_110px_120px_auto]">
                                    <div>
                                      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                                        Option
                                      </label>

                                      <input
                                        type="text"
                                        value={option.name}
                                        onChange={(event) =>
                                          handlePricingChange(
                                            index,
                                            "name",
                                            event.target.value,
                                          )
                                        }
                                        placeholder="Black & White"
                                        className="w-full border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-500"
                                      />
                                    </div>

                                    <div>
                                      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                                        Price
                                      </label>

                                      <input
                                        type="number"
                                        min="0"
                                        value={option.price}
                                        onChange={(event) =>
                                          handlePricingChange(
                                            index,
                                            "price",
                                            event.target.value,
                                          )
                                        }
                                        className="w-full border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-500"
                                      />
                                    </div>

                                    <div>
                                      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                                        Unit
                                      </label>

                                      <input
                                        type="text"
                                        value={option.unit}
                                        onChange={(event) =>
                                          handlePricingChange(
                                            index,
                                            "unit",
                                            event.target.value,
                                          )
                                        }
                                        placeholder="page"
                                        className="w-full border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-500"
                                      />
                                    </div>

                                    <div className="flex items-end">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removePricingOption(index)
                                        }
                                        disabled={form.pricing.length === 1}
                                        className="flex h-[38px] w-full items-center justify-center border border-neutral-200 px-3 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="ml-2 sm:hidden">
                                          Remove
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {form.pricingType === "custom" && (
                          <div className="border border-neutral-200 bg-neutral-50 p-4">
                            <p className="text-sm font-medium">
                              Pricing will be handled manually
                            </p>

                            <p className="mt-1 text-xs leading-5 text-neutral-500">
                              Customers will see that pricing is available on
                              request rather than a fixed price.
                            </p>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Media & display */}
                    <section>
                      <div className="mb-4 border-b border-neutral-100 pb-3">
                        <h3 className="text-sm font-semibold">
                          Display settings
                        </h3>

                        <p className="mt-1 text-xs text-neutral-400">
                          Control how the service appears on the website.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium">
                            Image URL
                          </label>

                          <div className="relative">
                            <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />

                            <input
                              type="url"
                              value={form.imageUrl}
                              onChange={(event) =>
                                handleChange(
                                  "imageUrl",
                                  event.target.value,
                                )
                              }
                              placeholder="https://..."
                              className="w-full border border-neutral-200 bg-white py-2.5 pl-9 pr-3.5 text-sm outline-none placeholder:text-neutral-300 focus:border-neutral-500"
                            />
                          </div>

                          <p className="mt-1.5 text-xs text-neutral-400">
                            Image uploads can be connected to Firebase Storage
                            later.
                          </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium">
                              Sort order
                            </label>

                            <input
                              type="number"
                              min="0"
                              value={form.sortOrder}
                              onChange={(event) =>
                                handleChange(
                                  "sortOrder",
                                  event.target.value,
                                )
                              }
                              className="w-full border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-neutral-500"
                            />

                            <p className="mt-1.5 text-xs text-neutral-400">
                              Lower numbers appear first.
                            </p>
                          </div>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleChange("active", !form.active)
                            }
                            className={`flex items-center justify-between border p-4 text-left transition ${
                              form.active
                                ? "border-emerald-200 bg-emerald-50/50"
                                : "border-neutral-200 bg-white"
                            }`}
                          >
                            <div>
                              <p className="text-sm font-medium">Active</p>

                              <p className="mt-1 text-xs text-neutral-400">
                                Visible on the website
                              </p>
                            </div>

                            <span
                              className={`flex h-5 w-5 items-center justify-center border ${
                                form.active
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : "border-neutral-300"
                              }`}
                            >
                              {form.active && <Check className="h-3.5 w-3.5" />}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleChange("featured", !form.featured)
                            }
                            className={`flex items-center justify-between border p-4 text-left transition ${
                              form.featured
                                ? "border-amber-200 bg-amber-50/50"
                                : "border-neutral-200 bg-white"
                            }`}
                          >
                            <div>
                              <p className="text-sm font-medium">Featured</p>

                              <p className="mt-1 text-xs text-neutral-400">
                                Highlight this service
                              </p>
                            </div>

                            <span
                              className={`flex h-5 w-5 items-center justify-center border ${
                                form.featured
                                  ? "border-amber-500 bg-amber-500 text-white"
                                  : "border-neutral-300"
                              }`}
                            >
                              {form.featured && (
                                <Check className="h-3.5 w-3.5" />
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                    </section>

                    {error && (
                      <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}
                  </div>

                  {/* Modal footer */}
                  <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-6 py-4">
                    <p className="hidden text-xs text-neutral-400 sm:block">
                      {modal === "create"
                        ? "The service will be added to your catalogue."
                        : "Changes will be saved immediately."}
                    </p>

                    <div className="ml-auto flex gap-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        disabled={saving}
                        className="rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-neutral-100 disabled:opacity-40"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-md bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
                      >
                        {saving ? (
                          <>
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            {modal === "create"
                              ? "Creating..."
                              : "Saving..."}
                          </>
                        ) : (
                          <>
                            {modal === "create"
                              ? "Create service"
                              : "Save changes"}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete modal */}
        {modal === "delete" && selectedService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div className="w-full max-w-md bg-white shadow-2xl">
              <div className="border-b border-neutral-200 px-6 py-5">
                <div className="flex h-10 w-10 items-center justify-center bg-red-50 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-xl font-semibold tracking-tight">
                  Delete service?
                </h2>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  You are about to permanently delete{" "}
                  <span className="font-medium text-neutral-900">
                    {selectedService.name}
                  </span>
                  . This action cannot be undone.
                </p>
              </div>

              {error && (
                <div className="mx-6 mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2 bg-neutral-50 px-6 py-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-neutral-100 disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {saving ? "Deleting..." : "Delete service"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
