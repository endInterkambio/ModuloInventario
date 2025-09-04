import { useState } from "react";
import toast from "react-hot-toast";
import { FormData } from "./types/FormData";
import { TabButton } from "./buttons/TabButton";
import GeneralInfoSection from "./sections/GeneralInfoSection";
import AddressSection from "./sections/AddressSection";
import ContactsSection from "./sections/ContactsSection";
import { useCreateCustomer } from "@/hooks/useCustomers";
import { mapFormDataToCustomerDTO } from "./types/mapFormDataToCustomerDTO";
import BackButton from "@components/shared/BackButton";

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
    address: {
      street1: "",
      street2: "",
      department: "",
      district: "",
      province: "",
      postalCode: "",
    },
    contacts: [],
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  // hook para crear cliente
  const createCustomer = useCreateCustomer({
    onSuccess: () => {
      toast.success("Cliente creado correctamente");
      setFormData({
        customerType: "PERSON",
        documentType: "DNI",
        documentNumber: "",
        name: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        address: {
          street1: "",
          street2: "",
          department: "",
          district: "",
          province: "",
          postalCode: "",
        },
        contacts: [],
      });
      setFormErrors({});
    },
    onError: (error) => {
      toast.error(`❌ Error creando cliente: ${error.message}`);
    },
  });

  const updateFormData = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error si el usuario empieza a escribir
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const updateNestedFormData = <T extends keyof FormData>(
    field: T,
    subField: keyof FormData[T],
    value: FormData[T][keyof FormData[T]]
  ) => {
    setFormData((prev) => {
      // Garantizamos que prev[field] sea un objeto
      const fieldValue = prev[field];
      const fieldObject: Record<string, unknown> =
        fieldValue && typeof fieldValue === "object"
          ? (fieldValue as Record<string, unknown>)
          : {};

      return {
        ...prev,
        [field]: {
          ...fieldObject,
          [subField]: value,
        } as FormData[T], // casteamos al tipo correcto
      };
    });

    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validaciones
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.customerType)
      errors.customerType = "Selecciona el tipo de cliente";

    if (formData.customerType === "PERSON") {
      if (!formData.documentNumber)
        errors.documentNumber = `${formData.documentType} es requerido`;
      if (!formData.name) errors.name = "Nombre completo es requerido";
      if (!formData.email) errors.email = "Email es requerido";
      if (!formData.phoneNumber) errors.phoneNumber = "Teléfono es requerido";
    }

    if (formData.customerType === "COMPANY") {
      if (!formData.documentNumber) errors.documentNumber = "RUC es requerido";
      if (!formData.companyName)
        errors.companyName = "Nombre de la empresa es requerido";
      if (!formData.email) errors.email = "Email de la empresa es requerido";
      if (!formData.phoneNumber)
        errors.phoneNumber = "Teléfono corporativo es requerido";
    }

    // Validación de dirección (si existe)
    if (!formData.address.street1)
      errors.address = "Calle principal es requerida";
    if (!formData.address.district) errors.address = "Distrito es requerido";
    if (!formData.address.province) errors.address = "Provincia es requerida";
    if (!formData.address.postalCode)
      errors.address = "Código postal es requerido";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((err) => toast.error(err));
      return;
    }

    // Convertimos address a string para enviar al backend
    const addressString = `${formData.address.street1}${
      formData.address.street2 ? " " + formData.address.street2 : ""
    }, ${formData.address.district}, ${formData.address.province}, ${
      formData.address.postalCode
    }`;

    const dto = {
      ...mapFormDataToCustomerDTO(formData),
      address: addressString, // enviamos la dirección como string
    };

    createCustomer.mutate(dto);
  };

  const handleCancel = () => {
    toast("Formulario cancelado");
  };

  const tabs = [
    { id: "address", label: "Dirección" },
    { id: "contacts", label: "Persona de contacto" },
  ];

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="pb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Nuevo Cliente
      </h1>

      <div className="space-y-6">
        {/* General Information */}
        <GeneralInfoSection
          formData={formData}
          updateFormData={updateFormData}
          updateNestedFormData={updateNestedFormData}
          formErrors={formErrors} // <-- pasar errores inline
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
        {activeTab === "address" && (
          <AddressSection formData={formData} updateFormData={updateFormData} />
        )}

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
            disabled={createCustomer.isPending}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {createCustomer.isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
