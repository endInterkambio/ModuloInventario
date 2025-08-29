export interface FormData {
  customerType: "PERSON" | "COMPANY";   // maps to customerType
  documentType: "DNI" | "RUC" | "CE";   // maps to documentType
  documentNumber: string;               // maps to documentNumber

  name: string;                    // for PERSON
  companyName: string;                 // for COMPANY

  email: string;
  phoneNumber: string;                  // unified phone field
  address: {
    street1: string;
    street2?: string;
    department: string;
    district: string;
    province: string;
    postalCode: string;
  };

  contacts?: {
    name: string;
    email: string;
    phoneNumber: string;
  }[];
}
