import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateCustomer } from "@/hooks/useCustomers";
import { useCustomerForm } from "./hooks/useCustomerForm";
import { TabButton } from "./buttons/TabButton";
import GeneralInfoSection from "./sections/GeneralInfoSection";
import AddressSection from "./sections/AddressSection";
import ContactsSection from "./sections/ContactsSection";
import BackButton from "@components/shared/BackButton";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function CustomerCreationForm() {
  const [activeTab, setActiveTab] = useState("address");

  const {
    form,
    errors,
    updateField,
    updateNestedField,
    validateForm,
    getPayloadForBackend,
    resetForm,
    addContact,
    updateContact,
    removeContact,
  } = useCustomerForm();

  const createCustomer = useCreateCustomer({
    onSuccess: () => {
      toast.success("Cliente creado correctamente");
      resetForm();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) {
      Object.values(errors).forEach((err) => err && toast.error(err));
      return;
    }

    const dto = getPayloadForBackend();
    createCustomer.mutate(dto);
  };

  const tabs = [
    { id: "address", label: "Dirección" },
    { id: "contacts", label: "Persona de contacto" },
  ];

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md max-w-7xl">
      <div className="pb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Nuevo Cliente
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Layout de dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Primera columna - Información General */}
          <div className="space-y-6">
            <GeneralInfoSection
              formData={form}
              updateFormData={updateField}
              updateNestedFormData={updateNestedField}
              formErrors={errors}
            />
          </div>

          {/* Segunda columna - Pestañas y contenido */}
          <div className="space-y-6">
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

            {activeTab === "address" && (
              <AddressSection formData={form} updateFormData={updateField} />
            )}

            {activeTab === "contacts" &&
              (form.customerType === "COMPANY" ? (
                <ContactsSection
                  contacts={form.contacts}
                  addContact={addContact}
                  updateContact={updateContact}
                  removeContact={removeContact}
                />
              ) : (
                <div className="py-8 text-center text-gray-500">
                  Disponible solo para clientes empresariales
                </div>
              ))}
          </div>
        </div>

        {/* Botones de acción - ocupan todo el ancho */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
          <button
            type="button"
            onClick={() => {
              resetForm();
            }}
            className="px-4 py-2 rounded-md font-medium transition-colors border bg-secondary hover:bg-yellow-500"
          >
            Limpiar campos
          </button>
          <button
            type="submit"
            disabled={createCustomer.isPending}
            className="px-4 py-2 rounded-md font-medium transition-colors bg-primary text-white hover:bg-green-700"
          >
            {createCustomer.isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
