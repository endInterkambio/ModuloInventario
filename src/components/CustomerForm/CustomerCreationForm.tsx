import { useState } from "react";
import { FormData } from "./types/FormData";
import { TabButton } from "./buttons/TabButton";
import GeneralInfoSection from "./sections/GeneralInfoSection";
import AddressSection from "./sections/AddressSection";
import ContactsSection from "./sections/ContactsSection";
import { useCreateCustomer } from "@/hooks/useCustomers";
import { mapFormDataToCustomerDTO } from "./types/mapFormDataToCustomerDTO";

export default function CustomerCreationForm() {
  const [activeTab, setActiveTab] = useState("address");

  const [formData, setFormData] = useState<FormData>({
    customerType: "PERSON",
    documentType: "DNI",
    documentNumber: "",
    name: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    address: "",
    contacts: [],
  });

  // hook para crear cliente
  const createCustomer = useCreateCustomer({
    onSuccess: () => {
      console.log("✅ Cliente creado correctamente");
      // aquí podrías resetear el form o redirigir
      setFormData({
        customerType: "PERSON",
        documentType: "DNI",
        documentNumber: "",
        name: "Nombre",
        companyName: "",
        email: "",
        phoneNumber: "",
        address: "",
        contacts: [],
      });
    },
    onError: (error) => {
      console.error("❌ Error creando cliente:", error.message);
    },
  });

  const updateFormData = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => setFormData((prev) => ({ ...prev, [field]: value }));

  const updateNestedFormData = <T extends keyof FormData>(
    field: T,
    subField: keyof FormData[T],
    value: FormData[T][keyof FormData[T]]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...(typeof prev[field] === "object" && prev[field] !== null
          ? prev[field]
          : {}),
        [subField]: value,
      },
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dto = mapFormDataToCustomerDTO(formData);
    createCustomer.mutate(dto);
  };

  const handleCancel = () => console.log("Form cancelled");

  const tabs = [
    { id: "address", label: "Dirección" },
    { id: "contacts", label: "Persona de contacto" },
  ];

  return (
    <div className="mx-auto p-6 bg-white">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Nuevo Cliente
      </h1>

      <div className="space-y-6">
        {/* General Information */}
        <GeneralInfoSection
          formData={formData}
          updateFormData={updateFormData}
          updateNestedFormData={updateNestedFormData}
        />

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-0">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                label={tab.label}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
        </div>

        {/* Dynamic sections */}
        {activeTab === "address" && <AddressSection />}

        {activeTab === "contacts" &&
          (formData.customerType === "COMPANY" ? (
            <ContactsSection />
          ) : (
            <div className="py-8 text-center text-gray-500">
              Disponible solo para clientes empresariales
            </div>
          ))}

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={createCustomer.isPending} // 👈 Deshabilitamos mientras hace request
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {createCustomer.isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
