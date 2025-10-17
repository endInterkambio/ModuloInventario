import { PurchaseOrderItemDTO } from "./PurchaseOrderItemDTO";
import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export type OrderStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";
export type OrderPaymentStatus =
  | "UNPAID"
  | "PARTIALLY_PAID"
  | "PAID"
  | "INVOICED";

export interface PurchaseOrderDTO {
  id: number;
  purchaseOrderNumber: string;
  purchaseDate: string;
  supplier: SimpleIdNameDTO;
  createdAt: string;
  createdBy: SimpleIdNameDTO;
  purchaseChannel?: string;
  amount: number;
  amountShipment?: number;
  additionalFee?: number;
  totalAmount: number;
  totalPaid?: number;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  items: PurchaseOrderItemDTO[];
  deliveryDate: string;
  supplierNotes: string;
}
