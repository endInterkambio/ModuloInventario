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
  referenceNumber: string;
  orderDate: string;
  shipmentDate: string;
  deliveryMethod: string; // TODO
  createdBy: string; //  Relacion a listado de vendedores
  saleChannel: string;
  clientNotes: string;
  items: Item[];
  customer?: CustomerDTO | null;
}
