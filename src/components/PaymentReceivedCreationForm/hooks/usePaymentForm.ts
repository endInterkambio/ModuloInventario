import { useState } from "react";
import type { PaymentMethod } from "../constants/paymentMethods";

export interface PaymentFormState {
  saleOrderId: number;
  saleOrderNumber: string; // solo referencia
  paymentDate: string; // formato YYYY-MM-DD
  paymentMethod: PaymentMethod;
  amount: number;
  referenceNumber: string;
}

/**
 * Hook para manejar el formulario de pagos
 */
export function usePaymentForm(initial?: Partial<PaymentFormState>) {
  const [form, setForm] = useState<PaymentFormState>({
    saleOrderId: initial?.saleOrderId ?? 0,
    saleOrderNumber: initial?.saleOrderNumber ?? "",
    paymentDate: initial?.paymentDate ?? new Date().toISOString().slice(0, 10), // solo fecha
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

  /**
   * Devuelve el payload listo para enviar al backend
   * Convierte paymentDate a formato LocalDateTime: YYYY-MM-DDTHH:MM:SS
   */
  const getPayloadForBackend = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { saleOrderNumber: _ref, ...payload } = form;

    const now = new Date();
    const timePart = now.toTimeString().slice(0, 8); // HH:MM:SS

    return {
      ...payload,
      paymentDate: `${payload.paymentDate}T${timePart}`,
    };
  };

  const resetForm = () => {
    setForm((prev) => ({
      saleOrderId: prev.saleOrderId,
      saleOrderNumber: prev.saleOrderNumber,
      paymentDate: new Date().toISOString().slice(0, 10),
      paymentMethod: "CASH",
      amount: 0,
      referenceNumber: "",
    }));
  };

  return { form, updateField, getPayloadForBackend, resetForm };
}
