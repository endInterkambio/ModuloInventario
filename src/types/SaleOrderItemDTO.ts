import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface SaleOrderItemDTO {
    id?: number;
    bookStockLocation: SimpleIdNameDTO;
    quantity: number;
    discount: number;
    customPrice: number;
}