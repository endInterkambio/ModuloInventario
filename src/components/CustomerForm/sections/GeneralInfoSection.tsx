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
      {/* Customer type */}
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

      {/* Person fields */}
      {isPerson && (
        <>
          {/* Document type selector */}
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

          {/* Document number */}
          <FormField label={docType} tooltip={`Ingresa ${docType}`}>
            <Input
              type="text" // Cambiar a text
              value={formData.documentNumber}
              maxLength={docType === "DNI" ? 8 : 9}
              onChange={(value) => {
                // Solo permitir números
                if (/^\d*$/.test(value)) {
                  updateFormData("documentNumber", value);
                }
              }}
              placeholder={`Número de ${docType}`}
              error={!formData.documentNumber ? "Campo requerido" : ""}
            />
          </FormField>

          {/* Full name */}
          <FormField
            label="Nombre completo"
            tooltip="Ingrese el nombre y apellido del cliente"
          >
            <Input
              value={formData.name || ""}
              onChange={(value) => updateFormData("name", value)}
              placeholder="John Doe"
              error={!formData.name ? "Campo requerido" : ""}
            />
          </FormField>

          {/* Email */}
          <FormField label="Email">
            <Input
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              placeholder="example@email.com"
              error={!formData.email ? "Campo requerido" : ""}
            />
          </FormField>

          {/* Phone */}
          <FormField label="Teléfono">
            <Input
              value={formData.phoneNumber}
              maxLength={12}
              onChange={(value) => {
                // Solo permitir números y signos +, -, y espacios
                if (/^[\d+\-\s]*$/.test(value)) {
                  updateFormData("phoneNumber", value);
                }
              }}
              placeholder="Ingresa el número de teléfono"
              error={!formData.phoneNumber ? "Campo requerido" : ""}
            />
          </FormField>
        </>
      )}

      {/* Company fields */}
      {isCompany && (
        <>
          {/* RUC */}
          <FormField label="RUC" tooltip="Debe contener 11 dígitos">
            <Input
              value={formData.documentNumber}
              minLength={11}
              maxLength={11}
              onChange={(value) => {
                // Solo permitir números
                if (/^\d*$/.test(value)) {
                  updateFormData("documentNumber", value);
                  updateFormData("documentType", "RUC");
                }
              }}
              placeholder="RUC"
              error={!formData.documentNumber ? "Campo requerido" : ""}
            />
          </FormField>

          {/* Company name */}
          <FormField label="Nombre de la empresa">
            <Input
              value={formData.companyName || ""}
              onChange={(value) => updateFormData("companyName", value)}
              placeholder="Nombre de la empresa"
              error={!formData.companyName ? "Campo requerido" : ""}
            />
          </FormField>

          {/* Email */}
          <FormField label="Correo electrónico">
            <Input
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              placeholder="empresa@email"
              error={!formData.email ? "Campo requerido" : ""}
            />
          </FormField>

          {/* Phone */}
          <FormField label="Teléfono corporativo">
            <Input
              value={formData.phoneNumber}
              onChange={(value) => updateFormData("phoneNumber", value)}
              placeholder="Teléfono de la empresa"
              error={!formData.phoneNumber ? "Campo requerido" : ""}
            />
          </FormField>
        </>
      )}
    </>
  );
}
