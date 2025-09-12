import { PaymentMethod } from "../constants/paymentMethods";

export type PaymentReceivedCreationPayload = {
  saleOrderId: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  amount: number;
  referenceNumber: string;
};
