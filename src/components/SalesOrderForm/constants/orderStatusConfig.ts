export const orderStatusConfig = {
  PENDING: {
    color: "bg-yellow-500",
    label: "Pendiente",
    textColor: "text-yellow-700",
    bgLight: "bg-yellow-100",
  },
  IN_PROGRESS: {
    color: "bg-blue-500",
    label: "En Progreso - Preparando envío",
    textColor: "text-blue-700",
    bgLight: "bg-blue-100",
  },
  SHIPPED: {
    color: "bg-purple-500",
    label: "Enviado",
    textColor: "text-purple-700",
    bgLight: "bg-purple-100",
  },
  COMPLETED: {
    color: "bg-green-500",
    label: "Completado",
    textColor: "text-green-700",
    bgLight: "bg-green-100",
  },
  CANCELLED: {
    color: "bg-red-500",
    label: "Cancelado",
    textColor: "text-red-700",
    bgLight: "bg-red-100",
  },
} as const;

export const orderPaymentStatusConfig = {
  UNPAID: {
    color: "bg-red-500",
    label: "No Pagada",
    textColor: "text-red-700",
    bgLight: "bg-red-100",
  },
  PARTIALLY_PAID: {
    color: "bg-yellow-500",
    label: "Parcialmente Pagada",
    textColor: "text-yellow-700",
    bgLight: "bg-yellow-100",
  },
  PAID: {
    color: "bg-green-500",
    label: "Pagada",
    textColor: "text-green-700",
    bgLight: "bg-green-100",
  },
  INVOICED: {
    color: "bg-blue-500",
    label: "Facturada",
    textColor: "text-blue-700",
    bgLight: "bg-blue-100",
  },
} as const;

// Tipo de estados posibles
export type OrderStatus = keyof typeof orderStatusConfig;

// Tipo de la config de cada estado
export type OrderStatusConfig = (typeof orderStatusConfig)[OrderStatus];

// Tipo de estados de pago posibles
export type OrderPaymentStatus = keyof typeof orderPaymentStatusConfig;

// Tipo de la config de cada estado de pago
export type OrderPaymentStatusConfig =
  (typeof orderPaymentStatusConfig)[OrderPaymentStatus];
