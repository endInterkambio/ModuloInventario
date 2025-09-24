import { useState } from "react";
import { FormData } from "../types/FormData";
import { mapFormDataToCustomerDTO } from "../types/mapFormDataToCustomerDTO";

export function useCustomerForm(initial?: Partial<FormData>) {
  const [form, setForm] = useState<FormData>({
    customerType: initial?.customerType ?? "PERSON",
    documentType: initial?.documentType ?? "DNI",
    documentNumber: initial?.documentNumber ?? "",
    name: initial?.name ?? "",
    companyName: initial?.companyName ?? "",
    email: initial?.email ?? "",
    phoneNumber: initial?.phoneNumber ?? "",
    address: initial?.address ?? {
      street1: "",
      street2: "",
      department: "",
      district: "",
      province: "",
      postalCode: "",
    },
    contacts: initial?.contacts ?? [],
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updateNestedField = <T extends keyof FormData>(
    field: T,
    subField: keyof FormData[T],
    value: FormData[T][keyof FormData[T]]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...(prev[field] as Record<string, unknown>),
        [subField]: value,
      } as FormData[T],
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.customerType)
      newErrors.customerType = "Selecciona el tipo de cliente";

    if (form.customerType === "PERSON") {
      if (!form.documentNumber)
        newErrors.documentNumber = `${form.documentType} es requerido`;
      if (!form.name) newErrors.name = "Nombre completo es requerido";
      if (!form.email) newErrors.email = "Email es requerido";
      if (!form.phoneNumber) newErrors.phoneNumber = "Teléfono es requerido";
    }

    if (form.customerType === "COMPANY") {
      if (!form.documentNumber) newErrors.documentNumber = "RUC es requerido";
      if (!form.companyName)
        newErrors.companyName = "Nombre de la empresa es requerido";
      if (!form.email) newErrors.email = "Email de la empresa es requerido";
      if (!form.phoneNumber)
        newErrors.phoneNumber = "Teléfono corporativo es requerido";
    }

    if (!form.address.street1)
      newErrors.address = "Calle principal es requerida";
    if (!form.address.district) newErrors.address = "Distrito es requerido";
    if (!form.address.province) newErrors.address = "Provincia es requerida";
    if (!form.address.postalCode)
      newErrors.address = "Código postal es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPayloadForBackend = () => {
    const addressString = `${form.address.street1}${
      form.address.street2 ? " " + form.address.street2 : ""
    }, ${form.address.district}, ${form.address.province}, ${
      form.address.postalCode
    }`;

    return {
      ...mapFormDataToCustomerDTO(form),
      address: addressString,
    };
  };

  const resetForm = () => {
    setForm({
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
    setErrors({});
  };

  return {
    form,
    errors,
    updateField,
    updateNestedField,
    validateForm,
    getPayloadForBackend,
    resetForm,
  };
}
