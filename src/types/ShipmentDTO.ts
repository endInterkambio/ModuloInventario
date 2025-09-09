import { SaleOrderItemDTO } from "./SaleOrderItemDTO";
import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface ShipmentDTO {
  id?: number;
  orderId: number;
  shipmentDate?: string;
  trackingNumber?: string;
  address?: string;
  shippingFee?: number;
  shipmentMethod?: SimpleIdNameDTO;
  items?: SaleOrderItemDTO[];
}

