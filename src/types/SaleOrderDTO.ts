import { SaleOrderCustomerDTO } from "./SaleOrderCustomerDTO";
import { SaleOrderItemDTO } from "./SaleOrderItemDTO";
import { ShipmentMethodDTO } from "./ShipmentMethodDTO";
import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export type OrderStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";
export type OrderPaymentStatus = "UNPAID" | "PARTIALLY_PAID" | "PAID" | "INVOICED";

export interface SaleOrderDTO {
  id: number;
  orderNumber: string;
  orderDate: string;
  createdAt: string;
  createdBy: SimpleIdNameDTO;
  saleChannel: string;
  amount: number;
  amountShipment?: number;
  additionalFee?: number;
  totalAmount: number;
  totalPaid?: number;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  customer: SaleOrderCustomerDTO | null;
  items: SaleOrderItemDTO[];
  clientNotes: string;
  shipmentMethod?: ShipmentMethodDTO | null;
}
