import { FormData } from "../types/FormData";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { RadioButton } from "../buttons/RadioButton";

interface Props {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => void;
  updateNestedFormData: <T extends keyof FormData>(
    field: T,
    subField: keyof FormData[T],
    value: FormData[T][keyof FormData[T]]
  ) => void;
  formErrors?: Partial<Record<keyof FormData, string>>;
}

export default function GeneralInfoSection({
  formData,
  updateFormData,
}: Props) {
  const isPerson = formData.customerType === "PERSON";
  const isCompany = formData.customerType === "COMPANY";
  const docType = formData.documentType;

  return (
    <>
      {/* Primera fila: Tipo de cliente + Tipo de documento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tipo de cliente */}
        <FormField
          label="Tipo de cliente"
          tooltip="Seleccione el tipo de cliente"
        >
          <div className="flex space-x-6">
            <RadioButton
              id="person"
              name="customerType"
              value="PERSON"
              checked={isPerson}
              onChange={(value) =>
                updateFormData("customerType", value as "PERSON" | "COMPANY")
              }
              label="Persona"
            />
            <RadioButton
              id="company"
              name="customerType"
              value="COMPANY"
              checked={isCompany}
              onChange={(value) =>
                updateFormData("customerType", value as "PERSON" | "COMPANY")
              }
              label="Empresa"
            />
          </div>
        </FormField>

        {/* Tipo de documento (solo para persona) */}
        {isPerson && (
          <FormField label="Tipo de documento">
            <div className="flex space-x-4">
              <RadioButton
                id="dni"
                name="documentType"
                value="DNI"
                checked={docType === "DNI"}
                onChange={() => updateFormData("documentType", "DNI")}
                label="DNI"
              />
              <RadioButton
                id="ce"
                name="documentType"
                value="CE"
                checked={docType === "CE"}
                onChange={() => updateFormData("documentType", "CE")}
                label="CE"
              />
            </div>
          </FormField>
        )}
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-4">Información general</h3>

      {/* Person fields */}
      {isPerson && (
        <>
          <FormField label={docType} tooltip={`Ingresa ${docType}`}>
            <Input
              type="text"
              value={formData.documentNumber}
              maxLength={docType === "DNI" ? 8 : 9}
              onChange={(value) => {
                if (/^\d*$/.test(value)) {
                  updateFormData("documentNumber", value);
                }
              }}
              placeholder={`Número de ${docType}`}
            />
          </FormField>

          <FormField
            label="Nombre completo"
            tooltip="Ingrese el nombre y apellido del cliente"
          >
            <Input
              value={formData.name || ""}
              onChange={(value) => updateFormData("name", value)}
              placeholder="John Doe"
            />
          </FormField>

          <FormField label="Email">
            <Input
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              placeholder="example@email.com"
            />
          </FormField>

          <FormField label="Teléfono">
            <Input
              value={formData.phoneNumber}
              maxLength={12}
              onChange={(value) => {
                if (/^[\d+\-\s]*$/.test(value)) {
                  updateFormData("phoneNumber", value);
                }
              }}
              placeholder="Ingresa el número de teléfono"
            />
          </FormField>
        </>
      )}

      {/* Company fields */}
      {isCompany && (
        <>
          <FormField label="RUC" tooltip="Debe contener 11 dígitos">
            <Input
              value={formData.documentNumber}
              minLength={11}
              maxLength={11}
              onChange={(value) => {
                if (/^\d*$/.test(value)) {
                  updateFormData("documentNumber", value);
                  updateFormData("documentType", "RUC");
                }
              }}
              placeholder="RUC"
            />
          </FormField>

          <FormField label="Nombre de la empresa">
            <Input
              value={formData.companyName || ""}
              onChange={(value) => updateFormData("companyName", value)}
              placeholder="Nombre de la empresa"
            />
          </FormField>

          <FormField label="Correo electrónico">
            <Input
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              placeholder="empresa@email"
            />
          </FormField>

          <FormField label="Teléfono corporativo">
            <Input
              value={formData.phoneNumber}
              onChange={(value) => updateFormData("phoneNumber", value)}
              placeholder="Teléfono de la empresa"
            />
          </FormField>
        </>
      )}
    </>
  );
}