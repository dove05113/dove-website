"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Image as ImageIcon,
  Upload,
  Star,
  Eye,
  EyeOff,
  LoaderCircle,
  FolderOpen,
} from "lucide-react";

import {
  createCatalogueItem,
  deleteCatalogueItem,
  getCatalogueItems,
  updateCatalogueItem,
  type CatalogueItem,
  type CatalogueCategory,
} from "@/lib/catalogue";

import { getServices, type Service } from "@/lib/services";

import { uploadCatalogueImage } from "@/lib/catalogue-upload";

const categories: {
  value: CatalogueCategory;
  label: string;
}[] = [
  { value: "graphic-design", label: "Graphic Design" },
  { value: "branding", label: "Branding" },
  { value: "marketing-materials", label: "Marketing Materials" },
  { value: "photography", label: "Photography" },
];

type ModalType = "create" | "edit" | "delete" | null;

type CatalogueForm = {
  title: string;
  description: string;
  category: CatalogueCategory;
  subcategory: string;
  serviceId: string;
  featured: boolean;
  active: boolean;
  sortOrder: string;
};

const emptyForm: CatalogueForm = {
  title: "",
  description: "",
  category: "graphic-design",
  subcategory: "",
    serviceId: "",
  featured: false,
  active: true,
  sortOrder: "0",
};

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getCategoryLabel(category: CatalogueCategory) {
  return categories.find((item) => item.value === category)?.label ?? category;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CatalogueManagementPage() {
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  const [modal, setModal] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);

  const [form, setForm] = useState<CatalogueForm>(emptyForm);

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState("");

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const [existingGallery, setExistingGallery] = useState<
    { url: string; publicId?: string }[]
  >([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  async function loadItems() {
    try {
      setLoading(true);

      const data = await getCatalogueItems();

      setItems(data);
    } catch (error) {
      console.error("Failed to load catalogue:", error);
      setError("Failed to load catalogue items.");
    } finally {
      setLoading(false);
    }
  }

  async function loadServices() {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Failed to load services:", error);
      setError("Failed to load available services.");
    }
  }

  useEffect(() => {
    loadItems();
    loadServices();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setMainImage(null);
    setMainImagePreview("");
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery([]);

    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = "";
    }

    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  }

  function closeModal() {
    if (saving) return;

    setModal(null);
    setSelectedItem(null);
    setError("");
    resetForm();
  }

  function openCreateModal() {
    setSelectedItem(null);
    resetForm();
    setError("");
    setModal("create");
  }

  function openEditModal(item: CatalogueItem) {
    setSelectedItem(item);

    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      subcategory: item.subcategory,
      serviceId: item.serviceId ?? "",
      featured: item.featured,
      active: item.active,
      sortOrder: String(item.sortOrder ?? 0),
    });

    setMainImage(null);
    setMainImagePreview(item.imageUrl);

    setGalleryFiles([]);
    setGalleryPreviews([]);

    setExistingGallery(
      (item.galleryImages ?? []).map((url, index) => ({
        url,
        publicId: item.galleryImagePublicIds?.[index],
      })),
    );

    setError("");
    setModal("edit");
  }

  function openDeleteModal(item: CatalogueItem) {
    setSelectedItem(item);
    setError("");
    setModal("delete");
  }

  function handleChange(field: keyof CatalogueForm, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function validateImage(file: File) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG and WebP images are allowed.";
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return "Images must not exceed 10 MB.";
    }

    return "";
  }

function handleMainImageChange(file?: File) {
  if (!file) return;

  const validationError = validateImage(file);

  if (validationError) {
    setError(validationError);
    return;
  }

  setError("");

  // Release the previous temporary preview.
  if (mainImagePreview.startsWith("blob:")) {
    URL.revokeObjectURL(mainImagePreview);
  }

  setMainImage(file);
  setMainImagePreview(URL.createObjectURL(file));
}

  function handleGalleryChange(files: FileList | null) {
    if (!files) return;

    const selectedFiles = Array.from(files);

    const invalidFile = selectedFiles.find((file) => validateImage(file));

    if (invalidFile) {
      setError(validateImage(invalidFile));
      return;
    }

    setError("");

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));

    setGalleryFiles((current) => [...current, ...selectedFiles]);

    setGalleryPreviews((current) => [...current, ...previews]);

    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  }

function removeMainImage() {
  // Release the temporary preview URL.
  if (mainImagePreview.startsWith("blob:")) {
    URL.revokeObjectURL(mainImagePreview);
  }

  setMainImage(null);
  setMainImagePreview("");

  if (mainImageInputRef.current) {
    mainImageInputRef.current.value = "";
  }
}
  function removeNewGalleryImage(index: number) {
    URL.revokeObjectURL(galleryPreviews[index]);

    setGalleryFiles((current) => current.filter((_, i) => i !== index));

    setGalleryPreviews((current) => current.filter((_, i) => i !== index));
  }

  function removeExistingGalleryImage(index: number) {
    setExistingGallery((current) => current.filter((_, i) => i !== index));
  }

  async function uploadImages() {
    let imageUrl = selectedItem?.imageUrl ?? "";
    let imagePublicId = selectedItem?.imagePublicId ?? "";

    // Upload the main image if a new one was selected.
    if (mainImage) {
      const result = await uploadCatalogueImage(mainImage, form.category);

      imageUrl = result.imageUrl;
      imagePublicId = result.publicId;
    }

    if (!imageUrl) {
      throw new Error("Please select a main catalogue image.");
    }

    // Preserve existing gallery images.
    const galleryImages = existingGallery.map((image) => image.url);

    const galleryImagePublicIds = existingGallery.map(
      (image) => image.publicId ?? "",
    );

    // Upload newly selected gallery images.
    for (const file of galleryFiles) {
      const result = await uploadCatalogueImage(file, form.category);

      galleryImages.push(result.imageUrl);
      galleryImagePublicIds.push(result.publicId);
    }

    return {
      imageUrl,
      imagePublicId,
      galleryImages,
      galleryImagePublicIds,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      if (!form.title.trim()) {
        throw new Error("Please enter a title.");
      }

      if (!mainImagePreview) {
        throw new Error("Please select a main catalogue image.");
      }

      const images = await uploadImages();

      const data = {
        title: form.title.trim(),
        slug: createSlug(form.title),
        description: form.description.trim(),
        category: form.category,
        subcategory: form.subcategory.trim(),
        serviceId: form.serviceId,
        ...images,
        featured: form.featured,
        active: form.active,
        sortOrder: Number(form.sortOrder) || 0,
      };

      if (modal === "create") {
        await createCatalogueItem(data);
      } else if (modal === "edit" && selectedItem) {
        await updateCatalogueItem(selectedItem.id, data);
      }

      await loadItems();
      setModal(null);
      setSelectedItem(null);
      resetForm();
    } catch (error) {
      console.error("Failed to save catalogue item:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save catalogue item.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedItem) return;

    setError("");
    setSaving(true);

    try {
      await deleteCatalogueItem(selectedItem.id);

      await loadItems();

      setModal(null);
      setSelectedItem(null);
    } catch (error) {
      console.error("Failed to delete catalogue item:", error);
      setError("Failed to delete catalogue item.");
    } finally {
      setSaving(false);
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const featuredCount = items.filter((item) => item.featured).length;
  const activeCount = items.filter((item) => item.active).length;

  const slug = createSlug(form.title);

  return (
    <main className="font-montserrat text-black bg-gray-50 min-h-screen max-w 7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Website content
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
            Catalogue
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your design, branding and photography portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex h-11 items-center justify-center gap-2 bg-gray-950 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={17} />
          Add catalogue item
        </button>
      </div>

      {/* Overview */}
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
        <div className="border border-gray-200 bg-white p-4 sm:p-5">
          <p className="text-xs font-medium text-gray-500">Total items</p>

          <p className="mt-2 text-2xl font-semibold text-gray-950">
            {items.length}
          </p>
        </div>

        <div className="border border-gray-200 bg-white p-4 sm:p-5">
          <p className="text-xs font-medium text-gray-500">Published</p>

          <p className="mt-2 text-2xl font-semibold text-gray-950">
            {activeCount}
          </p>
        </div>

        <div className="col-span-2 border border-gray-200 bg-white p-4 sm:col-span-1 sm:p-5">
          <p className="text-xs font-medium text-gray-500">Featured work</p>

          <p className="mt-2 text-2xl font-semibold text-gray-950">
            {featuredCount}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search catalogue..."
            className="h-11 w-full border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-950"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="h-11 border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-950 sm:w-56"
        >
          <option value="all">All categories</option>

          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Catalogue list */}
      <section className="mt-6">
        {loading ? (
          <div className="flex min-h-52 items-center justify-center gap-3 text-sm text-gray-500">
            <LoaderCircle size={18} className="animate-spin" />
            Loading catalogue...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-gray-300 bg-white px-5 text-center">
            <FolderOpen size={28} className="text-gray-300" />

            <h2 className="mt-4 text-sm font-semibold text-gray-900">
              {items.length === 0
                ? "Your catalogue is empty"
                : "No matching items"}
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              {items.length === 0
                ? "Add your first design or portfolio item to get started."
                : "Try another search term or category."}
            </p>

            {items.length === 0 && (
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 text-sm font-semibold text-gray-950 underline underline-offset-4"
              >
                Add your first item
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden border border-gray-200 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {item.featured && (
                      <span className="flex items-center gap-1 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-900 shadow-sm">
                        <Star size={11} />
                        Featured
                      </span>
                    )}

                    <span
                      className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-sm ${
                        item.active
                          ? "bg-gray-950 text-white"
                          : "bg-white text-gray-500"
                      }`}
                    >
                      {item.active ? "Published" : "Hidden"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                    {getCategoryLabel(item.category)}
                    {item.subcategory && ` / ${item.subcategory}`}
                  </p>

                  <h2 className="mt-2 truncate text-base font-semibold text-gray-950">
                    {item.title}
                  </h2>

                  <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-gray-500">
                    {item.description || "No description provided."}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-400">
                      Order: {item.sortOrder}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        title="Edit item"
                        className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-600 transition hover:border-gray-950 hover:text-gray-950"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(item)}
                        title="Delete item"
                        className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-500 transition hover:border-red-200 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Create / Edit modal */}
      {(modal === "create" || modal === "edit") && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-lg font-semibold text-gray-950">
                  {modal === "create"
                    ? "Add catalogue item"
                    : "Edit catalogue item"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Add the details and images for this portfolio item.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center text-gray-400 transition hover:bg-gray-100 hover:text-gray-950"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto">
              <div className="space-y-7 p-5 sm:p-7">
                {/* Basic information */}
                <section>
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-950">
                      Item information
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      The basic details displayed in your catalogue.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-xs font-medium text-gray-700">
                        Title
                      </label>

                      <input
                        type="text"
                        value={form.title}
                        onChange={(event) =>
                          handleChange("title", event.target.value)
                        }
                        required
                        placeholder="e.g. Corporate Business Cards"
                        className="h-11 w-full border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-gray-950 focus:bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-xs font-medium text-gray-700">
                        Description
                      </label>

                      <textarea
                        value={form.description}
                        onChange={(event) =>
                          handleChange("description", event.target.value)
                        }
                        rows={3}
                        placeholder="Describe this design or project..."
                        className="w-full resize-y border border-gray-200 bg-gray-50 px-3 py-3 text-sm outline-none transition focus:border-gray-950 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-700">
                        Category
                      </label>

                      <select
                        value={form.category}
                        onChange={(event) =>
                          handleChange(
                            "category",
                            event.target.value as CatalogueCategory,
                          )
                        }
                        className="h-11 w-full border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-gray-950"
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-700">
                        Subcategory
                      </label>

                      <input
                        type="text"
                        value={form.subcategory}
                        onChange={(event) =>
                          handleChange("subcategory", event.target.value)
                        }
                        placeholder="e.g. Business Cards"
                        className="h-11 w-full border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-gray-950"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-xs font-medium text-gray-700">
                        Linked service
                      </label>

                      <select
                        value={form.serviceId}
                        onChange={(event) =>
                          handleChange("serviceId", event.target.value)
                        }
                        className="h-11 w-full border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-gray-950"
                      >
                        <option value="">No service linked</option>

                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                            {service.active === false ? " (Inactive)" : ""}
                          </option>
                        ))}
                      </select>

                      <p className="mt-2 text-xs text-gray-400">
                        Connect this catalogue item to the service it
                        represents.
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-xs font-medium text-gray-700">
                        URL slug
                      </label>

                      <input
                        type="text"
                        value={slug}
                        readOnly
                        className="h-11 w-full border border-gray-200 bg-gray-100 px-3 text-sm text-gray-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-700">
                        Display order
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={form.sortOrder}
                        onChange={(event) =>
                          handleChange("sortOrder", event.target.value)
                        }
                        className="h-11 w-full border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-gray-950"
                      />
                    </div>
                  </div>
                </section>

                {/* Main image */}
                <section className="border-t border-gray-100 pt-6">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-950">
                      Main image
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      This image represents the item in your catalogue.
                    </p>
                  </div>

                  {mainImagePreview ? (
                    <div className="relative overflow-hidden border border-gray-200 bg-gray-50">
                      <img
                        src={mainImagePreview}
                        alt="Main image preview"
                        className="max-h-72 w-full object-contain"
                      />

                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-white text-gray-700 shadow transition hover:text-red-600"
                        title="Remove main image"
                      >
                        <X size={17} />
                      </button>

                      {mainImage && (
                        <div className="border-t border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
                          {mainImage.name} · {formatFileSize(mainImage.size)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => mainImageInputRef.current?.click()}
                      className="flex min-h-44 w-full flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50 px-5 text-center transition hover:border-gray-500 hover:bg-gray-100"
                    >
                      <ImageIcon size={28} className="text-gray-400" />

                      <span className="mt-3 text-sm font-medium text-gray-800">
                        Choose main image
                      </span>

                      <span className="mt-1 text-xs text-gray-400">
                        JPG, PNG or WebP · Maximum 10 MB
                      </span>
                    </button>
                  )}

                  <input
                    ref={mainImageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                    onChange={(event) =>
                      handleMainImageChange(event.target.files?.[0])
                    }
                  />

                  {mainImagePreview && (
                    <button
                      type="button"
                      onClick={() => mainImageInputRef.current?.click()}
                      className="mt-3 text-xs font-semibold text-gray-700 underline underline-offset-4 hover:text-black"
                    >
                      Replace main image
                    </button>
                  )}
                </section>

                {/* Gallery images */}
                <section className="border-t border-gray-100 pt-6">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-950">
                        Additional gallery images
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Add more images to the item's lightbox gallery.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="flex shrink-0 items-center gap-2 border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-950 hover:text-gray-950"
                    >
                      <Upload size={14} />
                      Add images
                    </button>
                  </div>

                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    hidden
                    onChange={(event) =>
                      handleGalleryChange(event.target.files)
                    }
                  />

                  {existingGallery.length === 0 &&
                  galleryPreviews.length === 0 ? (
                    <div className="border border-dashed border-gray-200 px-4 py-8 text-center">
                      <ImageIcon size={22} className="mx-auto text-gray-300" />

                      <p className="mt-2 text-xs text-gray-500">
                        No additional images selected.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {existingGallery.map((image, index) => (
                        <div
                          key={`${image.url}-${index}`}
                          className="group relative aspect-square overflow-hidden border border-gray-200 bg-gray-100"
                        >
                          <img
                            src={image.url}
                            alt={`Gallery image ${index + 1}`}
                            className="h-full w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removeExistingGalleryImage(index)}
                            className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center bg-white/95 text-gray-700 shadow transition hover:text-red-600"
                            title="Remove image"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}

                      {galleryPreviews.map((preview, index) => (
                        <div
                          key={preview}
                          className="relative aspect-square overflow-hidden border border-gray-200 bg-gray-100"
                        >
                          <img
                            src={preview}
                            alt={`New gallery image ${index + 1}`}
                            className="h-full w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removeNewGalleryImage(index)}
                            className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center bg-white/95 text-gray-700 shadow transition hover:text-red-600"
                            title="Remove image"
                          >
                            <X size={14} />
                          </button>

                          <span className="absolute bottom-1 left-1 bg-gray-950/80 px-1.5 py-1 text-[9px] font-medium text-white">
                            New
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* Publishing options */}
                <section className="border-t border-gray-100 pt-6">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-950">
                      Publishing options
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Control how this item appears on your website.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-center justify-between border border-gray-200 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Star size={17} className="text-gray-500" />

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Featured work
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            Display this item in the featured section.
                          </p>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(event) =>
                          handleChange("featured", event.target.checked)
                        }
                        className="h-4 w-4 accent-gray-950"
                      />
                    </label>

                    <label className="flex cursor-pointer items-center justify-between border border-gray-200 px-4 py-3">
                      <div className="flex items-center gap-3">
                        {form.active ? (
                          <Eye size={17} className="text-gray-500" />
                        ) : (
                          <EyeOff size={17} className="text-gray-500" />
                        )}

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Publish item
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            Make this item visible in the public catalogue.
                          </p>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        checked={form.active}
                        onChange={(event) =>
                          handleChange("active", event.target.checked)
                        }
                        className="h-4 w-4 accent-gray-950"
                      />
                    </label>
                  </div>
                </section>

                {error && (
                  <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
              </div>

              {/* Modal footer */}
              <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:px-7">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="h-11 border border-gray-200 bg-white px-5 text-sm font-medium text-gray-700 transition hover:border-gray-400 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-11 items-center justify-center gap-2 bg-gray-950 px-6 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" />
                      {mainImage || galleryFiles.length > 0
                        ? "Uploading and saving..."
                        : "Saving..."}
                    </>
                  ) : modal === "create" ? (
                    "Create catalogue item"
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {modal === "delete" && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white p-6 shadow-2xl">
            <div className="flex h-11 w-11 items-center justify-center bg-red-50 text-red-600">
              <Trash2 size={19} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-gray-950">
              Delete catalogue item?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              You are about to delete{" "}
              <span className="font-semibold text-gray-900">
                {selectedItem.title}
              </span>
              . This will remove the item from your catalogue. This action
              cannot be undone.
            </p>

            {error && (
              <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="h-10 border border-gray-200 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="flex h-10 items-center justify-center gap-2 bg-red-600 px-4 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <LoaderCircle size={15} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete item"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
