export interface Article {
  id: string;
  description: string;
  quantity: number;
  price: number;
  discount: number;
  discountType: "%" | "S/.";
  tax: number;
  amount: number;
}

export interface SalesOrder {
  orderNumber: string;
  reference: string;
  orderDate: string;
  deliveryDate: string;
  deliveryMethod: string;
  vendor: string;
  salesChannel: string;
  clientNotes: string;
  articles: Article[];
}
