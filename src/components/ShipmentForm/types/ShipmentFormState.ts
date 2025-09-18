import type { SimpleIdNameDTO } from "@/types/SimpleIdNameDTO";

export interface ShipmentFormState {
  orderId: number;
  orderNumber: string; // solo referencia
  shipmentDate: string; // YYYY-MM-DD
  trackingNumber: string;
  address: string;
  shippingFee: number;
  shipmentMethod?: SimpleIdNameDTO;
}

export type ShipmentCreationPayload = Omit<ShipmentFormState, "orderNumber">;
