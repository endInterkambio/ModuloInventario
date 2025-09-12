export interface PaymentReceivedDTO {
  id: number;
  saleOrderId: number;
  saleOrderNumber: string;
  customer: {
    id: number;
    name: string;
    companyName: string;
    customerType: string;
  };
  paymentDate: string;
  paymentMethod: string;
  amount: number;
  referenceNumber: string;
}
