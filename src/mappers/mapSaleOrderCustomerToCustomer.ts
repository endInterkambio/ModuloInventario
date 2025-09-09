import { SaleOrderCustomerDTO } from "@/types/SaleOrderCustomerDTO";
import { CustomerDTO } from "@/types/CustomerDTO";

export function mapSaleOrderCustomerToCustomer(c: SaleOrderCustomerDTO): CustomerDTO {
  return {
    id: c.id,
    customerType: c.customerType,
    name: c.name,
    companyName: c.companyName,
    documentType: "",  // opcional si no lo tienes
    documentNumber: "",
    email: "",
    phoneNumber: "",
    address: "",
    contacts: [],
  };
}