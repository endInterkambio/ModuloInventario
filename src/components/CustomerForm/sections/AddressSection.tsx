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

        <FormField label="Dirección">
          <Input
            value={formData.address.street1}
            onChange={(value) => handleAddressChange("street1", value)}
            placeholder="Calle 1"
          />
        </FormField>

        <FormField label="Departamento">
          <Select
            value={formData.address.department}
            onChange={(value) => handleAddressChange("department", value)}
            options={["Lima", "Arequipa", "Cusco", "Trujillo"]}
            placeholder="Seleccione o escriba para agregar"
          />
        </FormField>

        <FormField label="Distrito">
          <Input
            value={formData.address.district}
            onChange={(value) => handleAddressChange("district", value)}
            placeholder=""
          />
        </FormField>

        <FormField label="Provincia">
          <Input
            value={formData.address.province}
            onChange={(value) => handleAddressChange("province", value)}
            placeholder=""
          />
        </FormField>

        <FormField label="Código postal">
          <Input
            value={formData.address.postalCode}
            onChange={(value) => handleAddressChange("postalCode", value)}
            placeholder=""
          />
        </FormField>
      </div>
    </div>
  );
}
