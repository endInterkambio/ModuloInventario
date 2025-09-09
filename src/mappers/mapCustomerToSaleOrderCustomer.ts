import { CustomerDTO } from "@/types/CustomerDTO";
import { SaleOrderCustomerDTO } from "@/types/SaleOrderCustomerDTO";

export function mapCustomerToSaleOrderCustomer(c: CustomerDTO): SaleOrderCustomerDTO {
  return {
    id: c.id,
    customerType: c.customerType,
    name: c.name,
    companyName: c.companyName,
  };
}


