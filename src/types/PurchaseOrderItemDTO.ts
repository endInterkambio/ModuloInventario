import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface PurchaseOrderItemDTO {
  id?: number;
  bookTitle: string;
  quantity?: number;
  discount?: number;
  customPrice?: number;
  offerPrice?: number;
  isOfferActive?: boolean;
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
