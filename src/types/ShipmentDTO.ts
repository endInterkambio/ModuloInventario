import { SaleOrderItemDTO } from "./SaleOrderItemDTO";
import { ShipmentMethodDTO } from "./ShipmentMethodDTO";

export interface ShipmentDTO {
  id: number;
  orderId: number;
  shipmentDate: string; // ISO date
  trackingNumber: string;
  address: string;
  shippingFee: number;
  shipmentMethod?: ShipmentMethodDTO;
  items?: SaleOrderItemDTO[];
}
