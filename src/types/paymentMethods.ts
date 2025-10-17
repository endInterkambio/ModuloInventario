export const PAYMENT_METHODS = [
  { value: "CASH", label: "Efectivo" },
  { value: "CARD", label: "Tarjeta" },
  { value: "YAPE", label: "YAPE" },
  { value: "PLIN", label: "PLIN" },
  { value: "BANK_TRANSFER", label: "Transferencia Bancaria" },
] as const;

export type PaymentMethod = typeof PAYMENT_METHODS[number]["value"];
