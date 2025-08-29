import { FormData } from "../types/FormData";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { RadioButton } from "../buttons/RadioButton";
import { useState } from "react";

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
}

export default function GeneralInfoSection({
  formData,
  updateFormData,
}: Props) {
  const [docType, setDocType] = useState<"DNI" | "CE">("DNI");

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
            checked={formData.customerType === "PERSON"}
            onChange={(value) =>
              updateFormData("customerType", value as "PERSON" | "COMPANY")
            }
            label="Person"
          />
          <RadioButton
            id="company"
            name="customerType"
            value="COMPANY"
            checked={formData.customerType === "COMPANY"}
            onChange={(value) =>
              updateFormData("customerType", value as "PERSON" | "COMPANY")
            }
            label="Company"
          />
        </div>
      </FormField>

      {/* Person fields */}
      {formData.customerType === "PERSON" && (
        <>
          {/* Document type selector */}
          <FormField label="Tipo de cliente">
            <div className="flex space-x-4">
              <RadioButton
                id="dni"
                name="documentType"
                value="DNI"
                checked={docType === "DNI"}
                onChange={() => {
                  setDocType("DNI");
                  updateFormData("documentType", "DNI");
                }}
                label="DNI"
              />
              <RadioButton
                id="ce"
                name="documentType"
                value="CE"
                checked={docType === "CE"}
                onChange={() => {
                  setDocType("CE");
                  updateFormData("documentType", "CE");
                }}
                label="CE"
              />
            </div>
          </FormField>

          {/* Document number */}
          <FormField label={docType} tooltip={`Ingresa ${docType} number`}>
            <Input
              value={formData.documentNumber}
              maxLength={docType === "DNI" ? 8 : 9}
              onChange={(value) => updateFormData("documentNumber", value)}
              placeholder={`Ingresa el número de ${docType}`}
            />
          </FormField>

          {/* Full name */}
          <FormField label="Nombre completo" tooltip="Ingrese el nombre y apellido del cliente">
            <Input
              value={formData.fullName || ""}
              onChange={(value) => updateFormData("fullName", value)}
              placeholder="John Doe"
            />
          </FormField>

          {/* Email */}
          <FormField label="Email">
            <Input
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              placeholder="example@email.com"
            />
          </FormField>

          {/* Phone */}
          <FormField label="Phone">
            <Input
              value={formData.phoneNumber}
              onChange={(value) => updateFormData("phoneNumber", value)}
              placeholder="Ingresa el número de teléfono"
            />
          </FormField>
        </>
      )}

      {/* Company fields */}
      {formData.customerType === "COMPANY" && (
        <>
          {/* RUC */}
          <FormField label="RUC" tooltip="11-digit company RUC number">
            <Input
              value={formData.documentNumber}
              maxLength={11}
              onChange={(value) => {
                updateFormData("documentType", "RUC");
                updateFormData("documentNumber", value);
              }}
              placeholder="Enter RUC"
            />
          </FormField>

          {/* Company name */}
          <FormField label="ComNombre completo">
            <Input
              value={formData.companyName || ""}
              onChange={(value) => updateFormData("companyName", value)}
              placeholder="Enter company name"
            />
          </FormField>

          {/* Email */}
          <FormField label="Company Email">
            <Input
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              placeholder="company@email.com"
            />
          </FormField>

          {/* Phone */}
          <FormField label="Company Phone">
            <Input
              value={formData.phoneNumber}
              onChange={(value) => updateFormData("phoneNumber", value)}
              placeholder="Enter company phone"
            />
          </FormField>
        </>
      )}
    </>
  );
}
