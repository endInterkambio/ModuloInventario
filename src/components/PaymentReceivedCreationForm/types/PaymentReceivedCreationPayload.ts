import { PaymentMethod } from "../../../types/paymentMethods";

export type PaymentReceivedCreationPayload = {
  saleOrderId: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  amount: number;
  referenceNumber: string;
};
