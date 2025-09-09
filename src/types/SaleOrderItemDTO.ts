import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface SaleOrderItemDTO {
  id?: number;
  quantity?: number;
  customPrice?: number;
  discount?: number;
  bookStockLocation?: {
    id: number;
    name: string;
    stock: number;
    warehouse?: SimpleIdNameDTO;
    bookcase?: number;
    bookcaseFloor?: number;
  } | null;
}
