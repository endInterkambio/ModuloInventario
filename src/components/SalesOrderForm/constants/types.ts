import { CustomerDTO } from "@/types/CustomerDTO";

export interface Item {
  id: string;
  description: string;
  quantity: number;
  price: number;
  discount: number;
  discountType: "%" | "S/.";
  amount: number;
}

export interface SalesOrder {
  orderNumber: string;
  reference: string;
  orderDate: string;
  deliveryDate: string;
  deliveryMethod: string;
  vendor: string;
  saleChannel: string;
  clientNotes: string;
  items: Item[];
  customer?: CustomerDTO | null;
}
