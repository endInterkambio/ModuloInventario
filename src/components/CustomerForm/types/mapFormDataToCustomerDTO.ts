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
    address: form.address ?? "",
    contacts:
      form.contacts?.map((c) => ({
        id: 0,
        name: c.name,
        email: c.email,
        phoneNumber: c.phoneNumber,
      })) ?? [],
  };
}
