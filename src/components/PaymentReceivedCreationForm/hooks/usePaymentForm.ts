import { useState } from "react";
import type { PaymentMethod } from "../constants/paymentMethods";

export interface PaymentFormState {
  saleOrderId: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  amount: number;
  referenceNumber: string;
}

export function usePaymentForm(initial?: Partial<PaymentFormState>) {
  const [form, setForm] = useState<PaymentFormState>({
    saleOrderId: initial?.saleOrderId ?? 0,
    paymentDate: initial?.paymentDate ?? new Date().toISOString().slice(0, 10),
    paymentMethod: initial?.paymentMethod ?? "CASH",
    amount: initial?.amount ?? 0,
    referenceNumber: initial?.referenceNumber ?? "",
  });

  const updateField = <K extends keyof PaymentFormState>(
    key: K,
    value: PaymentFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, updateField };
}
