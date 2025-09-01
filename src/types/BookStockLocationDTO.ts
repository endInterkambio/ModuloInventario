import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface BookStockLocationDTO {
  id: number;
  bookId: number;  
  bookSku: string;
  warehouse: SimpleIdNameDTO;
  bookcase: number;
  bookcaseFloor: number;
  stock: number;
  lastStock: number;
  bookCondition: string;
  locationType: string;
  lastUpdatedAt: string;
}
