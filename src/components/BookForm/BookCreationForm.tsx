import { useState } from "react";
import { Save } from "lucide-react";
import { BookFormData, FORM_SECTIONS, FormSectionId } from "./formConfig";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { PricingSection } from "./sections/PricingSection";
import { InventorySection } from "./sections/InventorySection";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";

export const BookCreationForm = () => {
  const [activeSection, setActiveSection] = useState<FormSectionId>("basic");

  const [formData, setFormData] = useState<BookFormData>({
    sku: "",
    title: "",
    isbn: "",
    author: "",
    publisher: "",
    description: "",
    categories: "",
    subjects: "",
    formats: "",
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

  // 🔹 Tipado seguro para campos simples
  const handleFieldChange = <K extends keyof BookFormData>(
    name: K,
    value: BookFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Tipado seguro para locations
  const handleLocationChange = <
    K extends keyof BookStockLocationDTO
  >(
    index: number,
    field: K,
    value: BookStockLocationDTO[K]
  ) => {
    const updatedLocations = [...formData.locations];
    updatedLocations[index] = { ...updatedLocations[index], [field]: value };
    setFormData((prev) => ({ ...prev, locations: updatedLocations }));
  };

  const removeLocation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos para enviar al backend:", formData);
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
            <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Libro</h1>
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
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Libro</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
