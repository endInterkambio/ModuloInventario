export const CUSTOMER_TYPES = [
  { value: "PERSON", label: "Persona natural" },
  { value: "COMPANY", label: "Empresa" },
] as const;

export type CustomerType = typeof CUSTOMER_TYPES[number]["value"];