import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface PaymentMadeDTO {
  id: number;
  purchaseOrderId: number;
  purchaseOrderNumber?: string;
  supplier: SimpleIdNameDTO;
  paymentDate: string;
  amount: number;
  referenceNumber: string;
  paymentMethod: string;
}
