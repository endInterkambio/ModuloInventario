import { useState } from "react";
import { FormData } from "./types/FormData";
import { TabButton } from "./buttons/TabButton";
import GeneralInfoSection from "./sections/GeneralInfoSection";
import AddressSection from "./sections/AddressSection";
import ContactsSection from "./sections/ContactsSection";

export default function CustomerCreationForm() {
  const [activeTab, setActiveTab] = useState("direccion");
  const [formData, setFormData] = useState<FormData>({
    tipoCliente: "individuo",
    contactoPrincipal: { nombre: "", apellido: "" },
    nombreEmpresa: "",
    email: "",
    telefono: { laboral: "", movil: "" },
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

  const handleSubmit = () => console.log("Form submitted:", formData);
  const handleCancel = () => console.log("Form cancelled");

  const tabs = [
    { id: "direccion", label: "Dirección" },
    { id: "personas-contacto", label: "Personas de contacto" },
  ];

  return (
    <div className="mx-auto p-6 bg-white">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Nuevo cliente
      </h1>

      <div className="space-y-6">
        {/* Información general */}
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

        {/* Secciones dinámicas */}
        {activeTab === "direccion" && <AddressSection />}

        {activeTab === "personas-contacto" &&
          (formData.tipoCliente === "empresarial" ? (
            <ContactsSection />
          ) : (
            <div className="py-8 text-center text-gray-500">
              Solo disponible para clientes empresariales
            </div>
          ))}

        {/* Placeholder para tabs no implementados */}
        {!["otros-detalles", "direccion", "personas-contacto"].includes(
          activeTab
        ) && (
          <div className="py-8 text-center text-gray-500">
            <div>
              Contenido de la pestaña{" "}
              {tabs.find((t) => t.id === activeTab)?.label}
            </div>
            <div className="text-sm mt-2">
              Esta sección estaría implementada según los requerimientos
              específicos
            </div>
          </div>
        )}

        {/* Acciones */}
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
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
