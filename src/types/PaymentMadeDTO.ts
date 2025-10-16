export interface PaymentReceivedDTO {
  id: number;
  purchaseOrderId: number;
  purchaseOrderNumber?: string;
  paymentDate: string;
  amount: number;
  referenceNumber: string;
}
