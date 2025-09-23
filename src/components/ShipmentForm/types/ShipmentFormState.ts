import type { SimpleIdNameDTO } from "@/types/SimpleIdNameDTO";

export interface ShipmentFormState {
  order: SimpleIdNameDTO;
  shipmentDate: string; // YYYY-MM-DD
  trackingNumber: string;
  addressLine: string;
  department: string;
  province: string;
  district: string;
  postalCode: string;
  shippingFee: number;
  shipmentMethod?: SimpleIdNameDTO;
}

export type ShipmentCreationPayload = Omit<ShipmentFormState, "orderNumber">;
