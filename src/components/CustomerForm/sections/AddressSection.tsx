import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { FormData } from "../types/FormData";

interface Props {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export default function AddressSection({ formData, updateFormData }: Props) {
  // Función para actualizar solo un subcampo del objeto address
  const handleAddressChange = (field: keyof FormData["address"], value: string) => {
    updateFormData("address", { ...formData.address, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Solo una columna por simplicidad */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Dirección</h3>

        <FormField label="Avenida / Calle + N° / Interior / Mz">
          <Input
            value={formData.address.street1}
            onChange={(value) => handleAddressChange("street1", value)}
            placeholder="Avenida Siempre Viva 742 Dpto 101"
          />
        </FormField>

        <FormField label="Departamento">
          <Select
            value={formData.address.department}
            onChange={(value) => handleAddressChange("department", value)}
            options={["Lima", "Arequipa", "Cusco", "Trujillo"]}
          />
        </FormField>

        <FormField label="Provincia">
          <Input
            value={formData.address.province}
            onChange={(value) => handleAddressChange("province", value)}
            placeholder="Ejemplo: Lima metropolitana"
          />
        </FormField>

        <FormField label="Distrito">
          <Input
            value={formData.address.district}
            onChange={(value) => handleAddressChange("district", value)}
            placeholder="Ejemplo: Miraflores"
          />
        </FormField>

        

        <FormField label="Código postal">
          <Input
            value={formData.address.postalCode}
            onChange={(value) => 
              // Asegurarse de que solo se ingresen números
              value === "" || /^\d+$/.test(value)
                ? handleAddressChange("postalCode", value)
                : null
            }
            placeholder="Ejemplo: 15074"
            minLength={5}
            maxLength={5}
          />
        </FormField>
      </div>
    </div>
  );
}
