import { CustomerContactDTO } from "./CustomerContactDTO";

export interface CustomerDTO {
  id: number;
  customerType: string;
  documentType: string;
  documentNumber: string;
  name: string;
  companyName: string | undefined;
  email: string;
  phoneNumber: string;
  address: string;
  contacts: CustomerContactDTO[];
}
