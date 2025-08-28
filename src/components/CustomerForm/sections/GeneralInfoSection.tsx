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
  updateNestedFormData,
}: Props) {
  const [docType, setDocType] = useState<"dni" | "ce">("dni");
  return (
    <>
      {/* Selección del tipo de cliente */}
      <FormField
        label="Tipo de cliente"
        tooltip="Seleccione el tipo de cliente"
      >
        <div className="flex space-x-6">
          <RadioButton
            id="individuo"
            name="tipoCliente"
            value="individuo"
            checked={formData.tipoCliente === "individuo"}
            onChange={(value) =>
              updateFormData(
                "tipoCliente",
                value as "empresarial" | "individuo"
              )
            }
            label="Individuo"
          />
          <RadioButton
            id="empresarial"
            name="tipoCliente"
            value="empresarial"
            checked={formData.tipoCliente === "empresarial"}
            onChange={(value) =>
              updateFormData(
                "tipoCliente",
                value as "empresarial" | "individuo"
              )
            }
            label="Empresarial"
          />
        </div>
      </FormField>

      {/* Campos condicionales */}
      {formData.tipoCliente === "individuo" && (
        <>
          {/* Selector DNI / CE */}
          <FormField label="Tipo de documento">
            <div className="flex space-x-4">
              <RadioButton
                id="dni"
                name="documento"
                value="dni"
                checked={docType === "dni"}
                onChange={() => setDocType("dni")}
                label="DNI"
              />
              <RadioButton
                id="ce"
                name="documento"
                value="ce"
                checked={docType === "ce"}
                onChange={() => setDocType("ce")}
                label="CE"
              />
            </div>
          </FormField>

          {/* Campo DNI o CE dinámico */}
          {docType === "dni" && (
            <FormField label="DNI" tooltip="Número de 8 dígitos">
              <Input
                value={formData.dni || ""}
                maxLength={8}
                onChange={(value) => updateFormData("dni", value)}
                placeholder="Ingrese el DNI de 8 dígitos"
              />
            </FormField>
          )}

          {docType === "ce" && (
            <FormField label="CE" tooltip="Número de 9 dígitos">
              <Input
                value={formData.ce || ""}
                maxLength={9}
                onChange={(value) => updateFormData("ce", value)}
                placeholder="Ingrese el CE de 9 dígitos"
              />
            </FormField>
          )}
          <FormField
            label="Contacto principal"
            tooltip="Información del contacto principal"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                value={formData.contactoPrincipal.nombre}
                onChange={(value) =>
                  updateNestedFormData("contactoPrincipal", "nombre", value)
                }
                placeholder="Nombre"
              />
              <Input
                value={formData.contactoPrincipal.apellido}
                onChange={(value) =>
                  updateNestedFormData("contactoPrincipal", "apellido", value)
                }
                placeholder="Apellido"
              />
            </div>
          </FormField>

          <FormField label="Correo electrónico">
            <Input
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              placeholder="ejemplo@correo.com"
            />
          </FormField>

          <FormField label="Teléfono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={formData.telefono.laboral}
                onChange={(value) =>
                  updateNestedFormData("telefono", "laboral", value)
                }
                placeholder="Teléfono laboral"
              />
              <Input
                value={formData.telefono.movil}
                onChange={(value) =>
                  updateNestedFormData("telefono", "movil", value)
                }
                placeholder="Móvil"
              />
            </div>
          </FormField>
        </>
      )}

      {formData.tipoCliente === "empresarial" && (
        <>
          <FormField label="RUC" tooltip="Número de 11 dígitos">
            <Input
              value={formData.ruc || ""}
              maxLength={11}
              onChange={(value) => updateFormData("ruc", value)}
              placeholder="Ingrese el RUC"
            />
          </FormField>

          <FormField label="Razón social (Nombre de la empresa)">
            <Input
              value={formData.nombreEmpresa}
              onChange={(value) => updateFormData("nombreEmpresa", value)}
              placeholder="Ingrese el nombre de la empresa"
            />
          </FormField>

          <FormField label="Correo electrónico de la empresa">
            <Input
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              placeholder="ejemplo@empresa.com"
            />
          </FormField>

          <FormField label="Teléfono de la empresa">
            <Input
              value={formData.telefono.laboral}
              onChange={(value) =>
                updateNestedFormData("telefono", "laboral", value)
              }
              placeholder="Teléfono"
            />
          </FormField>
        </>
      )}
    </>
  );
}
