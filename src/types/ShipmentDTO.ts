import { ShipmentItemDTO } from "./ShipmentItemDTO";

export interface ShipmentDTO {
    id: number;
    shipmentDate: string;
    trackingNumber: string;
    address: string;
    shippingFree: string;
    items: ShipmentItemDTO[];
}