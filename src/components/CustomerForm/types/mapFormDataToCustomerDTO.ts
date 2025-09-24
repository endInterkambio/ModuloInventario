import { CustomerDTO } from "@/types/CustomerDTO";
import { FormData } from "@components/CustomerForm/types/FormData";

export function mapFormDataToCustomerDTO(
  form: FormData
): Omit<CustomerDTO, "id"> {
  return {
    customerType: form.customerType,
    documentType: form.documentType,
    documentNumber: form.documentNumber,
    name: form.customerType === "PERSON" ? form.name ?? "" : "",
    companyName: form.customerType === "COMPANY" ? form.companyName ?? "" : "",
    email: form.email,
    phoneNumber: form.phoneNumber,
    address: form.address
      ? `${form.address.street1}, ${form.address.street2 ?? ""}, ${
          form.address.district
        }, ${form.address.province}, ${form.address.department}, ${
          form.address.postalCode
        }`
      : "",
    contacts:
      form.contacts?.map((c) => ({
        name: c.name,
        email: c.email,
        phoneNumber: c.phoneNumber,
      })) ?? [],
  };
}
