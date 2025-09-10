import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface SaleOrderItemDTO {
  id?: number;
  bookTitle: string;
  quantity?: number;
  customPrice?: number;
  discount?: number;
  bookStockLocation?: {
    id: number;
    bookSku: string;
    warehouse?: SimpleIdNameDTO;
    bookcase?: number;
    bookcaseFloor?: number;
    bookCondition?: string;
    locationType?: string;
    stock: number;
  } | null;
}
