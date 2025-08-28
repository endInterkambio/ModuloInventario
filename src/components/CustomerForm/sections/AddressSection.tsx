import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

export default function AddressSection() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Dirección de facturación
          </h3>
          <FormField label="A la atención de">
            <Input value="" onChange={() => {}} placeholder="" />
          </FormField>

          <FormField label="País/Región">
            <Select
              value=""
              onChange={() => {}}
              options={["Perú", "Colombia", "Chile", "Ecuador"]}
              placeholder="Seleccione o escriba para agregar"
            />
          </FormField>

          <FormField label="Dirección">
            <div className="space-y-2">
              <Input value="" onChange={() => {}} placeholder="Calle 1" />
              <Input value="" onChange={() => {}} placeholder="Calle 2" />
            </div>
          </FormField>

          <FormField label="Ciudad">
            <Input value="" onChange={() => {}} placeholder="" />
          </FormField>

          <FormField label="Estado">
            <Select
              value=""
              onChange={() => {}}
              options={["Lima", "Arequipa", "Cusco", "Trujillo"]}
              placeholder="Seleccione o escriba para agregar"
            />
          </FormField>

          <FormField label="Código postal">
            <Input value="" onChange={() => {}} placeholder="" />
          </FormField>

          <FormField label="Teléfono">
            <Input value="" onChange={() => {}} placeholder="" />
          </FormField>
        </div>

        {/* Columna derecha */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Dirección de envío
            </h3>
            <span className="text-sm text-gray-500">(</span>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 text-sm"
              onClick={() => console.log("Copiar dirección de facturación")}
            >
              Copiar la dirección de facturación
            </button>
            <span className="text-sm text-gray-500">)</span>
          </div>

          <FormField label="A la atención de">
            <Input value="" onChange={() => {}} placeholder="" />
          </FormField>

          <FormField label="País/Región">
            <Select
              value=""
              onChange={() => {}}
              options={["Perú", "Colombia", "Chile", "Ecuador"]}
              placeholder="Seleccione o escriba para agregar"
            />
          </FormField>

          <FormField label="Dirección">
            <div className="space-y-2">
              <Input value="" onChange={() => {}} placeholder="Calle 1" />
              <Input value="" onChange={() => {}} placeholder="Calle 2" />
            </div>
          </FormField>

          <FormField label="Ciudad">
            <Input value="" onChange={() => {}} placeholder="" />
          </FormField>

          <FormField label="Estado">
            <Select
              value=""
              onChange={() => {}}
              options={["Lima", "Arequipa", "Cusco", "Trujillo"]}
              placeholder="Seleccione o escriba para agregar"
            />
          </FormField>

          <FormField label="Código postal">
            <Input value="" onChange={() => {}} placeholder="" />
          </FormField>

          <FormField label="Teléfono">
            <Input value="" onChange={() => {}} placeholder="" />
          </FormField>
        </div>
      </div>
    </div>
  );
}
