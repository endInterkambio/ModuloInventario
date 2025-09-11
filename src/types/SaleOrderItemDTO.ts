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
    bookCondition?: string;
    warehouse?: SimpleIdNameDTO;
    locationType?: string;
    bookcase?: number;
    bookcaseFloor?: number;
    stock: number;
  } | null;
}
