export interface PaymentReceivedDTO {
    id: number;
    saleOrderId: number;
    paymentDate: string;
    amount: number;
    referenceNumber: string;
}