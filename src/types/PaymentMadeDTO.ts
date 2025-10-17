export interface PaymentMadeDTO {
  id: number;
  purchaseOrderId: number;
  purchaseOrderNumber?: string;
  paymentDate: string;
  amount: number;
  referenceNumber: string;
  paymentMethod: string;
}
