export const PAYMENT_METHODS = [
  { value: "CASH", label: "Efectivo" },
  { value: "CARD", label: "Tarjeta" },
  { value: "BCP", label: "YAPE" },
  { value: "MOBILE", label: "PLIN" },
  { value: "BANK_TRANSFER", label: "Transferencia Bancaria" },
  { value: "CHECK", label: "Cheque" },
] as const;

export type PaymentMethod = typeof PAYMENT_METHODS[number]["value"];
