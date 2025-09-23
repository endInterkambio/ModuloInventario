import { SaleOrderItemDTO } from "./SaleOrderItemDTO";
import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface ShipmentDTO {
  id?: number;
  order: SimpleIdNameDTO;
  shipmentDate?: string;
  trackingNumber?: string;
  address?: string;
  shippingFee?: number;
  shipmentMethod?: SimpleIdNameDTO;
  items?: SaleOrderItemDTO[];
}

