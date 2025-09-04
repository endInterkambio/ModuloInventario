import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface ShipmentItemDTO {
    id: number;
    bookStockLocation: SimpleIdNameDTO;
    quantity: number;
}