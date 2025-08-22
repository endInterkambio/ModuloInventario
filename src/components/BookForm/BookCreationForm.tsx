import { useState } from "react";
import { Save } from "lucide-react";
import { BookFormData, FORM_SECTIONS, FormSectionId } from "./formConfig";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { PricingSection } from "./sections/PricingSection";
import { InventorySection } from "./sections/InventorySection";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";
import { useCreateBook } from "@/hooks/useCreateBook";

export const BookCreationForm = () => {
  const [activeSection, setActiveSection] = useState<FormSectionId>("basic");

  const [formData, setFormData] = useState<BookFormData>({
    sku: "",
    title: "",
    isbn: "",
    author: "",
    publisher: "",
    description: "",
    categories: [],
    subjects: "",
    formats: [],
    language: "",
    imageUrl: "",
    websiteUrl: "",
    coverPrice: 0,
    purchasePrice: 0,
    sellingPrice: 0,
    fairPrice: 0,
    tag: "",
    filter: "",
    productSaleType: "",
    totalStock: 0, // calculado en backend (no se envía)
    locations: [], // se crean aparte (no se envía aquí)
  });

  const { createBook, isCreatingBook } = useCreateBook();

  // campos simples
  const handleFieldChange = <K extends keyof BookFormData>(
    name: K,
    value: BookFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // locations solo en memoria
  const handleLocationChange = <K extends keyof BookStockLocationDTO>(
    index: number,
    field: K,
    value: BookStockLocationDTO[K]
  ) => {
    const updated = [...formData.locations];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, locations: updated }));
  };

  const removeLocation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () =>
    setFormData({
      sku: "",
      title: "",
      isbn: "",
      author: "",
      publisher: "",
      description: "",
      categories: [],
      subjects: "",
      formats: [],
      language: "",
      imageUrl: "",
      websiteUrl: "",
      coverPrice: 0,
      purchasePrice: 0,
      sellingPrice: 0,
      fairPrice: 0,
      tag: "",
      filter: "",
      productSaleType: "",
      totalStock: 0,
      locations: [],
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 🔹 Payload sin totalStock ni locations
      type BookPayload = Omit<BookFormData, "totalStock" | "locations"> & {
        categories: string[];
        formats: string[];
        createdBy: { id: number, name: string } | null;
      };

      // 🔹 Construimos explícitamente el payload
      const { totalStock: _, locations: __, ...rest } = formData;

      const bookPayload: BookPayload = {
        ...rest,
        categories: Array.isArray(rest.categories)
          ? rest.categories
          : String(rest.categories)
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean),
        formats: Array.isArray(rest.formats)
          ? rest.formats
          : String(rest.formats)
              .split(",")
              .map((f) => f.trim())
              .filter(Boolean),
        createdBy: { id: 10, name: "invitado" },
      };

      await createBook(bookPayload);

      console.log("Libro creado:", bookPayload);
      resetForm();
    } catch (err) {
      console.error("Error creando libro:", err);
    }
  };

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "basic":
        return (
          <BasicInfoSection
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        );
      case "pricing":
        return (
          <PricingSection
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        );
      case "inventory":
        return (
          <InventorySection
            formData={formData}
            onFieldChange={handleFieldChange}
            onLocationChange={handleLocationChange}
            onRemoveLocation={removeLocation}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Crear Nuevo Libro
            </h1>
            <p className="text-gray-600 mt-1">
              Complete la información del libro para agregarlo al catálogo
            </p>
          </div>

          {/* Tabs */}
          <div className="px-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              {FORM_SECTIONS.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeSection === section.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-8">{renderCurrentSection()}</div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isCreatingBook}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
                isCreatingBook
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Save className="w-4 h-4" />
              <span>{isCreatingBook ? "Guardando..." : "Guardar Libro"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
